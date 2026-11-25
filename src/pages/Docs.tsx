import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, List } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router'
import { project } from '../data/project'
import { topicGroups, topics, type Subtopic, type Topic } from './docs/topics'
import NotFound from './NotFound'

/** `/docs` opens the first topic. Old single-page links such as `/docs#models` go to `/docs/models`. */
export const DocsIndex = () => {
  const { hash } = useLocation()
  const legacy = topics.find((topic) => topic.slug === decodeURIComponent(hash.slice(1)))
  return <Navigate to={`/docs/${(legacy ?? topics[0]).slug}`} replace />
}

/** The subtopic heading nearest the top of the viewport, or `undefined` above the first one. */
const useActiveSubtopic = (subtopics: Subtopic[]) => {
  const [active, setActive] = useState<string | undefined>()

  useEffect(() => {
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current: string | undefined
      for (const { id } of subtopics) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= 130) current = id
      }
      // A short last section never reaches the top, so mark it once the page can't scroll further.
      if (atBottom && current && subtopics.length) current = subtopics[subtopics.length - 1].id
      setActive(current)
    }
    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [subtopics])

  return active
}

type NavProps = { current: Topic; activeSubtopic?: string; onNavigate?: () => void }

const TopicItem = ({ topic, current, activeSubtopic, onNavigate }: NavProps & { topic: Topic }) => {
  const isCurrent = topic.slug === current.slug
  // The current topic starts expanded; any topic with subtopics can be opened or closed by hand.
  const [toggled, setToggled] = useState<boolean | undefined>()
  const expanded = toggled ?? isCurrent
  const hasSubtopics = topic.subtopics.length > 0
  const Chevron = expanded ? ChevronDown : ChevronRight
  const listId = `subtopics-${topic.slug}`

  return (
    <li>
      <div className="flex items-center">
        <Link
          to={`/docs/${topic.slug}`}
          onClick={onNavigate}
          aria-current={isCurrent ? 'page' : undefined}
          className={`-ml-px block flex-1 border-l py-1.5 pl-4 text-sm transition ${
            isCurrent
              ? 'border-brand-600 font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300'
              : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {topic.label}
        </Link>
        {hasSubtopics && (
          <button
            type="button"
            onClick={() => setToggled(!expanded)}
            aria-expanded={expanded}
            aria-controls={listId}
            aria-label={`${expanded ? 'Hide' : 'Show'} ${topic.label} subtopics`}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Chevron className="size-3.5" />
          </button>
        )}
      </div>
      {hasSubtopics && expanded && (
        <ul id={listId} className="mb-1.5 space-y-0.5">
          {topic.subtopics.map((subtopic) => {
            const isActive = isCurrent && activeSubtopic === subtopic.id
            return (
              <li key={subtopic.id}>
                <Link
                  to={`/docs/${topic.slug}#${subtopic.id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? 'location' : undefined}
                  className={`-ml-px block border-l py-1 pr-2 pl-7 text-[13px] leading-5 transition ${
                    isActive
                      ? 'border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300'
                      : 'border-transparent text-slate-500 hover:border-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white'
                  }`}
                >
                  {subtopic.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

const TopicNav = (props: NavProps) => (
  <div className="space-y-7">
    {topicGroups.map((group) => (
      <div key={group}>
        <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">{group}</p>
        <ul className="space-y-0.5 border-l border-slate-200 dark:border-white/10">
          {topics
            .filter((topic) => topic.group === group)
            .map((topic) => (
              // Keyed by the current page too, so a hand-toggled section resets on navigation.
              <TopicItem key={`${topic.slug}:${props.current.slug}`} topic={topic} {...props} />
            ))}
        </ul>
      </div>
    ))}
  </div>
)

const Sidebar = (props: NavProps) => (
  <nav
    aria-label="Documentation"
    className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-2 pb-8"
  >
    <TopicNav {...props} />
    <a
      href={project.issuesUrl}
      target="_blank"
      rel="noreferrer"
      className="mt-8 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white"
    >
      Report an issue <ArrowUpRight className="size-3.5" />
    </a>
  </nav>
)

const MobileNav = (props: NavProps) => {
  const [open, setOpen] = useState(false)
  const subtopic = props.current.subtopics.find((item) => item.id === props.activeSubtopic)

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden dark:border-white/10 dark:bg-[#070b16]/90">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-docs-nav"
        className="flex w-full min-w-0 items-center gap-2 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        <List className="size-4 shrink-0" />
        <span className="truncate">
          {props.current.label}
          {subtopic && <span className="text-slate-400 dark:text-slate-500"> › {subtopic.label}</span>}
        </span>
        <ChevronDown className={`ml-auto size-4 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav
          id="mobile-docs-nav"
          aria-label="Documentation"
          className="max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain pt-1 pb-5"
        >
          <TopicNav {...props} onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  )
}

const Pager = ({ current }: { current: Topic }) => {
  const index = topics.indexOf(current)
  const previous = topics[index - 1]
  const next = topics[index + 1]
  const card =
    'group flex flex-col gap-1 rounded-xl border border-slate-200 p-4 transition hover:border-brand-400 hover:bg-slate-50 dark:border-white/10 dark:hover:border-brand-400/50 dark:hover:bg-white/[0.03]'

  return (
    <nav
      aria-label="Previous and next topics"
      className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-white/10"
    >
      {previous ? (
        <Link to={`/docs/${previous.slug}`} className={card}>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
          <span className="font-medium text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next && (
        <Link to={`/docs/${next.slug}`} className={`${card} sm:items-end sm:text-right`}>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            Next <ArrowRight className="size-3.5" />
          </span>
          <span className="font-medium text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
            {next.label}
          </span>
        </Link>
      )}
    </nav>
  )
}

const DocsPage = ({ topic }: { topic: Topic }) => {
  const activeSubtopic = useActiveSubtopic(topic.subtopics)

  useEffect(() => {
    document.title = `${topic.label} · fastapi-foundry docs`
    return () => {
      document.title = 'fastapi-foundry · Scaffold FastAPI projects in seconds'
    }
  }, [topic])

  const { Content } = topic

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <MobileNav key={topic.slug} current={topic} activeSubtopic={activeSubtopic} />
      <div className="grid gap-12 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-16">
        <aside className="hidden lg:block">
          <Sidebar current={topic} activeSubtopic={activeSubtopic} />
        </aside>

        <article className="max-w-3xl min-w-0">
          <header className="mb-8">
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              {topic.group} · v{project.version}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl dark:text-white">
              {topic.label}
            </h1>
          </header>
          <Content />
          <Pager current={topic} />
        </article>
      </div>
    </div>
  )
}

const Docs = () => {
  const { slug } = useParams()
  const topic = topics.find((item) => item.slug === slug)
  return topic ? <DocsPage topic={topic} /> : <NotFound />
}

export default Docs
