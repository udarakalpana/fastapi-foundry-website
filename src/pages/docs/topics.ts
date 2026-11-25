import type { ComponentType } from 'react'
import * as pages from './content'

export type Subtopic = { id: string; label: string }

export type Topic = {
  /** The page's URL: `/docs/<slug>`. Slugs match the anchors of the old single-page docs. */
  slug: string
  label: string
  group: string
  /** The `id` and text of the page's `<H3>` headings, in order, shown under the topic in the sidebar. */
  subtopics: Subtopic[]
  Content: ComponentType
}

export const topics: Topic[] = [
  {
    slug: 'introduction',
    label: 'Introduction',
    group: 'Getting started',
    subtopics: [],
    Content: pages.Introduction,
  },
  {
    slug: 'requirements',
    label: 'Requirements',
    group: 'Getting started',
    subtopics: [{ id: 'installing-uv', label: 'Installing uv' }],
    Content: pages.Requirements,
  },
  {
    slug: 'installation',
    label: 'Installation',
    group: 'Getting started',
    subtopics: [
      { id: 'run-without-installing', label: 'Run without installing' },
      { id: 'global-command', label: 'Install as a global command' },
      { id: 'pip', label: 'Install with pip' },
    ],
    Content: pages.Installation,
  },
  {
    slug: 'quick-start',
    label: 'Quick start',
    group: 'Getting started',
    subtopics: [
      { id: 'create-a-project', label: 'Create a project' },
      { id: 'install-dependencies', label: 'Install dependencies' },
      { id: 'run-the-application', label: 'Run the application' },
      { id: 'open-in-your-browser', label: 'Open it in your browser' },
    ],
    Content: pages.QuickStart,
  },
  {
    slug: 'project-structure',
    label: 'Project structure',
    group: 'The basics',
    subtopics: [
      { id: 'controllers', label: 'Routes and controllers' },
      { id: 'model-folder', label: 'The model folder' },
    ],
    Content: pages.ProjectStructure,
  },
  {
    slug: 'controllers',
    label: 'Controllers',
    group: 'The basics',
    subtopics: [
      { id: 'creating-a-controller', label: 'Creating a controller' },
      { id: 'controller-names', label: 'Controller names' },
      { id: 'generated-controller', label: 'The generated controller' },
      { id: 'adding-the-route', label: 'Adding the route' },
    ],
    Content: pages.Controllers,
  },
  {
    slug: 'configuration',
    label: 'Configuration',
    group: 'The basics',
    subtopics: [
      { id: 'environment-variables', label: 'Environment variables' },
      { id: 'env-file', label: 'Loading the .env file' },
    ],
    Content: pages.Configuration,
  },
  {
    slug: 'project-names',
    label: 'Project names',
    group: 'The basics',
    subtopics: [],
    Content: pages.ProjectNames,
  },
  {
    slug: 'commands',
    label: 'Command reference',
    group: 'The basics',
    subtopics: [],
    Content: pages.Commands,
  },
  {
    slug: 'database',
    label: 'Database connection',
    group: 'Database',
    subtopics: [
      { id: 'credentials', label: 'Credentials' },
      { id: 'get-db', label: 'Using get_db' },
    ],
    Content: pages.Database,
  },
  {
    slug: 'migrations',
    label: 'Migrations',
    group: 'Database',
    subtopics: [
      { id: 'creating-a-migration', label: 'Creating a migration' },
      { id: 'migration-files', label: 'Migration files' },
      { id: 'existing-tables', label: 'How existing tables are found' },
    ],
    Content: pages.Migrations,
  },
  {
    slug: 'writing-migrations',
    label: 'Writing migrations',
    group: 'Database',
    subtopics: [
      { id: 'schema-operations', label: 'Schema operations' },
      { id: 'changing-a-table', label: 'Changing an existing table' },
    ],
    Content: pages.WritingMigrations,
  },
  {
    slug: 'running-migrations',
    label: 'Running migrations',
    group: 'Database',
    subtopics: [
      { id: 'applying-migrations', label: 'Applying migrations' },
      { id: 'rollback-and-status', label: 'Rollback and status' },
      { id: 'how-it-runs', label: 'How it runs' },
      { id: 'when-a-migration-fails', label: 'When a migration fails' },
    ],
    Content: pages.RunningMigrations,
  },
  {
    slug: 'models',
    label: 'Models',
    group: 'Database',
    subtopics: [
      { id: 'existing-table', label: 'For an existing table' },
      { id: 'new-model', label: 'For a new model' },
      { id: 'model-names', label: 'Model names' },
      { id: 'generated-model', label: 'The generated model' },
      { id: 'using-a-model', label: 'Using a model' },
    ],
    Content: pages.Models,
  },
  { slug: 'roadmap', label: 'Roadmap', group: 'Project', subtopics: [], Content: pages.Roadmap },
  {
    slug: 'contributing',
    label: 'Contributing',
    group: 'Project',
    subtopics: [],
    Content: pages.Contributing,
  },
  { slug: 'license', label: 'License', group: 'Project', subtopics: [], Content: pages.License },
]

/** Sidebar groups, in the order their first topic appears. */
export const topicGroups = [...new Set(topics.map((topic) => topic.group))]
