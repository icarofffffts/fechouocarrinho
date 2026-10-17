import { Outlet } from "react-router"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

export function RootLayout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
