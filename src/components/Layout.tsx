import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

/**
 * Scrolls to the `#anchor` in the URL, or to the top when the page changes. A new page jumps straight
 * there; a link within the same page scrolls the way the stylesheet says (smoothly, unless the visitor
 * prefers reduced motion). Depending on `key` makes a second click on the same link scroll again.
 */
const useScrollToHash = () => {
  const { pathname, hash, key } = useLocation()
  const lastPathname = useRef<string | null>(null)

  useEffect(() => {
    const behavior: ScrollBehavior = lastPathname.current === pathname ? 'auto' : 'instant'
    lastPathname.current = pathname
    if (!hash) {
      window.scrollTo({ top: 0, behavior })
      return
    }
    // Wait a frame so a newly rendered page has its sections in the DOM.
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
}

const Layout = () => {
  useScrollToHash()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-brand-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
