import CodeBlock from '../../components/CodeBlock'
import FileExplorer from '../../components/FileExplorer'
import { Code } from '../../components/InlineCode'
import {
  controllerRouteSnippet,
  generatedControllerFiles,
  generatedFiles,
  generatedModelFiles,
} from '../../data/generatedProject'
import { commands, configVars, contributeCommands, localUrls, project, roadmap } from '../../data/project'
import { Callout, DocLink, ExternalLink, H3, List, MonoCell, P, Strong, Table } from './primitives'

export const Introduction = () => (
  <>
    <P>
      <Strong>fastapi-foundry</Strong> is a command-line tool that scaffolds new{' '}
      <ExternalLink href={project.fastapiUrl}>FastAPI</ExternalLink> projects in seconds. One command gives
      you a ready-to-run application with a clean <Code>app/</Code> layout, a modern{' '}
      <ExternalLink href={project.uvUrl}>uv</ExternalLink>
      -compatible <Code>pyproject.toml</Code>, environment-based configuration and a sensible{' '}
      <Code>.gitignore</Code>, so you can skip the boilerplate and start building your API.
    </P>
    <div className="mt-6">
      <CodeBlock code="uvx fastapi-foundry init myproject" language="bash" prompt />
    </div>
    <P>
      New here? Check the <DocLink to="requirements">requirements</DocLink>, then follow the{' '}
      <DocLink to="quick-start">quick start</DocLink> to create and run your first project.
    </P>
  </>
)

export const Requirements = () => (
  <>
    <List>
      <li>
        Python <Strong>{project.pythonVersion}</Strong> or newer
      </li>
      <li>
        <ExternalLink href={project.uvInstallUrl}>uv</ExternalLink> (recommended) or pip
      </li>
    </List>
    <H3 id="installing-uv">Installing uv</H3>
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
  </>
)

export const Installation = () => (
  <>
    <H3 id="run-without-installing">Option 1: Run without installing (recommended)</H3>
    <P>
      <Code>uvx</Code> downloads and runs the latest version in a temporary environment:
    </P>
    <div className="mt-4">
      <CodeBlock code="uvx fastapi-foundry init myproject" language="bash" prompt />
    </div>
    <H3 id="global-command">Option 2: Install as a global command</H3>
    <div className="mt-4 space-y-3">
      <CodeBlock code="uv tool install fastapi-foundry" language="bash" prompt />
      <P>Then use it from any directory, and upgrade it later:</P>
      <CodeBlock
        code={'fastapi-foundry init myproject\nuv tool upgrade fastapi-foundry'}
        language="bash"
        prompt
      />
    </div>
    <H3 id="pip">Option 3: Install with pip</H3>
    <div className="mt-4">
      <CodeBlock code="pip install fastapi-foundry" language="bash" prompt />
    </div>
  </>
)

const quickStartSteps = [
  {
    id: 'create-a-project',
    title: 'Create a project',
    code: 'uvx fastapi-foundry init myproject',
    output:
      'Created FastAPI project: myproject\n\nNext steps:\n  cd myproject\n  uv sync\n  uv run uvicorn app.routes:app --reload',
  },
  { id: 'install-dependencies', title: 'Install dependencies', code: 'cd myproject\nuv sync' },
  { id: 'run-the-application', title: 'Run the application', code: 'uv run uvicorn app.routes:app --reload' },
]

const StepNumber = ({ number }: { number: number }) => (
  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
    {number}
  </span>
)

const StepTitle = ({ id, children }: { id: string; children: string }) => (
  <h3 id={id} className="scroll-mt-14 pt-0.5 font-medium text-slate-900 lg:scroll-mt-0 dark:text-white">
    {children}
  </h3>
)

export const QuickStart = () => (
  <ol className="mt-2 space-y-8">
    {quickStartSteps.map((step, index) => (
      <li key={step.id} className="flex gap-4">
        <StepNumber number={index + 1} />
        <div className="min-w-0 flex-1 space-y-3">
          <StepTitle id={step.id}>{step.title}</StepTitle>
          <CodeBlock code={step.code} language="bash" prompt />
          {step.output && <CodeBlock code={step.output} title="Output" />}
        </div>
      </li>
    ))}
    <li className="flex gap-4">
      <StepNumber number={4} />
      <div className="min-w-0 flex-1">
        <StepTitle id="open-in-your-browser">Open it in your browser</StepTitle>
        <Table
          head={['URL', 'Description']}
          rows={localUrls.map((item) => [<Code>{item.url}</Code>, item.description])}
        />
      </div>
    </li>
  </ol>
)

export const ProjectStructure = () => (
  <>
    <P>
      Generated projects are applications, not libraries: there is no <Code>[build-system]</Code> and no{' '}
      <Code>__init__.py</Code>. <Code>app/</Code> is a namespace package that uvicorn imports from the project
      root. Browse the files below; they are the real output of <Code>fastapi-foundry init myproject</Code>.
    </P>
    <div className="mt-6">
      <FileExplorer />
    </div>
    <H3 id="controllers">Routes and controllers</H3>
    <P>
      Routes stay thin and hand the work to a controller. Add a controller class per resource in{' '}
      <Code>app/controller/</Code> with{' '}
      <DocLink to="controllers">
        <Code>fastapi-foundry controller</Code>
      </DocLink>
      , and give it a route in <Code>app/routes.py</Code>.
    </P>
    <H3 id="model-folder">The model folder</H3>
    <P>
      An <Code>app/model/</Code> folder for SQLAlchemy models appears the first time you run{' '}
      <DocLink to="models">
        <Code>fastapi-foundry model</Code>
      </DocLink>
      .
    </P>
  </>
)

// How `fastapi-foundry controller` turns a name into a class, module and suggested route.
const controllerNameExamples = [
  ['Product', 'ProductController', 'app/controller/product_controller.py', '/products'],
  ['CategoryController', 'CategoryController', 'app/controller/category_controller.py', '/categories'],
  ['OrderItem', 'OrderItemController', 'app/controller/order_item_controller.py', '/order-items'],
]

const routesWithControllerExample = `${generatedFiles['app/routes.py']}

${controllerRouteSnippet}`

export const Controllers = () => (
  <>
    <P>
      Run <Code>fastapi-foundry controller</Code> from the project root to add a controller class. Controllers
      hold the work for one resource, so the routes in <Code>app/routes.py</Code> stay thin.
    </P>
    <div className="mt-4">
      <CodeBlock code="uvx fastapi-foundry controller" language="bash" prompt />
    </div>
    <H3 id="creating-a-controller">Creating a controller</H3>
    <P>The command asks for the controller name, writes the class and prints the route that serves it:</P>
    <div className="mt-4">
      <CodeBlock
        title="Output"
        code={`Controller name (PascalCase, e.g. ProductController): Product
Created controller: app/controller/product_controller.py

To serve it, add a route to app/routes.py:

${controllerRouteSnippet.replace(/^(?=.)/gm, '    ')}`}
      />
    </div>
    <H3 id="controller-names">Controller names</H3>
    <Table
      head={['You type', 'Class', 'File', 'Route']}
      rows={controllerNameExamples.map(([typed, name, file, path]) => [
        <Code>{typed}</Code>,
        <Code>{name}</Code>,
        <span className="font-mono text-xs whitespace-nowrap">{file}</span>,
        <Code>{path}</Code>,
      ])}
    />
    <P>
      Controller names are PascalCase: letters and digits, starting with a capital letter. The{' '}
      <Code>Controller</Code> suffix is added if you leave it out, so <Code>Product</Code> and{' '}
      <Code>ProductController</Code> create the same class. Names such as <Code>product</Code>,{' '}
      <Code>product_controller</Code> or <Code>Product Controller</Code> are rejected and the question is
      asked again, and a bare <Code>Controller</Code> is reserved. The suggested route is the plural of the
      resource in kebab-case.
    </P>
    <H3 id="generated-controller">The generated controller</H3>
    <P>
      Each controller is written to its own snake_case module in <Code>app/controller/</Code>, with an{' '}
      <Code>index</Code> method to start from:
    </P>
    <div className="mt-4">
      <CodeBlock
        code={generatedControllerFiles['app/controller/product_controller.py']}
        language="python"
        title="app/controller/product_controller.py"
        lineNumbers
      />
    </div>
    <H3 id="adding-the-route">Adding the route</H3>
    <P>
      The command never edits <Code>app/routes.py</Code>, because that file is yours. Copy the printed route
      into it; with the default home route the file becomes:
    </P>
    <div className="mt-4">
      <CodeBlock code={routesWithControllerExample} language="python" title="app/routes.py" lineNumbers />
    </div>
    <P>
      Restart uvicorn (or let <Code>--reload</Code> pick up the change) and <Code>GET /products</Code> returns{' '}
      <Code>{'{"message": "ProductController index"}'}</Code>. From here, add methods to the controller for
      the rest of the resource and a route for each, and use a <DocLink to="models">model</DocLink> with the
      session from{' '}
      <DocLink to="database#get-db">
        <Code>get_db</Code>
      </DocLink>{' '}
      to read and write its table.
    </P>
    <Callout tone="warning">
      <Code>fastapi-foundry controller</Code> never overwrites your files. If the controller&apos;s file
      already exists, for example <Code>HomeController</Code>, it stops with an error. Like the other commands
      that work on a project, it only runs from the project root.
    </Callout>
  </>
)

export const Configuration = () => (
  <>
    <H3 id="environment-variables">Environment variables</H3>
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
    <H3 id="env-file">Loading the .env file</H3>
    <P>
      Add new settings to the module they belong to, or create a new module in <Code>app/config/</Code> for a
      new kind of configuration. To load the values from the generated <Code>.env</Code> file, start the
      server with <Code>--env-file</Code>:
    </P>
    <div className="mt-4">
      <CodeBlock code="uv run uvicorn app.routes:app --reload --env-file .env" language="bash" prompt />
    </div>
    <Callout>
      <Code>.env</Code> is git-ignored because it holds your own credentials. Every project also gets a
      committed <Code>.env.example</Code> with the same keys and defaults, so a developer who clones the
      project runs <Code>cp .env.example .env</Code> instead of guessing the key names. When you add a
      setting, add its key to <Code>.env.example</Code> as well.
    </Callout>
  </>
)

export const Database = () => (
  <>
    <H3 id="credentials">Credentials</H3>
    <P>
      <Code>app/config/database.py</Code> builds <Code>DATABASE_URL</Code> from the <Code>DB_*</Code>{' '}
      settings, and <Code>app/config/sqlalchemy_connection.py</Code> creates the SQLAlchemy engine from it and
      provides <Code>get_db</Code>, a dependency that opens one session per request and closes it afterwards.
      The default database name is the project name in snake_case (<Code>my-fastapi-app</Code> →{' '}
      <Code>my_fastapi_app</Code>). Set your own credentials in <Code>.env</Code>:
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
      <Code>@</Code>, <Code>:</Code> or <Code>/</Code> in the username or password need no escaping. To supply
      a complete URL instead (for example in Docker or CI), set <Code>DATABASE_URL</Code>; it takes precedence
      over the <Code>DB_*</Code> settings.
    </P>
    <H3 id="get-db">Using get_db</H3>
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
      The engine connects lazily, so the app starts even when the database is not reachable; the first request
      that uses <Code>get_db</Code> is what opens a connection.
    </Callout>
  </>
)

export const ProjectNames = () => (
  <>
    <P>The project name is used for the folder and the distribution name, so it must:</P>
    <List>
      <li>start with a letter</li>
      <li>
        contain only letters, digits, hyphens (<Code>-</Code>) and underscores (<Code>_</Code>)
      </li>
      <li>
        not be a Python keyword or clash with a standard library or FastAPI module (for example{' '}
        <Code>json</Code> or <Code>fastapi</Code>)
      </li>
    </List>
    <div className="mt-6">
      <CodeBlock code="uvx fastapi-foundry init my-fastapi-app" language="bash" prompt />
    </div>
    <P>
      This creates the <Code>my-fastapi-app/</Code> folder. The name does not appear inside the project, so
      the run command is the same as for every other project:{' '}
      <Code>uv run uvicorn app.routes:app --reload</Code>.
    </P>
    <Callout tone="warning">
      If the target folder already exists, fastapi-foundry stops with an error instead of overwriting your
      files.
    </Callout>
  </>
)

export const Commands = () => (
  <Table
    head={['Command', 'Description']}
    rows={commands.map((item) => [<MonoCell>{item.command}</MonoCell>, item.description])}
  />
)

export const Migrations = () => (
  <>
    <H3 id="creating-a-migration">Creating a migration</H3>
    <P>
      Run <Code>fastapi-foundry migration</Code> from the project root to add a migration file. It asks
      whether the migration targets an existing table or a new one. For a new table it asks for the table
      name; for an existing table it lists the tables earlier migrations already cover so you can pick one.
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
    <H3 id="migration-files">Migration files</H3>
    <P>
      Migration files are written to <Code>app/database/</Code>, alongside the <Code>users</Code> migration
      that every new project ships with. A migration for a new table starts with an <Code>id</Code> primary
      key and <Code>created_at</Code> / <Code>updated_at</Code> timestamps, and its <Code>downgrade()</Code>{' '}
      drops the table again:
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
      A migration for an existing table has empty <Code>upgrade()</Code> and <Code>downgrade()</Code> bodies
      with commented examples, ready for the change you want to make.
    </P>
    <H3 id="existing-tables">How existing tables are found</H3>
    <P>
      Each file records its table in a <Code>TABLE</Code> constant, which is how the command lists existing
      tables, so no database connection is needed. If you edit a <Code>TABLE</Code> value by hand, keep it a
      valid table name; files with invalid names are left out of the list.
    </P>
    <Callout tone="warning">
      Run the migration commands from the project root, the folder with <Code>pyproject.toml</Code> and{' '}
      <Code>app/routes.py</Code>. From anywhere else, including a subfolder such as <Code>app/</Code>, they
      stop with an error instead of creating files in the wrong place.
    </Callout>
  </>
)

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

export const WritingMigrations = () => (
  <>
    <H3 id="schema-operations">Schema operations</H3>
    <P>
      <Code>upgrade()</Code> and <Code>downgrade()</Code> receive a <Code>Schema</Code> from{' '}
      <Code>app/database/schema.py</Code>. Describe columns with SQLAlchemy&apos;s <Code>Column</Code>, the
      same way you would in a model, and make changes through these operations:
    </P>
    <Table
      head={['Operation', 'What it does']}
      rows={schemaOperations.map(([operation, description]) => [
        <MonoCell>{operation}</MonoCell>,
        description,
      ])}
    />
    <H3 id="changing-a-table">Changing an existing table</H3>
    <P>
      <Code>timestamps()</Code> returns new <Code>created_at</Code> and <Code>updated_at</Code> columns that
      default to the current time; spread it into <Code>create_table</Code> with <Code>*timestamps()</Code>. A
      migration that changes an existing table undoes its <Code>upgrade()</Code> in reverse order:
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
      Don&apos;t import your models into a migration. A migration is a fixed record of one change, but a model
      always describes the latest structure: a migration that builds <Code>users</Code> from today&apos;s{' '}
      <Code>UserModel</Code> would create next month&apos;s columns too, and the later migration that adds
      them would then fail on a fresh database.
    </Callout>
    <Callout tone="warning">
      MySQL needs a column&apos;s current type for most <Code>alter_column</Code> changes, so pass{' '}
      <Code>existing_type</Code> as well, for example{' '}
      <Code>schema.alter_column(TABLE, &quot;name&quot;, existing_type=String(100), nullable=False)</Code>.
    </Callout>
  </>
)

export const RunningMigrations = () => (
  <>
    <H3 id="applying-migrations">Applying migrations</H3>
    <P>
      <Code>fastapi-foundry migrate</Code> applies every migration that hasn&apos;t run yet, oldest first, to
      the database configured in <Code>.env</Code>:
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
    <H3 id="rollback-and-status">Rollback and status</H3>
    <P>
      Applied migrations are recorded in a <Code>foundry_migrations</Code> table, which <Code>migrate</Code>{' '}
      creates the first time it runs. Each <Code>migrate</Code> run is one <em>batch</em>.{' '}
      <Code>fastapi-foundry migrate:rollback</Code> runs the <Code>downgrade()</Code> of every migration in
      the last batch, newest first, and <Code>migrate:status</Code> lists every migration with its state:
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
    <H3 id="how-it-runs">How it runs</H3>
    <P>
      Migrations need your project&apos;s dependencies (SQLAlchemy, Alembic and the database driver) and its
      settings, so fastapi-foundry runs the project&apos;s own <Code>app/database/migrator.py</Code> inside
      the project&apos;s environment with <Code>uv run</Code>, loading <Code>.env</Code> when it exists. The
      SQL itself comes from <ExternalLink href="https://alembic.sqlalchemy.org/">Alembic</ExternalLink>, so
      each <Code>Schema</Code> operation produces the right statements for your database. You can also run the
      migrator directly, for example from a deploy script inside the project&apos;s virtual environment:
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
    <H3 id="when-a-migration-fails">When a migration fails</H3>
    <P>
      <Code>migrate</Code> stops at the first migration that fails and prints the error with the
      migration&apos;s name. Migrations before it stay applied; the failed one and those after it stay
      pending, so you can fix it and run <Code>migrate</Code> again.
    </P>
    <Callout tone="warning">
      Each migration runs in its own transaction, but MySQL commits every <Code>CREATE</Code>,{' '}
      <Code>ALTER</Code> and <Code>DROP</Code> immediately. If a MySQL migration fails partway, the statements
      before the failure have already been applied, so check the table before running <Code>migrate</Code>{' '}
      again.
    </Callout>
    <Callout>
      Projects created with fastapi-foundry 0.6.0 or earlier don&apos;t have{' '}
      <Code>app/database/schema.py</Code> and <Code>app/database/migrator.py</Code>. Create a new project with{' '}
      <Code>fastapi-foundry init</Code>, copy both files across, add <Code>alembic</Code> to your
      dependencies, and give your existing migrations&apos; <Code>upgrade()</Code> and{' '}
      <Code>downgrade()</Code> a <Code>schema</Code> parameter.
    </Callout>
  </>
)

// How `fastapi-foundry model` turns a model name into a table name, and back.
const modelNameExamples = [
  ['ProductModel', 'app/model/product_model.py', 'products'],
  ['CategoryModel', 'app/model/category_model.py', 'categories'],
  ['OrderItemModel', 'app/model/order_item_model.py', 'order_items'],
  ['AddressModel', 'app/model/address_model.py', 'addresses'],
]

const modelInRouteExample = `from typing import Annotated

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config.sqlalchemy_connection import get_db
from app.model.user_model import UserModel


@app.get("/users")
def list_users(db: Annotated[Session, Depends(get_db)]) -> list[dict]:
    users = db.scalars(select(UserModel)).all()
    return [{"id": user.id, "created_at": user.created_at} for user in users]
`

export const Models = () => (
  <>
    <P>
      Run <Code>fastapi-foundry model</Code> from the project root to add a{' '}
      <ExternalLink href="https://docs.sqlalchemy.org/en/20/orm/">SQLAlchemy</ExternalLink> model class. It
      first asks whether the model is for an existing database table.
    </P>
    <div className="mt-4">
      <CodeBlock code="uvx fastapi-foundry model" language="bash" prompt />
    </div>
    <H3 id="existing-table">For an existing table</H3>
    <P>
      Answer <Strong>Yes</Strong> and the command lists the tables your migrations already create, read from
      their <Code>TABLE</Code> constants, so no database connection is needed. Pick one, then press Enter to
      accept the suggested model name or type your own:
    </P>
    <div className="mt-4">
      <CodeBlock
        title="Output"
        code={`Is this model for an existing database table?
  1) Yes
  2) No
Select [1-2]: 1

Select the table this model represents
  1) users
Select [1-1]: 1
Model name (PascalCase, e.g. UserModel) [UserModel]:
Created model: app/model/user_model.py (table 'users')`}
      />
    </div>
    <H3 id="new-model">For a new model</H3>
    <P>
      Answer <Strong>No</Strong> and type a model name. The table name comes from the model name: a trailing{' '}
      <Code>Model</Code> is dropped and the rest is converted to snake_case and made plural. If the table
      doesn&apos;t exist yet, create it with{' '}
      <DocLink to="migrations">
        <Code>fastapi-foundry migration</Code>
      </DocLink>
      .
    </P>
    <div className="mt-4">
      <CodeBlock
        title="Output"
        code={`Is this model for an existing database table?
  1) Yes
  2) No
Select [1-2]: 2
Model name (PascalCase, e.g. ProductModel): ProductModel
Created model: app/model/product_model.py (table 'products')`}
      />
    </div>
    <H3 id="model-names">Model names</H3>
    <Table
      head={['Model name', 'File', 'Table']}
      rows={modelNameExamples.map(([name, file, table]) => [
        <Code>{name}</Code>,
        <span className="font-mono text-xs whitespace-nowrap">{file}</span>,
        <Code>{table}</Code>,
      ])}
    />
    <P>
      Model names are PascalCase: letters and digits, starting with a capital letter. Names such as{' '}
      <Code>product</Code>, <Code>product_model</Code> or <Code>Product Model</Code> are rejected and the
      question is asked again. <Code>Base</Code>, a bare <Code>Model</Code> and Python keywords are reserved.
    </P>
    <H3 id="generated-model">The generated model</H3>
    <P>
      Each model is written to its own snake_case module in <Code>app/model/</Code> and maps the columns every
      create-table migration starts with: <Code>id</Code>, <Code>created_at</Code> and <Code>updated_at</Code>
      . It uses SQLAlchemy 2.0&apos;s typed <Code>Mapped</Code> / <Code>mapped_column</Code> declarations:
    </P>
    <div className="mt-4 space-y-3">
      <CodeBlock
        code={generatedModelFiles['app/model/user_model.py']}
        language="python"
        title="app/model/user_model.py"
        lineNumbers
      />
      <CodeBlock
        code={generatedModelFiles['app/model/base.py']}
        language="python"
        title="app/model/base.py"
        lineNumbers
      />
    </div>
    <P>
      Every model inherits from <Code>Base</Code> in <Code>app/model/base.py</Code>, which the command creates
      the first time it runs, so it also works in projects created before models existed.
    </P>
    <Callout>
      Migrations own the table&apos;s structure. When a migration adds a column, add the matching attribute to
      the model, for example <Code>name: Mapped[str] = mapped_column(String(255))</Code>, so the model keeps
      describing the table as it is.
    </Callout>
    <H3 id="using-a-model">Using a model</H3>
    <P>
      Query a model with the session from{' '}
      <DocLink to="database#get-db">
        <Code>get_db</Code>
      </DocLink>
      :
    </P>
    <div className="mt-4">
      <CodeBlock code={modelInRouteExample} language="python" title="Using a model in a route" />
    </div>
    <Callout tone="warning">
      <Code>fastapi-foundry model</Code> never overwrites your files. If the model&apos;s file already exists
      it stops with an error, and a <Code>base.py</Code> you have customised is left as it is. Like the
      migration commands, it only runs from the project root.
    </Callout>
  </>
)

export const Roadmap = () => (
  <>
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
  </>
)

export const Contributing = () => (
  <>
    <P>
      Issues and pull requests are welcome on <ExternalLink href={project.issuesUrl}>GitHub</ExternalLink>. To
      set up a development environment:
    </P>
    <div className="mt-4 space-y-3">
      <CodeBlock code={contributeCommands} language="bash" prompt />
      <P>Run the CLI from your local checkout:</P>
      <CodeBlock code="uv run fastapi-foundry init myproject" language="bash" prompt />
    </div>
    <Callout>
      Create test projects outside the repository folder so they don&apos;t get mixed into its Git history.
    </Callout>
  </>
)

export const License = () => (
  <P>
    fastapi-foundry is released under the <ExternalLink href={project.licenseUrl}>MIT License</ExternalLink>.
  </P>
)
