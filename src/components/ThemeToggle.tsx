import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden rounded-full hover:bg-secondary/50 transition-all duration-300"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            <Sun
                className={`w-5 h-5 text-amber-500 absolute transition-all duration-500 ${theme === 'dark'
                        ? 'rotate-90 scale-0 opacity-0'
                        : 'rotate-0 scale-100 opacity-100'
                    }`}
            />
            <Moon
                className={`w-5 h-5 text-blue-400 absolute transition-all duration-500 ${theme === 'dark'
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0'
                    }`}
            />
        </Button>
    )
}
