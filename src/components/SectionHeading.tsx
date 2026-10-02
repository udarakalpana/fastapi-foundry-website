import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  id?: string
}

const SectionHeading = ({ eyebrow, title, description, align = 'center', id }: SectionHeadingProps) => (
  <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
    <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
      {eyebrow}
    </p>
    <h2
      id={id}
      className="mt-3 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl dark:text-white"
    >
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-400">
        {description}
      </p>
    )}
  </div>
)

export default SectionHeading
