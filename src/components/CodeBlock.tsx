import { useMemo } from 'react'
import { highlight, type Language } from '../lib/highlight'
import CopyButton from './CopyButton'

type CodeBlockProps = {
  code: string
  language?: Language
  title?: string
  lineNumbers?: boolean
  /** Prefix each line with a `$` prompt (for shell commands). */
  prompt?: boolean
  className?: string
}

export const HighlightedCode = ({ code, language }: { code: string; language: Language }) => {
  const tokens = useMemo(() => highlight(code, language), [code, language])
  return (
    <>
      {tokens.map((token, index) =>
        token.type ? (
          <span key={index} className={`tok-${token.type}`}>
            {token.text}
          </span>
        ) : (
          token.text
        ),
      )}
    </>
  )
}

const CodeBlock = ({
  code,
  language = 'text',
  title,
  lineNumbers = false,
  prompt = false,
  className = '',
}: CodeBlockProps) => {
  const trimmed = code.replace(/\n$/, '')
  const lines = trimmed.split('\n')

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-800 bg-[#0b1020] text-[13px] leading-6 text-slate-200 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:shadow-black/30 ${className}`}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] py-1.5 pr-1.5 pl-4">
          <span className="truncate font-mono text-xs text-slate-400">{title}</span>
          <CopyButton text={trimmed} />
        </div>
      ) : null}
      <div className="flex">
        <div className="flex min-w-0 flex-1 overflow-x-auto">
          {lineNumbers && (
            <div
              aria-hidden="true"
              className="sticky left-0 shrink-0 bg-[#0b1020] py-4 pr-3 pl-4 text-right font-mono text-slate-600 select-none"
            >
              {lines.map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
          )}
          <pre className={`flex-1 py-4 font-mono ${lineNumbers ? 'pr-4 pl-2' : 'px-4'}`}>
            <code>
              {prompt ? (
                lines.map((line, index) => (
                  <div key={index}>
                    <span className="tok-prompt">$ </span>
                    <HighlightedCode code={line} language={language} />
                  </div>
                ))
              ) : (
                <HighlightedCode code={trimmed} language={language} />
              )}
            </code>
          </pre>
        </div>
        {!title && (
          <div className="shrink-0 p-2">
            <CopyButton text={trimmed} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
