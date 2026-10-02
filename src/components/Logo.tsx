import mark from '../assets/logo/fastapi-foundry-mark.png'

type LogoProps = { className?: string; showWordmark?: boolean }

const Logo = ({ className = '', showWordmark = true }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <img src={mark} alt="" width={226} height={191} className="h-7 w-auto" />
    {showWordmark && (
      <span className="text-[1.05rem] font-bold tracking-tight">
        <span className="text-brand-600 dark:text-brand-400">fastapi</span>
        <span className="text-teal-600 dark:text-teal-400">-foundry</span>
      </span>
    )}
  </span>
)

export default Logo
