import { Check, Copy } from 'lucide-react'
import { useId, useState, type KeyboardEvent } from 'react'
import { installMethods } from '../data/project'
import { useCopy } from '../lib/hooks'

const InstallTabs = () => {
  const [active, setActive] = useState(0)
  const [copied, copy] = useCopy()
  const id = useId()
  const method = installMethods[active]

  // Arrow keys move between tabs, following the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (active + delta + installMethods.length) % installMethods.length
    setActive(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }

  return (
    <div className="w-full max-w-xl">
      <div role="tablist" aria-label="Installation method" className="flex gap-1">
        {installMethods.map((item, index) => (
          <button
            key={item.id}
            id={`${id}-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={`rounded-t-lg px-3.5 py-1.5 font-mono text-xs font-medium transition ${
              index === active
                ? 'bg-slate-900 text-white dark:bg-white/10'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="rounded-xl rounded-tl-none bg-slate-900 p-1.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 dark:bg-white/10 dark:ring-white/10"
      >
        <button
          type="button"
          onClick={() => copy(method.command)}
          className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left font-mono text-[13px] text-slate-100 sm:text-sm transition hover:bg-white/5"
          aria-label={`Copy command: ${method.command}`}
        >
          <span className="text-teal-400 select-none">$</span>
          <span className="flex-1 truncate">{method.command}</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 font-sans text-xs text-slate-300 transition group-hover:bg-white/15 group-hover:text-white">
            {copied ? <Check className="size-3.5 text-teal-400" /> : <Copy className="size-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </span>
        </button>
      </div>
      <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {method.hint}
      </p>
    </div>
  )
}

export default InstallTabs
