import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { project } from '../data/project'

type Theme = 'light' | 'dark'

const themeListeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** The current colour theme, kept in sync with the class set before first paint. */
export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(
    (listener) => {
      themeListeners.add(listener)
      return () => themeListeners.delete(listener)
    },
    readTheme,
    () => 'light' as Theme,
  )

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    themeListeners.forEach((listener) => listener())
  }, [])

  return [theme, toggle]
}

/** Copies text to the clipboard and reports `true` for a short moment afterwards. */
export function useCopy(timeout = 1600): [boolean, (text: string) => void] {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard?.writeText(text).then(
        () => {
          setCopied(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setCopied(false), timeout)
        },
        () => setCopied(false),
      )
    },
    [timeout],
  )

  return [copied, copy]
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (listener) => {
      const query = matchMedia('(prefers-reduced-motion: reduce)')
      query.addEventListener('change', listener)
      return () => query.removeEventListener('change', listener)
    },
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

/** Becomes `true` once the element has scrolled into view, and stays true. */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [inView, rootMargin])

  return [ref, inView] as const
}

type RepoStats = { version: string; stars: number | null }

let statsPromise: Promise<RepoStats> | null = null

function fetchRepoStats(): Promise<RepoStats> {
  statsPromise ??= Promise.all([
    fetch(project.pypiJsonUrl)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => (data?.info?.version as string | undefined) ?? project.version)
      .catch(() => project.version),
    fetch(project.githubApiUrl)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => (typeof data?.stargazers_count === 'number' ? data.stargazers_count : null))
      .catch(() => null),
  ]).then(([version, stars]) => ({ version, stars }))
  return statsPromise
}

/** Latest PyPI version and GitHub star count, falling back to the bundled version offline. */
export function useRepoStats(): RepoStats {
  const [stats, setStats] = useState<RepoStats>({ version: project.version, stars: null })

  useEffect(() => {
    let active = true
    fetchRepoStats().then((result) => {
      if (active) setStats(result)
    })
    return () => {
      active = false
    }
  }, [])

  return stats
}
