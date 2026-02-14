import { useEffect, useState } from 'react'
import { ArrowDown, Github, Linkedin, Youtube, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRevealAnimation } from '@/hooks/useRevealAnimation'

const roles = ['Web', 'Frontend', 'Backend', 'Full-Stack']

export function Hero() {
  const heroRef = useRevealAnimation({ threshold: 0.1, rootMargin: '0px' })
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 60)
      } else {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/felixmontero', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/f%C3%A9lix-montero-595465259/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@FenixxQ', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/felix.montero_/', label: 'Instagram' },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/30 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">Disponible para proyectos</span>
          </div>

          {/* Title */}
          <h1 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Félix</span>
            <br />
            <span className="gradient-text">Montero</span>
          </h1>

          {/* Subtitle with typewriter */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-3 mb-8">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
              Desarrollador{' '}
              <span className="text-blue-400 font-medium inline-block min-w-[120px] sm:min-w-[160px] text-left">
                {displayText}
                <span className="inline-block w-0.5 h-[1em] bg-blue-400 ml-0.5 animate-pulse align-middle" />
              </span>
              {' '}&amp;
              <span className="text-purple-400 font-medium"> Estudiante</span> de Ingeniería Informática
            </p>
          </div>

          {/* Description */}
          <p className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-4 text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Apasionado por el desarrollo full-stack. Me encanta tanto el backend como el frontend,
            siempre con ganas de aprender y mejorar.
          </p>

          {/* CTA Buttons */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-5 flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-glow hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('#projects')}
            >
              Ver proyectos
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gradient-border bg-transparent hover:bg-secondary/30 transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('#contact')}
            >
              Contactar
            </Button>
          </div>

          {/* Social Links */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-6 flex gap-4 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-border/30 hover:border-blue-500/30 transition-all duration-300 group hover:scale-110 hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-scroll-pulse" />
        </div>
      </div>
    </section>
  )
}
