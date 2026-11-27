/**
 * src/lib/authReturn.ts — 앱 가입 확인 메일의 링크를 누르고 돌아온 주소 읽기
 *
 * 메일 링크는 Supabase 서버(…supabase.co/auth/v1/verify)에서 인증을 먼저 끝내고 이 사이트로 보낸다.
 * 앱이 돌아갈 주소를 따로 넘기지 않으면 첫 화면(/)으로 온다 — 붙어 오는 값:
 *   성공: ?code=…(앱의 PKCE 방식) 또는 #access_token=…&type=signup
 *   실패: ?error=…&error_code=otp_expired&error_description=… (같은 값이 # 뒤에도)
 * 첫 화면은 이런 값이 붙어 오면 /auth/confirmed 로 넘기고, 그 화면이 결과를 보여 준 뒤
 * 주소에서 code·토큰을 지운다(?r=ok 처럼 결과만 남김).
 */

export type AuthReturn = "ok" | "expired" | "error" | "none";

const params = (search: string, hash: string) => ({
  q: new URLSearchParams(search),
  h: new URLSearchParams(hash.replace(/^#/, "")),
});

/** 주소에 붙은 값으로 인증 결과를 읽는다. `?r=` 는 이 화면이 남긴 결과(새로 고침해도 같게). */
export function readAuthReturn(search: string, hash: string): AuthReturn {
  const { q, h } = params(search, hash);
  const r = q.get("r");
  if (r === "ok" || r === "expired" || r === "error") return r;
  const code = q.get("error_code") || h.get("error_code");
  const err = q.get("error") || h.get("error");
  if (code || err) {
    // 한 번 쓴 링크·시간이 지난 링크 — 메일 보안 검사기가 먼저 눌러 쓴 경우도 여기로 온다(그땐 인증은 이미 끝났다)
    return /otp_expired|expired|access_denied/i.test(`${code ?? ""} ${err ?? ""}`) ? "expired" : "error";
  }
  if (q.get("code") || h.get("access_token") || h.get("type") === "signup") return "ok";
  return "none";
}

/** 첫 화면 주소가 인증 메일에서 돌아온 것인지 (뉴스레터 #newsletter 같은 평소 # 는 아님) */
export function looksLikeAuthReturn(search: string, hash: string): boolean {
  const { q, h } = params(search, hash);
  return (
    q.has("code") ||
    q.has("error_code") ||
    h.has("error_code") ||
    h.has("access_token") ||
    h.get("type") === "signup"
  );
}
