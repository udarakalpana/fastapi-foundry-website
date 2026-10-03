import { RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../lib/hooks'

export type TerminalLine =
  | { kind: 'command'; text: string }
  | { kind: 'output'; text: string; tone?: 'success' | 'muted' | 'info' | 'accent' }

type TerminalProps = {
  lines: TerminalLine[]
  title?: string
  className?: string
}

const TYPE_DELAY = 32
const OUTPUT_DELAY = 140
const COMMAND_PAUSE = 550

const toneClass = {
  success: 'text-teal-400',
  muted: 'text-slate-500',
  info: 'text-sky-300',
  accent: 'text-amber-200',
}

const Terminal = ({ lines, title = 'Terminal', className = '' }: TerminalProps) => {
  const reducedMotion = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>()
  // Progress through the script: lines before `line` are complete, and
  // `chars` characters of the current command have been typed.
  const [progress, setProgress] = useState({ line: 0, chars: 0, run: 0 })

  const animate = !reducedMotion
  const done = !animate || progress.line >= lines.length

  useEffect(() => {
    if (!animate || !inView || progress.line >= lines.length) return
    const current = lines[progress.line]
    let delay: number
    let next: typeof progress

    if (current.kind === 'command' && progress.chars < current.text.length) {
      delay = progress.chars === 0 ? COMMAND_PAUSE : TYPE_DELAY
      next = { ...progress, chars: progress.chars + 1 }
    } else {
      delay = current.kind === 'command' ? 260 : OUTPUT_DELAY
      next = { ...progress, line: progress.line + 1, chars: 0 }
    }

    const timer = window.setTimeout(() => setProgress(next), delay)
    return () => window.clearTimeout(timer)
  }, [animate, inView, progress, lines])

  const visible = done ? lines : lines.slice(0, progress.line + 1)

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/95 shadow-2xl shadow-brand-900/30 ring-1 ring-black/5 backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-slate-400">{title}</span>
        {animate && done && (
          <button
            type="button"
            onClick={() => setProgress({ line: 0, chars: 0, run: progress.run + 1 })}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-3.5" />
            Replay
          </button>
        )}
      </div>
      {/* Screen readers get the whole transcript at once instead of the typing animation. */}
      <pre className="sr-only">
        {lines.map((line) => (line.kind === 'command' ? `$ ${line.text}` : line.text)).join('\n')}
      </pre>
      <div
        aria-hidden="true"
        className="min-h-[19rem] overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-200"
      >
        {visible.map((line, index) => {
          const isCurrent = !done && index === progress.line
          if (line.kind === 'command') {
            const text = isCurrent ? line.text.slice(0, progress.chars) : line.text
            return (
              <div key={`${progress.run}-${index}`} className="whitespace-pre-wrap [overflow-wrap:anywhere]">
                <span className="text-teal-400">❯ </span>
                <span className="text-white">{text}</span>
                {isCurrent && (
                  <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-blink bg-slate-300" />
                )}
              </div>
            )
          }
          return (
            <div
              key={`${progress.run}-${index}`}
              className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${line.tone ? toneClass[line.tone] : 'text-slate-300'}`}
            >
              {line.text || ' '}
            </div>
          )
        })}
        {done && (
          <div>
            <span className="text-teal-400">❯ </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-slate-300" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
