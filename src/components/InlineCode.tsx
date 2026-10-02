import type { ReactNode } from 'react'

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
    {children}
  </code>
)

/** Renders text where `backtick` spans become inline code. */
export const RichText = ({ text }: { text: string }) => (
  <>
    {text
      .split(/(`[^`]+`)/g)
      .map((part, index) =>
        part.startsWith('`') && part.endsWith('`') ? <Code key={index}>{part.slice(1, -1)}</Code> : part,
      )}
  </>
)
