import { Heart } from 'lucide-react'
import { Link } from 'react-router'
import { project } from '../data/project'
import GitHubIcon from './GitHubIcon'
import Logo from './Logo'

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'Quick start', to: '/#quick-start' },
      { label: 'Project structure', to: '/#structure' },
      { label: 'Roadmap', to: '/#roadmap' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Installation', to: '/docs#installation' },
      { label: 'Configuration', to: '/docs#configuration' },
      { label: 'Database', to: '/docs#database' },
      { label: 'Migrations', to: '/docs#migrations' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: project.repoUrl },
      { label: 'Issues', href: project.issuesUrl },
      { label: 'PyPI', href: project.pypiUrl },
      { label: 'MIT License', href: project.licenseUrl },
    ],
  },
]

const linkClass =
  'text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.015]">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_2fr] lg:px-8">
      <div className="max-w-sm">
        <Logo />
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          An open-source CLI that scaffolds ready-to-run FastAPI projects, so you can skip the boilerplate and
          start building your API.
        </p>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
        >
          <GitHubIcon />
          udarakalpana/fastapi-foundry
        </a>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  {'to' in link ? (
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} fastapi-foundry · Released under the MIT License.</p>
        <p className="inline-flex items-center gap-1.5">
          Made with <Heart className="size-3.5 fill-rose-500 text-rose-500" aria-label="love" /> for the
          FastAPI community
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
