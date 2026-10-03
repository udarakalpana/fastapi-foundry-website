import { Menu, Moon, Star, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { project } from '../data/project'
import { useRepoStats, useTheme } from '../lib/hooks'
import GitHubIcon from './GitHubIcon'
import Logo from './Logo'

const links = [
  { label: 'Features', to: '/#features' },
  { label: 'Quick start', to: '/#quick-start' },
  { label: 'Structure', to: '/#structure' },
  { label: 'Roadmap', to: '/#roadmap' },
  { label: 'Docs', to: '/docs' },
]

const ThemeToggle = () => {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const { version, stars } = useRepoStats()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route or anchor changes.
  const [lastLocation, setLastLocation] = useState(pathname + hash)
  if (lastLocation !== pathname + hash) {
    setLastLocation(pathname + hash)
    setOpen(false)
  }

  const isActive = (to: string) =>
    to.includes('#') ? pathname === '/' && hash === to.slice(1) : pathname.startsWith(to)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b16]/80'
          : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 rounded-md" aria-label="fastapi-foundry home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={project.pypiUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-slate-200 px-2.5 py-1 font-mono text-xs text-slate-600 transition hover:border-brand-300 hover:text-brand-700 sm:inline-flex dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-400/50 dark:hover:text-brand-300"
            aria-label={`Version ${version} on PyPI`}
          >
            v{version}
          </a>
          <ThemeToggle />
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 sm:inline-flex dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <GitHubIcon />
            GitHub
            {stars !== null && (
              <span className="inline-flex items-center gap-1 border-l border-white/20 pl-2 text-xs text-slate-300 dark:border-slate-900/20 dark:text-slate-600">
                <Star className="size-3.5" />
                {stars}
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-white/10"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200/80 px-4 pt-2 pb-4 md:hidden dark:border-white/10"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
