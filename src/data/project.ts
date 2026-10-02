// Content for the site, taken from the fastapi-foundry README and source
// (https://github.com/udarakalpana/fastapi-foundry). Keep it in sync with releases.

export const project = {
  name: 'fastapi-foundry',
  version: '0.6.0',
  tagline: 'A CLI for scaffolding FastAPI projects.',
  pythonVersion: '3.12',
  license: 'MIT',
  author: 'kalpana',
  repoUrl: 'https://github.com/udarakalpana/fastapi-foundry',
  issuesUrl: 'https://github.com/udarakalpana/fastapi-foundry/issues',
  licenseUrl: 'https://github.com/udarakalpana/fastapi-foundry/blob/master/LICENSE',
  pypiUrl: 'https://pypi.org/project/fastapi-foundry/',
  pypiJsonUrl: 'https://pypi.org/pypi/fastapi-foundry/json',
  githubApiUrl: 'https://api.github.com/repos/udarakalpana/fastapi-foundry',
  fastapiUrl: 'https://fastapi.tiangolo.com/',
  uvUrl: 'https://docs.astral.sh/uv/',
  uvInstallUrl: 'https://docs.astral.sh/uv/getting-started/installation/',
} as const

export type InstallMethod = {
  id: string
  label: string
  command: string
  hint: string
}

export const installMethods: InstallMethod[] = [
  {
    id: 'uvx',
    label: 'uvx',
    command: 'uvx fastapi-foundry init myproject',
    hint: 'Runs the latest version without installing anything.',
  },
  {
    id: 'uv-tool',
    label: 'uv tool',
    command: 'uv tool install fastapi-foundry',
    hint: 'Installs fastapi-foundry as a global command.',
  },
  {
    id: 'pip',
    label: 'pip',
    command: 'pip install fastapi-foundry',
    hint: 'Installs into your current Python environment.',
  },
]

export type Feature = {
  title: string
  description: string
  icon: 'zap' | 'rocket' | 'layers' | 'shield' | 'repeat' | 'database' | 'settings' | 'git'
}

export const features: Feature[] = [
  {
    title: 'One-command setup',
    description:
      '`fastapi-foundry init <name>` creates a complete project: app code, config, pyproject.toml, .env and .gitignore.',
    icon: 'zap',
  },
  {
    title: 'Runs immediately',
    description:
      'The generated app starts with `uv sync` and `uvicorn`. No edits, no placeholders to fill in first.',
    icon: 'rocket',
  },
  {
    title: 'Structured by default',
    description:
      'Thin routes in `app/routes.py` delegate to controller classes in `app/controller/`, so the code stays organised as it grows.',
    icon: 'layers',
  },
  {
    title: 'Database ready',
    description:
      'A SQLAlchemy engine and a `get_db` session dependency, connecting to MySQL through PyMySQL with credentials from `.env`.',
    icon: 'database',
  },
  {
    title: 'Environment-based config',
    description:
      'One module per kind of setting in `app/config/`, read from environment variables, with a committed `.env.example`.',
    icon: 'settings',
  },
  {
    title: 'Safe by default',
    description:
      'Never overwrites an existing directory and rejects unsafe names, Python keywords and names that shadow stdlib or FastAPI modules.',
    icon: 'shield',
  },
  {
    title: 'Same commands every time',
    description: 'Every generated project runs with `uvicorn app.routes:app`, whatever you named it.',
    icon: 'repeat',
  },
  {
    title: 'Migration files',
    description:
      '`fastapi-foundry migration` adds timestamped migration files to `app/database/`, and you choose the table from a prompt.',
    icon: 'git',
  },
]

export const stack = [
  { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
  { name: 'Uvicorn', url: 'https://www.uvicorn.org/' },
  { name: 'SQLAlchemy', url: 'https://www.sqlalchemy.org/' },
  { name: 'PyMySQL', url: 'https://github.com/PyMySQL/PyMySQL' },
  { name: 'uv', url: 'https://docs.astral.sh/uv/' },
  { name: 'Typer', url: 'https://typer.tiangolo.com/' },
]

export type Step = { title: string; description: string; command: string }

export const quickStartSteps: Step[] = [
  {
    title: 'Create a project',
    description: 'Scaffold a new FastAPI application in the current directory.',
    command: 'uvx fastapi-foundry init myproject',
  },
  {
    title: 'Install dependencies',
    description: 'uv resolves FastAPI, Uvicorn, SQLAlchemy and PyMySQL in seconds.',
    command: 'cd myproject && uv sync',
  },
  {
    title: 'Run the application',
    description: 'Start the dev server with auto-reload.',
    command: 'uv run uvicorn app.routes:app --reload',
  },
  {
    title: 'Open it in your browser',
    description: 'Your API, Swagger UI and ReDoc are live on port 8000.',
    command: 'http://127.0.0.1:8000/docs',
  },
]

export const localUrls = [
  {
    url: 'http://127.0.0.1:8000',
    description: 'API root, returns {"message": "Hello from fastapi-foundry"}',
  },
  { url: 'http://127.0.0.1:8000/docs', description: 'Interactive Swagger UI documentation' },
  { url: 'http://127.0.0.1:8000/redoc', description: 'ReDoc documentation' },
]

export type ConfigVar = {
  name: string
  module: string
  defaultValue: string
  description: string
}

export const configVars: ConfigVar[] = [
  {
    name: 'APP_NAME',
    module: 'app/config/app.py',
    defaultValue: 'project name',
    description: 'Title shown in the API docs',
  },
  {
    name: 'DEBUG',
    module: 'app/config/app.py',
    defaultValue: 'false',
    description: 'Enables FastAPI debug mode (true, 1 or yes) and SQL logging',
  },
  {
    name: 'DB_CONNECTION',
    module: 'app/config/database.py',
    defaultValue: 'mysql+pymysql',
    description: 'SQLAlchemy dialect and driver',
  },
  {
    name: 'DB_HOST',
    module: 'app/config/database.py',
    defaultValue: '127.0.0.1',
    description: 'Database server host',
  },
  {
    name: 'DB_PORT',
    module: 'app/config/database.py',
    defaultValue: '3306',
    description: 'Database server port',
  },
  {
    name: 'DB_DATABASE',
    module: 'app/config/database.py',
    defaultValue: 'project name in snake_case',
    description: 'Database name',
  },
  {
    name: 'DB_USERNAME',
    module: 'app/config/database.py',
    defaultValue: 'root',
    description: 'Database user',
  },
  {
    name: 'DB_PASSWORD',
    module: 'app/config/database.py',
    defaultValue: 'empty',
    description: 'Database password',
  },
  {
    name: 'DATABASE_URL',
    module: 'app/config/database.py',
    defaultValue: 'built from the DB_* settings',
    description: 'Optional complete SQLAlchemy URL; overrides the DB_* settings when set',
  },
]

export const commands = [
  { command: 'fastapi-foundry --help', description: 'Show available commands' },
  { command: 'fastapi-foundry init --help', description: 'Show help for the init command' },
  {
    command: 'fastapi-foundry init <name>',
    description: 'Create a new project in the current directory',
  },
  { command: 'fastapi-foundry migration', description: 'Create a migration file in app/database/' },
]

export type RoadmapItem = { title: string; description: string; done: boolean }

export const roadmap: RoadmapItem[] = [
  {
    title: 'Project scaffolding',
    description: 'One command creates a runnable FastAPI app with a clean app/ layout.',
    done: true,
  },
  {
    title: 'Controller architecture',
    description: 'Thin routes that hand work to controller classes.',
    done: true,
  },
  {
    title: 'Environment configuration',
    description: 'Per-concern config modules, .env and a committed .env.example.',
    done: true,
  },
  {
    title: 'Database connection',
    description: 'SQLAlchemy engine, per-request sessions and a get_db dependency.',
    done: true,
  },
  {
    title: 'Migration files',
    description: 'Interactive `migration` command with timestamped files.',
    done: true,
  },
  {
    title: 'Running migrations with Alembic',
    description: 'Apply and roll back migrations against your database.',
    done: false,
  },
  {
    title: 'Pydantic Settings',
    description: 'Typed, validated settings management.',
    done: false,
  },
  {
    title: 'Model & route generators',
    description: 'Generate models and routes from the command line.',
    done: false,
  },
  {
    title: 'Authentication scaffolding',
    description: 'Ready-made authentication building blocks.',
    done: false,
  },
  {
    title: 'Docker support',
    description: 'Container files for local development and deployment.',
    done: false,
  },
]

export const contributeCommands = `git clone https://github.com/udarakalpana/fastapi-foundry.git
cd fastapi-foundry
uv sync
uv run pytest`
