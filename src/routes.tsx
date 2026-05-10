import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import MethodPage from "./pages/MethodPage";
import FAQPage from "./pages/FAQPage";

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
    ],
  },
];
