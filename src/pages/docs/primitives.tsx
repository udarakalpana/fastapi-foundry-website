import { AlertTriangle, Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

const linkClass = 'font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400'

/** A link to another site, opened in a new tab. */
export const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
    {children}
  </a>
)

/** A link to another documentation page, for example `to="models"` or `to="models#using-a-model"`. */
export const DocLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={`/docs/${to}`} className={linkClass}>
    {children}
  </Link>
)

/** A subtopic heading. Its `id` must match a subtopic listed for the page in `topics.ts`. */
export const H3 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h3
    id={id}
    className="group mt-10 scroll-mt-14 text-xl font-semibold tracking-tight text-slate-900 first:mt-0 lg:scroll-mt-0 dark:text-white"
  >
    <Link to={{ hash: id }} className="relative">
      <span
        aria-hidden="true"
        className="absolute top-0 -left-5 hidden text-slate-300 opacity-0 transition group-hover:opacity-100 lg:inline dark:text-slate-600"
      >
        #
      </span>
      {children}
    </Link>
  </h3>
)

export const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{children}</p>
)

export const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="text-slate-900 dark:text-white">{children}</strong>
)

export const List = ({ children }: { children: ReactNode }) => (
  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-slate-400 dark:text-slate-400">
    {children}
  </ul>
)

export const Callout = ({ tone = 'info', children }: { tone?: 'info' | 'warning'; children: ReactNode }) => {
  const Icon = tone === 'info' ? Info : AlertTriangle
  return (
    <div
      className={`mt-6 flex gap-3 rounded-xl border p-4 text-sm leading-6 ${
        tone === 'info'
          ? 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-400/20 dark:bg-brand-400/5 dark:text-brand-100'
          : 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/5 dark:text-amber-100'
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}

export const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-slate-900 dark:bg-white/[0.03] dark:text-white">
        <tr>
          {head.map((cell) => (
            <th key={cell} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
        {rows.map((row, index) => (
          <tr key={index} className="align-top">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-3 text-slate-600 dark:text-slate-400">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/** A monospace cell for the first column of reference tables. */
export const MonoCell = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-xs whitespace-nowrap text-slate-900 dark:text-slate-100">{children}</span>
)
