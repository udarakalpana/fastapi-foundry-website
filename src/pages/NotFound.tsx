import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const NotFound = () => (
  <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
    <p className="font-mono text-sm text-brand-600 dark:text-brand-400">404</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Page not found</h1>
    <p className="mt-4 text-slate-600 dark:text-slate-400">
      This route was never scaffolded. Let&apos;s get you back to somewhere that exists.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
    >
      <ArrowLeft className="size-4" />
      Back to home
    </Link>
  </section>
)

export default NotFound
