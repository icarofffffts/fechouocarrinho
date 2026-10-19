import { createBrowserRouter } from "react-router"
import { RootLayout } from "./RootLayout"
import { BrandIdentityPage } from "./pages/BrandIdentityPage"
import { HelpPage } from "./pages/HelpPage"
import { HomePage } from "./pages/HomePage"
import { HowItWorksPage } from "./pages/HowItWorksPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ComparadorPage } from "./pages/ComparadorPage"
import { SupermarketsPage } from "./pages/SupermarketsPage"

export const router = createBrowserRouter([
  {
    path: "/identidade-visual",
    Component: BrandIdentityPage,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "como-funciona", Component: HowItWorksPage },
      { path: "supermercados", Component: SupermarketsPage },
      { path: "comparador", Component: ComparadorPage },
      { path: "ajuda", Component: HelpPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
