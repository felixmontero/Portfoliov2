import { useToast } from '@/hooks/use-toast'
import { X } from 'lucide-react'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(({ id, title, description }) => (
        <div
          key={id}
          className="relative p-4 pr-10 rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-lg animate-slide-in-right"
        >
          <button
            onClick={() => dismiss(id)}
            className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="grid gap-1">
            {title && <h4 className="text-sm font-semibold text-foreground">{title}</h4>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
