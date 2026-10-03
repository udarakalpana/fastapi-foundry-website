import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDashed,
  Database,
  GitBranch,
  Layers,
  Package,
  Repeat,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Undo2,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router'
import CodeBlock from '../components/CodeBlock'
import FileExplorer from '../components/FileExplorer'
import GitHubIcon from '../components/GitHubIcon'
import { RichText } from '../components/InlineCode'
import InstallTabs from '../components/InstallTabs'
import SectionHeading from '../components/SectionHeading'
import Terminal, { type TerminalLine } from '../components/Terminal'
import { generatedFiles } from '../data/generatedProject'
import {
  contributeCommands,
  features,
  localUrls,
  project,
  quickStartSteps,
  roadmap,
  stack,
  type Feature,
} from '../data/project'
import { useCopy, useRepoStats } from '../lib/hooks'

const heroSession: TerminalLine[] = [
  { kind: 'command', text: 'uvx fastapi-foundry init myproject' },
  { kind: 'output', text: 'Created FastAPI project: myproject', tone: 'success' },
  { kind: 'output', text: '' },
  { kind: 'output', text: 'Next steps:' },
  { kind: 'output', text: '  cd myproject', tone: 'muted' },
  { kind: 'output', text: '  uv sync', tone: 'muted' },
  { kind: 'output', text: '  uv run uvicorn app.routes:app --reload', tone: 'muted' },
  { kind: 'command', text: 'cd myproject && uv sync' },
  { kind: 'command', text: 'uv run uvicorn app.routes:app --reload' },
  {
    kind: 'output',
    text: 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)',
    tone: 'info',
  },
  { kind: 'output', text: 'INFO:     Application startup complete.', tone: 'info' },
]

const migrationSession: TerminalLine[] = [
  { kind: 'command', text: 'fastapi-foundry migration' },
  { kind: 'output', text: '' },
  { kind: 'output', text: 'Is this migration for an existing table or a new table?' },
  { kind: 'output', text: '  1) Existing table', tone: 'muted' },
  { kind: 'output', text: '  2) New table', tone: 'muted' },
  { kind: 'output', text: 'Select [1-2]: 2', tone: 'accent' },
  {
    kind: 'output',
    text: 'What is the name of the table this migration should structure: posts',
    tone: 'accent',
  },
  {
    kind: 'output',
    text: 'Created migration: app/database/20260922143512_create_posts_table.py',
    tone: 'success',
  },
  { kind: 'command', text: 'fastapi-foundry migrate' },
  { kind: 'output', text: 'Migrating:    20260922143022_create_users_table', tone: 'muted' },
  { kind: 'output', text: 'Migrated:     20260922143022_create_users_table', tone: 'success' },
  { kind: 'output', text: 'Migrating:    20260922143512_create_posts_table', tone: 'muted' },
  { kind: 'output', text: 'Migrated:     20260922143512_create_posts_table', tone: 'success' },
]

const featureIcons: Record<Feature['icon'], typeof Zap> = {
  zap: Zap,
  rocket: Rocket,
  layers: Layers,
  shield: ShieldCheck,
  repeat: Repeat,
  database: Database,
  settings: SlidersHorizontal,
  git: GitBranch,
}

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-600/30 active:translate-y-0'

const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'

const Hero = () => (
  <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
    <div
      aria-hidden="true"
      className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
    />
    <div
      aria-hidden="true"
      className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-500/25 via-sky-400/10 to-teal-400/25 blur-3xl dark:from-brand-600/30 dark:to-teal-500/20"
    />

    <div
      className={`${container} grid items-center gap-14 [&>*]:min-w-0 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-28`}
    >
      <div className="animate-fade-up">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 py-1 pr-3 pl-1 text-xs font-medium text-brand-800 backdrop-blur transition hover:border-brand-300 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-200"
        >
          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-white">Open source</span>
          MIT licensed · Python {project.pythonVersion}+
          <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
        </a>

        <h1
          id="hero-title"
          className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[3.5rem] xl:text-6xl dark:text-white"
        >
          Forge ready‑to‑run FastAPI projects <span className="text-gradient">in seconds.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-400">
          <strong className="font-semibold text-slate-900 dark:text-white">fastapi-foundry</strong> is a
          command-line tool that gives you a clean <code className="font-mono text-[0.9em]">app/</code>{' '}
          layout, a modern uv-compatible <code className="font-mono text-[0.9em]">pyproject.toml</code>,
          environment-based configuration and a database connection, so you skip the boilerplate and start
          building your API.
        </p>

        <div className="mt-8">
          <InstallTabs />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/docs" className={primaryButton}>
            <BookOpen className="size-4" />
            Read the docs
          </Link>
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className={secondaryButton}>
            <GitHubIcon />
            Star on GitHub
          </a>
        </div>
      </div>

      <div className="relative animate-fade-up [animation-delay:150ms]">
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/30 to-teal-400/30 opacity-60 blur-2xl"
        />
        <Terminal lines={heroSession} title="~/code — zsh" />
      </div>
    </div>

    <div className="border-y border-slate-200/70 bg-white/60 backdrop-blur dark:border-white/5 dark:bg-white/[0.02]">
      <div
        className={`${container} flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center sm:gap-8`}
      >
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          Generated projects are built on
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {stack.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-base font-semibold text-slate-400 transition hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

const Features = () => (
  <section id="features" className="py-24 sm:py-28" aria-labelledby="features-title">
    <div className={container}>
      <SectionHeading
        id="features-title"
        eyebrow="Features"
        title="Everything a new FastAPI project needs, nothing it doesn't"
        description="One command sets up the parts every API starts with, laid out the way you would lay them out yourself."
      />
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature.icon]
          return (
            <li
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/30 dark:hover:bg-white/[0.05]"
            >
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br from-brand-500/0 to-teal-400/0 blur-2xl transition duration-500 group-hover:from-brand-500/15 group-hover:to-teal-400/15"
              />
              <div
                className={`inline-flex size-11 items-center justify-center rounded-xl text-white shadow-lg ${
                  index % 2 === 0
                    ? 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-600/25'
                    : 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-teal-600/25'
                }`}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <RichText text={feature.description} />
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
)

const StepCommand = ({ command }: { command: string }) => {
  const [copied, copy] = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(command)}
      aria-label={`Copy command: ${command}`}
      className="group mt-4 flex w-full items-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-left font-mono text-xs text-slate-200 transition hover:bg-slate-800 dark:bg-black/40 dark:ring-1 dark:ring-white/10"
    >
      {!command.startsWith('http') && <span className="text-teal-400 select-none">$</span>}
      <span className="flex-1 break-all">{command}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0 text-teal-400" />
      ) : (
        <span className="shrink-0 text-[10px] font-sans tracking-wide text-slate-500 uppercase group-hover:text-slate-300">
          Copy
        </span>
      )}
    </button>
  )
}

const QuickStart = () => (
  <section
    id="quick-start"
    className="relative border-y border-slate-200 bg-slate-50/70 py-24 sm:py-28 dark:border-white/5 dark:bg-white/[0.015]"
    aria-labelledby="quick-start-title"
  >
    <div className={container}>
      <SectionHeading
        id="quick-start-title"
        eyebrow="Quick start"
        title="From zero to a running API in four steps"
        description={
          <>
            All you need is Python {project.pythonVersion}+ and{' '}
            <a
              href={project.uvInstallUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
            >
              uv
            </a>{' '}
            (recommended) or pip.
          </>
        }
      />

      <div className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-brand-300 via-sky-300 to-teal-300 lg:block dark:from-brand-500/50 dark:via-sky-500/30 dark:to-teal-500/50"
        />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickStartSteps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center text-center lg:px-2">
              <span className="relative flex size-12 items-center justify-center rounded-full border-4 border-slate-50 bg-gradient-to-br from-brand-600 to-teal-600 text-lg font-bold text-white shadow-lg shadow-brand-600/20 dark:border-[#0a0e19]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
              <StepCommand command={step.command} />
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
        <p className="border-b border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-white/10 dark:text-white">
          Your local URLs
        </p>
        <ul className="divide-y divide-slate-100 dark:divide-white/5">
          {localUrls.map((item) => (
            <li key={item.url} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:gap-6">
              <code className="shrink-0 font-mono text-sm text-brand-700 sm:w-64 dark:text-brand-300">
                {item.url}
              </code>
              <span className="text-sm text-slate-600 dark:text-slate-400">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

const Structure = () => (
  <section id="structure" className="py-24 sm:py-28" aria-labelledby="structure-title">
    <div className={container}>
      <SectionHeading
        id="structure-title"
        eyebrow="Generated project"
        title="Explore exactly what you get"
        description="This is the real output of fastapi-foundry init myproject. Pick any file to see its contents."
      />
      <div className="mt-14">
        <FileExplorer />
      </div>
      <ul className="mt-10 grid gap-6 text-sm sm:grid-cols-3">
        {[
          {
            title: 'Applications, not libraries',
            text: 'No `[build-system]` and no `__init__.py`. `app/` is a namespace package that uvicorn imports from the project root.',
          },
          {
            title: 'One module per concern',
            text: 'Settings live in `app/config/`, request handling in `app/controller/` and migrations in `app/database/`.',
          },
          {
            title: 'Secrets stay local',
            text: '`.env` is git-ignored. `.env.example` carries the same keys, so teammates know what to set.',
          },
        ].map((item) => (
          <li key={item.title} className="flex gap-3">
            <Check className="mt-0.5 size-5 shrink-0 text-teal-600 dark:text-teal-400" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                <RichText text={item.text} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const Architecture = () => (
  <section
    className="relative overflow-hidden bg-[#070b16] py-24 text-slate-300 sm:py-28"
    aria-labelledby="architecture-title"
  >
    <div
      aria-hidden="true"
      className="bg-grid absolute inset-0 opacity-60 [--grid-line:rgb(148_163_184/0.06)]"
    />
    <div
      aria-hidden="true"
      className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-600/20 blur-3xl"
    />
    <div className={`${container} relative grid items-center gap-14 [&>*]:min-w-0 lg:grid-cols-2`}>
      <div>
        <p className="text-sm font-semibold tracking-wide text-teal-400 uppercase">Architecture</p>
        <h2
          id="architecture-title"
          className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
        >
          Thin routes. Focused controllers.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Routes in <code className="font-mono text-slate-200">app/routes.py</code> stay small and hand the
          work to a controller class. Add a controller per resource in{' '}
          <code className="font-mono text-slate-200">app/controller/</code> and give it a route. The structure
          stays the same as your API grows.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6">
          {[
            { label: 'Run command in every project', value: 'app.routes:app' },
            { label: 'Database dependency', value: 'get_db' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <dt className="text-xs text-slate-500">{item.label}</dt>
              <dd className="mt-1 font-mono text-sm text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="space-y-4">
        <CodeBlock
          code={generatedFiles['app/routes.py']}
          language="python"
          title="app/routes.py"
          lineNumbers
        />
        <div className="flex items-center gap-3 pl-6 text-xs font-medium text-slate-500" aria-hidden="true">
          <span className="h-6 w-px bg-gradient-to-b from-brand-400 to-teal-400" />
          delegates to
        </div>
        <CodeBlock
          code={generatedFiles['app/controller/home_controller.py']}
          language="python"
          title="app/controller/home_controller.py"
          lineNumbers
        />
      </div>
    </div>
  </section>
)

const DatabaseSection = () => (
  <section id="database" className="py-24 sm:py-28" aria-labelledby="database-title">
    <div className={`${container} grid items-center gap-14 [&>*]:min-w-0 lg:grid-cols-2`}>
      <div className="order-2 space-y-4 lg:order-1">
        <CodeBlock
          code={`from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.config.sqlalchemy_connection import get_db


@app.get("/items")
def list_items(db: Annotated[Session, Depends(get_db)]) -> list[dict]:
    ...`}
          language="python"
          title="app/routes.py"
        />
        <CodeBlock
          code={`DB_CONNECTION=mysql+pymysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_fastapi_app
DB_USERNAME=<user>
DB_PASSWORD=<password>`}
          language="env"
          title=".env"
        />
      </div>
      <div className="order-1 lg:order-2">
        <SectionHeading
          align="left"
          id="database-title"
          eyebrow="Database ready"
          title="A database session is one dependency away"
          description="Every project comes with a SQLAlchemy engine and a get_db dependency that opens one session per request and closes it afterwards."
        />
        <ul className="mt-8 space-y-4">
          {[
            'MySQL through PyMySQL by default. Swap the dialect with `DB_CONNECTION`.',
            'Credentials are built into a URL with `URL.create`, so `@`, `:` or `/` in a password need no escaping.',
            'Set `DATABASE_URL` to supply a complete URL (Docker, CI). It overrides the `DB_*` settings.',
            'Connections open lazily: the app starts even when the database is not reachable.',
            '`pool_pre_ping` replaces connections the server dropped while idle.',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-400">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <Check className="size-3.5" />
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/docs#configuration"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 dark:text-brand-400"
          style={{ transition: 'gap 150ms' }}
        >
          See all configuration options <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  </section>
)

const Migrations = () => (
  <section
    id="migrations"
    className="border-y border-slate-200 bg-slate-50/70 py-24 sm:py-28 dark:border-white/5 dark:bg-white/[0.015]"
    aria-labelledby="migrations-title"
  >
    <div className={container}>
      <SectionHeading
        id="migrations-title"
        eyebrow="Migrations"
        title="Write, run and roll back migrations"
        description="fastapi-foundry migration asks whether you are creating a new table or changing an existing one and writes the file. fastapi-foundry migrate applies everything pending to your database."
      />
      <div className="mt-14 grid items-start gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <Terminal lines={migrationSession} title="~/code/myproject — zsh" />
        <div className="space-y-4">
          <CodeBlock
            code={generatedFiles['app/database/20260922143022_create_users_table.py'].replace(
              /users/g,
              'posts',
            )}
            language="python"
            title="app/database/20260922143512_create_posts_table.py"
            lineNumbers
          />
          <p className="flex gap-2.5 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900 dark:border-brand-400/20 dark:bg-brand-400/5 dark:text-brand-100">
            <Undo2 className="mt-0.5 size-4 shrink-0" />
            <span>
              Each <code className="font-mono">migrate</code> run is one batch.{' '}
              <code className="font-mono">fastapi-foundry migrate:rollback</code> reverts the last batch, and{' '}
              <code className="font-mono">migrate:status</code> shows what has run.
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
)

const Roadmap = () => {
  const shipped = roadmap.filter((item) => item.done)
  const planned = roadmap.filter((item) => !item.done)

  return (
    <section id="roadmap" className="py-24 sm:py-28" aria-labelledby="roadmap-title">
      <div className={container}>
        <SectionHeading
          id="roadmap-title"
          eyebrow="Roadmap"
          title="Early days, moving fast"
          description="fastapi-foundry is in early development. Here is what works today and what is coming next."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {[
            { title: 'Available now', items: shipped, done: true },
            { title: 'Planned', items: planned, done: false },
          ].map((column) => (
            <div key={column.title}>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <span
                  className={`size-2 rounded-full ${column.done ? 'bg-teal-500' : 'bg-brand-500'}`}
                  aria-hidden="true"
                />
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li
                    key={item.title}
                    className={`flex gap-4 rounded-xl border p-4 transition ${
                      column.done
                        ? 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]'
                        : 'border-dashed border-slate-300 bg-transparent dark:border-white/15'
                    }`}
                  >
                    {column.done ? (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <CircleDashed className="size-6 shrink-0 text-brand-500 dark:text-brand-400" />
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                        <RichText text={item.description} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Community = () => {
  const { stars } = useRepoStats()

  return (
    <section id="contribute" className="pb-24 sm:pb-28" aria-labelledby="contribute-title">
      <div className={container}>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-teal-600 px-6 py-14 shadow-2xl shadow-brand-700/20 sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 -z-10 [--grid-line:rgb(255_255_255/0.08)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-teal-300/30 blur-3xl"
          />
          <div className="grid items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="text-sm font-semibold tracking-wide text-teal-200 uppercase">Open source</p>
              <h2
                id="contribute-title"
                className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
              >
                Built in the open. Shaped by you.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                fastapi-foundry is MIT licensed and welcomes issues and pull requests. Found a bug, want a
                generator, or have an idea for the roadmap? Join in on GitHub.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50"
                >
                  <Star className="size-4" />
                  Star on GitHub
                  {stars !== null && <span className="rounded-md bg-brand-100 px-1.5 text-xs">{stars}</span>}
                </a>
                <a
                  href={project.issuesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <GitHubIcon />
                  Open an issue
                </a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-brand-100">Set up a development environment</p>
              <CodeBlock code={contributeCommands} language="bash" prompt className="!border-white/15" />
              <p className="mt-3 text-sm text-brand-100">
                Then run the CLI from your checkout with{' '}
                <code className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-xs text-white">
                  uv run fastapi-foundry init myproject
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FinalCta = () => {
  const [copied, copy] = useCopy()
  const command = 'uvx fastapi-foundry init myproject'

  return (
    <section className="border-t border-slate-200 py-20 dark:border-white/5" aria-labelledby="cta-title">
      <div className={`${container} text-center`}>
        <Package className="mx-auto size-10 text-brand-600 dark:text-brand-400" aria-hidden="true" />
        <h2
          id="cta-title"
          className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
        >
          Your next FastAPI project is one command away
        </h2>
        <button
          type="button"
          onClick={() => copy(command)}
          className="mx-auto mt-8 flex max-w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-mono text-sm text-slate-800 shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-brand-300 sm:text-base dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-brand-400/40"
          aria-label={`Copy command: ${command}`}
        >
          <span className="text-teal-600 select-none dark:text-teal-400">$</span>
          <span className="truncate">{command}</span>
          <span className="ml-2 shrink-0 font-sans text-xs font-medium text-slate-500">
            {copied ? '✓ Copied' : 'Click to copy'}
          </span>
        </button>
        <Link
          to="/docs"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        >
          Read the full documentation <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}

const Home = () => (
  <>
    <Hero />
    <Features />
    <QuickStart />
    <Structure />
    <Architecture />
    <DatabaseSection />
    <Migrations />
    <Roadmap />
    <Community />
    <FinalCta />
  </>
)

export default Home
