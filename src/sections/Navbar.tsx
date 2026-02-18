import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#cv', label: 'CV' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map(link => link.href.slice(1))
    const scrollPos = window.scrollY + 200

    for (const section of sections.reverse()) {
      const el = document.getElementById(section)
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(`#${section}`)
        return
      }
    }
    setActiveSection('')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      updateActiveSection()
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateActiveSection])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } ${isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/5'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-lg group-hover:bg-blue-500/50 transition-all duration-300" />
              <span className="relative text-2xl font-bold gradient-text">FM</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={`transition-all duration-300 ${activeSection === link.href
                  ? 'text-foreground bg-secondary/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                onClick={() => scrollToSection(link.href)}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                )}
              </Button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transition-all duration-300 hover:shadow-glow"
              onClick={() => scrollToSection('#contact')}
            >
              Hablemos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={`justify-start ${activeSection === link.href
                    ? 'text-foreground bg-secondary/50'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                onClick={() => scrollToSection('#contact')}
              >
                Hablemos
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
