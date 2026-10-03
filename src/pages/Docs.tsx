import { AlertTriangle, ArrowUpRight, Info, List } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import CodeBlock from '../components/CodeBlock'
import FileExplorer from '../components/FileExplorer'
import { Code } from '../components/InlineCode'
import { generatedFiles } from '../data/generatedProject'
import { commands, configVars, contributeCommands, localUrls, project, roadmap } from '../data/project'

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'project-structure', label: 'Project structure' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'database', label: 'Database connection' },
  { id: 'project-names', label: 'Project names' },
  { id: 'commands', label: 'Command reference' },
  { id: 'migrations', label: 'Migrations' },
  { id: 'writing-migrations', label: 'Writing migrations' },
  { id: 'running-migrations', label: 'Running migrations' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contributing', label: 'Contributing' },
  { id: 'license', label: 'License' },
]

/** Tracks which section heading is nearest the top of the viewport. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        const first = ids.find((id) => visible.get(id))
        if (first) setActive(first)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

const sectionIds = sections.map((section) => section.id)

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="group scroll-mt-10 lg:scroll-mt-0 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
    <a href={`#${id}`} className="relative">
      <span
        aria-hidden="true"
        className="absolute top-0 -left-6 hidden text-slate-300 opacity-0 transition group-hover:opacity-100 lg:inline dark:text-slate-600"
      >
        #
      </span>
      {children}
    </a>
  </h2>
)

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">{children}</h3>
)

const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{children}</p>
)

const Callout = ({ tone = 'info', children }: { tone?: 'info' | 'warning'; children: ReactNode }) => {
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

const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
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

const Sidebar = ({ active }: { active: string }) => (
  <nav aria-label="Documentation" className="sticky top-24">
    <p className="mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">On this page</p>
    <ul className="space-y-0.5 border-l border-slate-200 dark:border-white/10">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            aria-current={active === section.id ? 'location' : undefined}
            className={`-ml-px block border-l py-1.5 pl-4 text-sm transition ${
              active === section.id
                ? 'border-brand-600 font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300'
                : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
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

const MobileToc = ({ active }: { active: string }) => {
  const [open, setOpen] = useState(false)
  const current = sections.find((section) => section.id === active)

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden dark:border-white/10 dark:bg-[#070b16]/90">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-toc"
        className="flex w-full items-center gap-2 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        <List className="size-4" />
        {current?.label ?? 'On this page'}
      </button>
      {open && (
        <ul id="mobile-toc" className="grid grid-cols-2 gap-1 pb-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-2 py-1.5 text-sm ${
                  active === section.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// The operations app/database/schema.py gives migrations.
const schemaOperations = [
  ['create_table(table, *columns)', 'Create a table from SQLAlchemy Column objects'],
  ['drop_table(table)', 'Drop a table'],
  ['rename_table(table, new_name)', 'Rename a table'],
  ['add_column(table, column)', 'Add a Column to an existing table'],
  ['drop_column(table, column)', 'Drop a column by name'],
  [
    'alter_column(table, column, **changes)',
    "Change a column: nullable, type_, new_column_name and the rest of Alembic's alter_column options",
  ],
  ['create_index(table, columns, unique=False)', 'Create an index named ix_<table>_<columns>'],
  ['drop_index(table, columns)', 'Drop the index create_index made for those columns'],
  ['execute(sql)', 'Run raw SQL, for example to backfill data after adding a column'],
]

const updateMigrationExample = `"""Update table 'users'."""

from sqlalchemy import Column, String

from app.database.schema import Schema

# Read by \`\`fastapi-foundry migration\`\` to list the tables that already exist.
TABLE = "users"


def upgrade(schema: Schema) -> None:
    """Apply this migration."""
    schema.add_column(TABLE, Column("email", String(255), nullable=True))
    schema.create_index(TABLE, ["email"], unique=True)


def downgrade(schema: Schema) -> None:
    """Revert this migration."""
    schema.drop_index(TABLE, ["email"])
    schema.drop_column(TABLE, "email")
`

const link = 'font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400'

const Docs = () => {
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    document.title = 'Documentation · fastapi-foundry'
    return () => {
      document.title = 'fastapi-foundry · Scaffold FastAPI projects in seconds'
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <MobileToc active={active} />
      <div className="grid gap-12 py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:py-16">
        <aside className="hidden lg:block">
          <Sidebar active={active} />
        </aside>

        <article className="max-w-3xl min-w-0 space-y-16">
          <header>
            <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
              Documentation · v{project.version}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              fastapi-foundry
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Everything you need to scaffold, configure and grow a FastAPI project with fastapi-foundry.
            </p>
          </header>

          <section>
            <H2 id="introduction">Introduction</H2>
            <P>
              <strong className="text-slate-900 dark:text-white">fastapi-foundry</strong> is a command-line
              tool that scaffolds new{' '}
              <a href={project.fastapiUrl} target="_blank" rel="noreferrer" className={link}>
                FastAPI
              </a>{' '}
              projects in seconds. One command gives you a ready-to-run application with a clean{' '}
              <Code>app/</Code> layout, a modern{' '}
              <a href={project.uvUrl} target="_blank" rel="noreferrer" className={link}>
                uv
              </a>
              -compatible <Code>pyproject.toml</Code>, environment-based configuration and a sensible{' '}
              <Code>.gitignore</Code>, so you can skip the boilerplate and start building your API.
            </P>
            <div className="mt-6">
              <CodeBlock code="uvx fastapi-foundry init myproject" language="bash" prompt />
            </div>
          </section>

          <section>
            <H2 id="requirements">Requirements</H2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-slate-400 dark:text-slate-400">
              <li>
                Python <strong className="text-slate-900 dark:text-white">{project.pythonVersion}</strong> or
                newer
              </li>
              <li>
                <a href={project.uvInstallUrl} target="_blank" rel="noreferrer" className={link}>
                  uv
                </a>{' '}
                (recommended) or pip
              </li>
            </ul>
            <P>Install uv if you don&apos;t have it yet:</P>
            <div className="mt-4 space-y-3">
              <CodeBlock
                code="curl -LsSf https://astral.sh/uv/install.sh | sh"
                language="bash"
                title="macOS and Linux"
              />
              <CodeBlock
                code={'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"'}
                language="bash"
                title="Windows (PowerShell)"
              />
            </div>
          </section>

          <section>
            <H2 id="installation">Installation</H2>
            <H3>Option 1: Run without installing (recommended)</H3>
            <P>
              <Code>uvx</Code> downloads and runs the latest version in a temporary environment:
            </P>
            <div className="mt-4">
              <CodeBlock code="uvx fastapi-foundry init myproject" language="bash" prompt />
            </div>
            <H3>Option 2: Install as a global command</H3>
            <div className="mt-4 space-y-3">
              <CodeBlock code="uv tool install fastapi-foundry" language="bash" prompt />
              <P>Then use it from any directory, and upgrade it later:</P>
              <CodeBlock
                code={'fastapi-foundry init myproject\nuv tool upgrade fastapi-foundry'}
                language="bash"
                prompt
              />
            </div>
            <H3>Option 3: Install with pip</H3>
            <div className="mt-4">
              <CodeBlock code="pip install fastapi-foundry" language="bash" prompt />
            </div>
          </section>

          <section>
            <H2 id="quick-start">Quick start</H2>
            <ol className="mt-6 space-y-6">
              {[
                {
                  title: 'Create a project',
                  code: 'uvx fastapi-foundry init myproject',
                  output:
                    'Created FastAPI project: myproject\n\nNext steps:\n  cd myproject\n  uv sync\n  uv run uvicorn app.routes:app --reload',
                },
                { title: 'Install dependencies', code: 'cd myproject\nuv sync' },
                { title: 'Run the application', code: 'uv run uvicorn app.routes:app --reload' },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 space-y-3">
                    <p className="pt-0.5 font-medium text-slate-900 dark:text-white">{step.title}</p>
                    <CodeBlock code={step.code} language="bash" prompt />
                    {step.output && <CodeBlock code={step.output} title="Output" />}
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  4
                </span>
                <div className="min-w-0 flex-1">
                  <p className="pt-0.5 font-medium text-slate-900 dark:text-white">Open it in your browser</p>
                  <Table
                    head={['URL', 'Description']}
                    rows={localUrls.map((item) => [<Code>{item.url}</Code>, item.description])}
                  />
                </div>
              </li>
            </ol>
          </section>

          <section>
            <H2 id="project-structure">Project structure</H2>
            <P>
              Generated projects are applications, not libraries: there is no <Code>[build-system]</Code> and
              no <Code>__init__.py</Code>. <Code>app/</Code> is a namespace package that uvicorn imports from
              the project root. Browse the files below; they are the real output of{' '}
              <Code>fastapi-foundry init myproject</Code>.
            </P>
            <div className="mt-6">
              <FileExplorer />
            </div>
            <P>
              Routes stay thin and hand the work to a controller. Add a controller class per resource in{' '}
              <Code>app/controller/</Code>, and give it a route in <Code>app/routes.py</Code>.
            </P>
          </section>

          <section>
            <H2 id="configuration">Configuration</H2>
            <P>
              Generated projects read their settings from environment variables, with one module per kind of
              configuration in <Code>app/config/</Code>:
            </P>
            <Table
              head={['Variable', 'Module', 'Default', 'Description']}
              rows={configVars.map((item) => [
                <Code>{item.name}</Code>,
                <span className="font-mono text-xs whitespace-nowrap">{item.module}</span>,
                item.defaultValue,
                item.description,
              ])}
            />
            <P>
              Add new settings to the module they belong to, or create a new module in{' '}
              <Code>app/config/</Code> for a new kind of configuration. To load the values from the generated{' '}
              <Code>.env</Code> file, start the server with <Code>--env-file</Code>:
            </P>
            <div className="mt-4">
              <CodeBlock
                code="uv run uvicorn app.routes:app --reload --env-file .env"
                language="bash"
                prompt
              />
            </div>
            <Callout>
              <Code>.env</Code> is git-ignored because it holds your own credentials. Every project also gets
              a committed <Code>.env.example</Code> with the same keys and defaults, so a developer who clones
              the project runs <Code>cp .env.example .env</Code> instead of guessing the key names. When you
              add a setting, add its key to <Code>.env.example</Code> as well.
            </Callout>
          </section>

          <section>
            <H2 id="database">Database connection</H2>
            <P>
              <Code>app/config/database.py</Code> builds <Code>DATABASE_URL</Code> from the <Code>DB_*</Code>{' '}
              settings, and <Code>app/config/sqlalchemy_connection.py</Code> creates the SQLAlchemy engine
              from it and provides <Code>get_db</Code>, a dependency that opens one session per request and
              closes it afterwards. The default database name is the project name in snake_case (
              <Code>my-fastapi-app</Code> → <Code>my_fastapi_app</Code>). Set your own credentials in{' '}
              <Code>.env</Code>:
            </P>
            <div className="mt-4">
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
            <P>
              The URL is built with SQLAlchemy&apos;s <Code>URL.create</Code>, so special characters such as{' '}
              <Code>@</Code>, <Code>:</Code> or <Code>/</Code> in the username or password need no escaping.
              To supply a complete URL instead (for example in Docker or CI), set <Code>DATABASE_URL</Code>;
              it takes precedence over the <Code>DB_*</Code> settings.
            </P>
            <div className="mt-4 space-y-3">
              <CodeBlock
                code={`from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.config.sqlalchemy_connection import get_db


@app.get("/items")
def list_items(db: Annotated[Session, Depends(get_db)]) -> list[dict]:
    ...`}
                language="python"
                title="Using get_db in a route"
              />
              <CodeBlock
                code={generatedFiles['app/config/sqlalchemy_connection.py']}
                language="python"
                title="app/config/sqlalchemy_connection.py"
                lineNumbers
              />
            </div>
            <Callout>
              The engine connects lazily, so the app starts even when the database is not reachable; the first
              request that uses <Code>get_db</Code> is what opens a connection.
            </Callout>
          </section>

          <section>
            <H2 id="project-names">Project names</H2>
            <P>The project name is used for the folder and the distribution name, so it must:</P>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-slate-400 dark:text-slate-400">
              <li>start with a letter</li>
              <li>
                contain only letters, digits, hyphens (<Code>-</Code>) and underscores (<Code>_</Code>)
              </li>
              <li>
                not be a Python keyword or clash with a standard library or FastAPI module (for example{' '}
                <Code>json</Code> or <Code>fastapi</Code>)
              </li>
            </ul>
            <div className="mt-6">
              <CodeBlock code="uvx fastapi-foundry init my-fastapi-app" language="bash" prompt />
            </div>
            <P>
              This creates the <Code>my-fastapi-app/</Code> folder. The name does not appear inside the
              project, so the run command is the same as for every other project:{' '}
              <Code>uv run uvicorn app.routes:app --reload</Code>.
            </P>
            <Callout tone="warning">
              If the target folder already exists, fastapi-foundry stops with an error instead of overwriting
              your files.
            </Callout>
          </section>

          <section>
            <H2 id="commands">Command reference</H2>
            <Table
              head={['Command', 'Description']}
              rows={commands.map((item) => [
                <span className="font-mono text-xs whitespace-nowrap text-slate-900 dark:text-slate-100">
                  {item.command}
                </span>,
                item.description,
              ])}
            />
          </section>

          <section>
            <H2 id="migrations">Migrations</H2>
            <P>
              Run <Code>fastapi-foundry migration</Code> from the project root to add a migration file. It
              asks whether the migration targets an existing table or a new one. For a new table it asks for
              the table name; for an existing table it lists the tables earlier migrations already cover so
              you can pick one.
            </P>
            <div className="mt-4 space-y-3">
              <CodeBlock code="uvx fastapi-foundry migration" language="bash" prompt />
              <CodeBlock
                title="Output"
                code={`Is this migration for an existing table or a new table?
  1) Existing table
  2) New table
Select [1-2]: 2
What is the name of the table this migration should structure: users
Created migration: app/database/20260922143022_create_users_table.py`}
              />
            </div>
            <P>
              Migration files are written to <Code>app/database/</Code>, alongside the <Code>users</Code>{' '}
              migration that every new project ships with. A migration for a new table starts with an{' '}
              <Code>id</Code> primary key and <Code>created_at</Code> / <Code>updated_at</Code> timestamps,
              and its <Code>downgrade()</Code> drops the table again:
            </P>
            <div className="mt-4">
              <CodeBlock
                code={generatedFiles['app/database/20260922143022_create_users_table.py']}
                language="python"
                title="app/database/20260922143022_create_users_table.py"
                lineNumbers
              />
            </div>
            <P>
              A migration for an existing table has empty <Code>upgrade()</Code> and <Code>downgrade()</Code>{' '}
              bodies with commented examples, ready for the change you want to make.
            </P>
            <P>
              Each file records its table in a <Code>TABLE</Code> constant, which is how the command lists
              existing tables, so no database connection is needed. If you edit a <Code>TABLE</Code> value by
              hand, keep it a valid table name; files with invalid names are left out of the list.
            </P>
            <Callout tone="warning">
              Run the migration commands from the project root, the folder with <Code>pyproject.toml</Code>{' '}
              and <Code>app/routes.py</Code>. From anywhere else, including a subfolder such as{' '}
              <Code>app/</Code>, they stop with an error instead of creating files in the wrong place.
            </Callout>
          </section>

          <section>
            <H2 id="writing-migrations">Writing migrations</H2>
            <P>
              <Code>upgrade()</Code> and <Code>downgrade()</Code> receive a <Code>Schema</Code> from{' '}
              <Code>app/database/schema.py</Code>. Describe columns with SQLAlchemy&apos;s <Code>Column</Code>
              , the same way you would in a model, and make changes through these operations:
            </P>
            <Table
              head={['Operation', 'What it does']}
              rows={schemaOperations.map(([operation, description]) => [
                <span className="font-mono text-xs whitespace-nowrap text-slate-900 dark:text-slate-100">
                  {operation}
                </span>,
                description,
              ])}
            />
            <P>
              <Code>timestamps()</Code> returns new <Code>created_at</Code> and <Code>updated_at</Code>{' '}
              columns that default to the current time; spread it into <Code>create_table</Code> with{' '}
              <Code>*timestamps()</Code>. A migration that changes an existing table undoes its{' '}
              <Code>upgrade()</Code> in reverse order:
            </P>
            <div className="mt-4">
              <CodeBlock
                code={updateMigrationExample}
                language="python"
                title="app/database/20260922150410_update_users_table.py"
                lineNumbers
              />
            </div>
            <Callout>
              Don&apos;t import your models into a migration. A migration is a fixed record of one change, but
              a model always describes the latest structure: a migration that builds <Code>users</Code> from
              today&apos;s <Code>User</Code> model would create next month&apos;s columns too, and the later
              migration that adds them would then fail on a fresh database.
            </Callout>
            <Callout tone="warning">
              MySQL needs a column&apos;s current type for most <Code>alter_column</Code> changes, so pass{' '}
              <Code>existing_type</Code> as well, for example{' '}
              <Code>
                schema.alter_column(TABLE, &quot;name&quot;, existing_type=String(100), nullable=False)
              </Code>
              .
            </Callout>
          </section>

          <section>
            <H2 id="running-migrations">Running migrations</H2>
            <P>
              <Code>fastapi-foundry migrate</Code> applies every migration that hasn&apos;t run yet, oldest
              first, to the database configured in <Code>.env</Code>:
            </P>
            <div className="mt-4 space-y-3">
              <CodeBlock code="uvx fastapi-foundry migrate" language="bash" prompt />
              <CodeBlock
                title="Output"
                code={`Migrating:    20260922143022_create_users_table
Migrated:     20260922143022_create_users_table
Migrating:    20260922150410_update_users_table
Migrated:     20260922150410_update_users_table`}
              />
            </div>
            <P>
              Applied migrations are recorded in a <Code>foundry_migrations</Code> table, which{' '}
              <Code>migrate</Code> creates the first time it runs. Each <Code>migrate</Code> run is one{' '}
              <em>batch</em>. <Code>fastapi-foundry migrate:rollback</Code> runs the <Code>downgrade()</Code>{' '}
              of every migration in the last batch, newest first, and <Code>migrate:status</Code> lists every
              migration with its state:
            </P>
            <div className="mt-4 space-y-3">
              <CodeBlock code="uvx fastapi-foundry migrate:status" language="bash" prompt />
              <CodeBlock
                title="Output"
                code={`Status   Batch  Migration
Ran      1      20260922143022_create_users_table
Ran      2      20260922150410_update_users_table
Pending         20260922152233_create_posts_table`}
              />
            </div>
            <H3>How it runs</H3>
            <P>
              Migrations need your project&apos;s dependencies (SQLAlchemy, Alembic and the database driver)
              and its settings, so fastapi-foundry runs the project&apos;s own{' '}
              <Code>app/database/migrator.py</Code> inside the project&apos;s environment with{' '}
              <Code>uv run</Code>, loading <Code>.env</Code> when it exists. The SQL itself comes from{' '}
              <a href="https://alembic.sqlalchemy.org/" target="_blank" rel="noreferrer" className={link}>
                Alembic
              </a>
              , so each <Code>Schema</Code> operation produces the right statements for your database. You can
              also run the migrator directly, for example from a deploy script inside the project&apos;s
              virtual environment:
            </P>
            <div className="mt-4">
              <CodeBlock
                code={`python -m app.database.migrator migrate
python -m app.database.migrator rollback
python -m app.database.migrator status`}
                language="bash"
                prompt
              />
            </div>
            <H3>When a migration fails</H3>
            <P>
              <Code>migrate</Code> stops at the first migration that fails and prints the error with the
              migration&apos;s name. Migrations before it stay applied; the failed one and those after it stay
              pending, so you can fix it and run <Code>migrate</Code> again.
            </P>
            <Callout tone="warning">
              Each migration runs in its own transaction, but MySQL commits every <Code>CREATE</Code>,{' '}
              <Code>ALTER</Code> and <Code>DROP</Code> immediately. If a MySQL migration fails partway, the
              statements before the failure have already been applied, so check the table before running{' '}
              <Code>migrate</Code> again.
            </Callout>
            <Callout>
              Projects created with fastapi-foundry 0.6.0 or earlier don&apos;t have{' '}
              <Code>app/database/schema.py</Code> and <Code>app/database/migrator.py</Code>. Create a new
              project with <Code>fastapi-foundry init</Code>, copy both files across, add <Code>alembic</Code>{' '}
              to your dependencies, and give your existing migrations&apos; <Code>upgrade()</Code> and{' '}
              <Code>downgrade()</Code> a <Code>schema</Code> parameter.
            </Callout>
          </section>

          <section>
            <H2 id="roadmap">Roadmap</H2>
            <P>fastapi-foundry is in early development. Planned features include:</P>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {roadmap
                .filter((item) => !item.done)
                .map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-700 dark:border-white/15 dark:text-slate-300"
                  >
                    {item.title}
                  </li>
                ))}
            </ul>
          </section>

          <section>
            <H2 id="contributing">Contributing</H2>
            <P>
              Issues and pull requests are welcome on{' '}
              <a href={project.issuesUrl} target="_blank" rel="noreferrer" className={link}>
                GitHub
              </a>
              . To set up a development environment:
            </P>
            <div className="mt-4 space-y-3">
              <CodeBlock code={contributeCommands} language="bash" prompt />
              <P>Run the CLI from your local checkout:</P>
              <CodeBlock code="uv run fastapi-foundry init myproject" language="bash" prompt />
            </div>
            <Callout>
              Create test projects outside the repository folder so they don&apos;t get mixed into its Git
              history.
            </Callout>
          </section>

          <section>
            <H2 id="license">License</H2>
            <P>
              fastapi-foundry is released under the{' '}
              <a href={project.licenseUrl} target="_blank" rel="noreferrer" className={link}>
                MIT License
              </a>
              .
            </P>
          </section>
        </article>
      </div>
    </div>
  )
}

export default Docs
