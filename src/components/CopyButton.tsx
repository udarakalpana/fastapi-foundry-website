import { Check, Copy } from 'lucide-react'
import { useCopy } from '../lib/hooks'

type CopyButtonProps = { text: string; className?: string; label?: string }

const CopyButton = ({ text, className = '', label = 'Copy to clipboard' }: CopyButtonProps) => {
  const [copied, copy] = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied!' : label}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/10 hover:text-white ${className}`}
    >
      {copied ? <Check className="size-4 text-teal-400" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

export default CopyButton
