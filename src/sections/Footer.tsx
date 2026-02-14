import { ArrowUp, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'CV', href: '#cv' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-lg group-hover:bg-blue-500/50 transition-all duration-300" />
              <span className="relative text-2xl font-bold gradient-text">FM</span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground hover:translate-y-[-2px] transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </nav>

          {/* Back to top */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/30" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Félix Montero. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> en Mallorca
          </p>
        </div>
      </div>
    </footer>
  )
}
