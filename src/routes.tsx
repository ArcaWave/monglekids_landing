import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import MethodPage from "./pages/MethodPage";
import FAQPage from "./pages/FAQPage";
import NewsPage from "./pages/NewsPage";
import NewsIssuePage from "./pages/NewsIssuePage";
import UnsubscribePage from "./pages/UnsubscribePage";
import { allSlugs } from "./lib/newsletters";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        entry: "src/pages/HomePage.tsx",
      },
      {
        path: "privacy",
        Component: PrivacyPage,
        entry: "src/pages/PrivacyPage.tsx",
      },
      {
        path: "about",
        Component: AboutPage,
        entry: "src/pages/AboutPage.tsx",
      },
      {
        path: "method",
        Component: MethodPage,
        entry: "src/pages/MethodPage.tsx",
      },
      {
        path: "faq",
        Component: FAQPage,
        entry: "src/pages/FAQPage.tsx",
      },
      {
        path: "news",
        Component: NewsPage,
        entry: "src/pages/NewsPage.tsx",
      },
      {
        path: "news/:slug",
        Component: NewsIssuePage,
        entry: "src/pages/NewsIssuePage.tsx",
        // Prerender every published issue.
        getStaticPaths: () => allSlugs().map((slug) => `/news/${slug}`),
      },
      {
        path: "unsubscribe",
        Component: UnsubscribePage,
        entry: "src/pages/UnsubscribePage.tsx",
      },
    ],
  },
];
