# fastapi-foundry website

The official website for [fastapi-foundry](https://github.com/udarakalpana/fastapi-foundry), an open-source CLI
that scaffolds ready-to-run FastAPI projects.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and React Router.

## Pages

| Route   | Contents                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`     | Landing page: hero with an animated terminal, install tabs, features, quick start, an interactive explorer of the generated project, architecture, database, migrations, roadmap and contributing |
| `/docs` | Full documentation with a sticky table of contents and scroll-spy                                                                                                                                 |
| `*`     | 404 page                                                                                                                                                                                          |

The site supports light and dark themes (following the system setting until the visitor picks one), works
down to phone widths, and respects `prefers-reduced-motion`. The navbar shows the latest version from PyPI
and the GitHub star count, falling back to the bundled version when those APIs are unreachable.

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run lint      # ESLint
npm run format    # Prettier
npm run preview   # serve the production build
```

## Project layout

```text
src/
├── App.tsx                    # Router setup
├── components/                # Navbar, Footer, CodeBlock, Terminal, FileExplorer, ...
├── pages/                     # Home, Docs, NotFound
├── data/
│   ├── project.ts             # Site content: links, features, config vars, roadmap
│   └── generatedProject.ts    # Real output of `fastapi-foundry init myproject`
└── lib/
    ├── highlight.ts           # Small syntax highlighter for Python, bash, TOML and .env
    └── hooks.ts               # Theme, clipboard, in-view and repo stats hooks
```

### Updating content for a new fastapi-foundry release

- Edit `src/data/project.ts` for the version, features, configuration table and roadmap.
- Regenerate `src/data/generatedProject.ts` when the project templates change, so the file explorer keeps
  showing exactly what the CLI writes.

## Deployment

`npm run build` produces a static site in `dist/`. The site uses client-side routing, so configure your host to
serve `index.html` for unknown paths (for example, a rewrite rule on Netlify or Vercel, or a copy of
`index.html` as `404.html` on GitHub Pages).
