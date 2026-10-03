import { ChevronRight, FileCode2, FileText, Folder, FolderOpen, Settings2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { generatedFiles } from '../data/generatedProject'
import { languageForFile } from '../lib/highlight'
import { HighlightedCode } from './CodeBlock'
import CopyButton from './CopyButton'

// What each generated file is for, from the fastapi-foundry README.
const notes: Record<string, string> = {
  'pyproject.toml': 'Dependencies: FastAPI, Uvicorn, SQLAlchemy, PyMySQL and Alembic',
  '.env': 'Your local environment variables (git-ignored)',
  '.env.example': 'The same keys, committed for other developers',
  '.gitignore': 'Python, uv and tooling ignores',
  'README.md': 'How to install and run the project',
  'app/routes.py': 'FastAPI application and routes',
  'app/config/app.py': 'APP_NAME and DEBUG',
  'app/config/database.py': 'DB_* settings and the DATABASE_URL built from them',
  'app/config/sqlalchemy_connection.py': 'SQLAlchemy engine, SessionLocal and get_db',
  'app/controller/home_controller.py': 'Handles the default route',
  'app/database/20260922143022_create_users_table.py': 'The users migration every project ships with',
  'app/database/schema.py': 'The Schema operations migrations change the database with',
  'app/database/migrator.py': 'Applies and rolls back migrations; run by fastapi-foundry migrate',
}

type TreeNode = { name: string; path: string; children?: TreeNode[] }

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode = { name: '', path: '', children: [] }
  for (const path of paths) {
    let node = root
    path.split('/').forEach((part, index, parts) => {
      const nodePath = parts.slice(0, index + 1).join('/')
      const isFile = index === parts.length - 1
      let child = node.children!.find((candidate) => candidate.name === part)
      if (!child) {
        child = { name: part, path: nodePath, children: isFile ? undefined : [] }
        node.children!.push(child)
      }
      node = child
    })
  }
  // Folders first, then files, matching how editors list a project.
  const sort = (nodes: TreeNode[]): TreeNode[] =>
    nodes
      .map((node) => (node.children ? { ...node, children: sort(node.children) } : node))
      .sort((a, b) => Number(!a.children) - Number(!b.children) || a.name.localeCompare(b.name))
  return sort(root.children!)
}

function iconFor(name: string) {
  if (name.endsWith('.py')) return <FileCode2 className="size-4 shrink-0 text-sky-400" />
  if (name.startsWith('.') || name.endsWith('.toml'))
    return <Settings2 className="size-4 shrink-0 text-amber-300/80" />
  return <FileText className="size-4 shrink-0 text-slate-400" />
}

type TreeProps = {
  nodes: TreeNode[]
  depth: number
  selected: string
  collapsed: Set<string>
  onSelect: (path: string) => void
  onToggle: (path: string) => void
}

const Tree = ({ nodes, depth, selected, collapsed, onSelect, onToggle }: TreeProps) => (
  <ul role={depth === 0 ? 'tree' : 'group'} aria-label={depth === 0 ? 'Generated files' : undefined}>
    {nodes.map((node) => {
      const padding = { paddingLeft: `${depth * 14 + 10}px` }
      if (node.children) {
        const open = !collapsed.has(node.path)
        return (
          <li key={node.path} role="treeitem" aria-expanded={open}>
            <button
              type="button"
              onClick={() => onToggle(node.path)}
              style={padding}
              className="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-slate-300 transition hover:bg-white/5"
            >
              <ChevronRight
                className={`size-3.5 shrink-0 text-slate-500 transition ${open ? 'rotate-90' : ''}`}
              />
              {open ? (
                <FolderOpen className="size-4 shrink-0 text-brand-400" />
              ) : (
                <Folder className="size-4 shrink-0 text-brand-400" />
              )}
              <span className="truncate">{node.name}</span>
            </button>
            {open && (
              <Tree
                nodes={node.children}
                depth={depth + 1}
                selected={selected}
                collapsed={collapsed}
                onSelect={onSelect}
                onToggle={onToggle}
              />
            )}
          </li>
        )
      }
      const isSelected = node.path === selected
      return (
        <li key={node.path} role="treeitem" aria-selected={isSelected}>
          <button
            type="button"
            onClick={() => onSelect(node.path)}
            style={{ paddingLeft: `${depth * 14 + 30}px` }}
            className={`flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left transition ${
              isSelected
                ? 'bg-brand-500/20 text-white ring-1 ring-brand-400/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            {iconFor(node.name)}
            <span className="truncate" title={node.name}>
              {node.name}
            </span>
          </button>
        </li>
      )
    })}
  </ul>
)

const FileExplorer = () => {
  const tree = useMemo(() => buildTree(Object.keys(generatedFiles)), [])
  const [selected, setSelected] = useState('app/routes.py')
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set())

  const toggle = (path: string) =>
    setCollapsed((current) => {
      const next = new Set(current)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })

  const content = generatedFiles[selected].replace(/\n$/, '')
  const lines = content.split('\n')

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1020] shadow-2xl shadow-slate-900/20 dark:border-white/10 dark:shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-slate-400">myproject</span>
      </div>
      <div className="grid md:grid-cols-[16rem_1fr]">
        <nav
          aria-label="Project files"
          className="max-h-60 overflow-y-auto border-b border-white/5 p-2 font-mono text-[13px] md:max-h-none md:border-r md:border-b-0"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300">
            <FolderOpen className="size-4 text-brand-400" />
            myproject/
          </div>
          <Tree
            nodes={tree}
            depth={0}
            selected={selected}
            collapsed={collapsed}
            onSelect={setSelected}
            onToggle={toggle}
          />
        </nav>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 py-2 pr-2 pl-4">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs text-slate-200">{selected}</p>
              <p className="truncate text-xs text-slate-500">{notes[selected]}</p>
            </div>
            <CopyButton text={content} label={`Copy ${selected}`} />
          </div>
          <div className="flex h-[26rem] overflow-auto text-[13px] leading-6">
            <div
              aria-hidden="true"
              className="sticky left-0 shrink-0 bg-[#0b1020] py-4 pr-3 pl-4 text-right font-mono text-slate-600 select-none"
            >
              {lines.map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
            <pre className="flex-1 py-4 pr-6 pl-2 font-mono text-slate-200">
              <code>
                <HighlightedCode code={content} language={languageForFile(selected)} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileExplorer
