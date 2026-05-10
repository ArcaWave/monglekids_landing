import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Returns a function that scrolls smoothly to an in-page section by id.
 * If the user is currently on a non-home page, it first navigates to "/"
 * with the `#id` hash. RootLayout's <ScrollManager /> then takes over and
 * performs the scroll once the home page mounts.
 */
export function useScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate(id === "top" ? "/" : `/#${id}`);
        return;
      }
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [location.pathname, navigate],
  );
}
