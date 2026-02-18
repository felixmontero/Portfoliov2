import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Send, Github, Linkedin, Youtube, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { useRevealAnimation } from '@/hooks/useRevealAnimation'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const RATE_LIMIT_MS = 60_000 // 1 minuto entre envíos

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'felixmont428@gmail.com',
    href: 'mailto:felixmont428@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Mallorca, España',
    href: '#',
  },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/felixmontero', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/f%C3%A9lix-montero-595465259/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@FenixxQ', label: 'YouTube' },
  { icon: Instagram, href: 'https://www.instagram.com/felix.montero_/', label: 'Instagram' },
]

export function Contact() {
  const sectionRef = useRevealAnimation()
  const formRef = useRef<HTMLFormElement>(null)
  const lastSubmitTime = useRef<number>(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: si el campo oculto tiene contenido, es un bot
    const honeypotValue = formRef.current?.querySelector<HTMLInputElement>('input[name="website"]')?.value
    if (honeypotValue) {
      toast({
        title: '¡Mensaje enviado!',
        description: 'Gracias por contactarme. Te responderé pronto.',
      })
      setFormData({ name: '', email: '', message: '' })
      return
    }

    // Rate limiting: máximo 1 envío por minuto
    const now = Date.now()
    if (now - lastSubmitTime.current < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime.current)) / 1000)
      toast({
        title: 'Espera un momento',
        description: `Podrás enviar otro mensaje en ${secondsLeft} segundos.`,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      )

      lastSubmitTime.current = Date.now()

      toast({
        title: '¡Mensaje enviado!',
        description: 'Gracias por contactarme. Te responderé pronto.',
      })

      setFormData({ name: '', email: '', message: '' })
    } catch {
      toast({
        title: 'Error al enviar',
        description: 'Hubo un problema. Inténtalo de nuevo o escríbeme directamente a felixmont428@gmail.com.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 translate-y-6 transition-all duration-700 inline-block text-purple-400 font-medium mb-4">
            Contacto
          </span>
          <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hablemos <span className="gradient-text">juntos</span>
          </h2>
          <p className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-2 text-muted-foreground text-lg max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o quieres colaborar?
            No dudes en contactarme, estaré encantado de escucharte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-3">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Información de contacto
            </h3>
            <p className="text-muted-foreground mb-8">
              Estoy disponible para proyectos, prácticas o simplemente para charlar sobre tecnología.
              ¡No dudes en escribirme!
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/40 border border-border/30 hover:border-blue-500/30 hover:bg-card/60 hover:translate-x-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Sígueme en</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-card/40 border border-border/30 flex items-center justify-center hover:border-purple-500/30 hover:bg-purple-500/10 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:from-blue-500/15 group-hover:to-purple-500/15 transition-all duration-500" />
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative p-6 lg:p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 hover:border-border/50 transition-all duration-300"
              >
                {/* Honeypot anti-spam: campo invisible que los bots rellenan */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}>
                  <label htmlFor="website">No rellenar</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary/30 border-border/30 focus:border-blue-500/50 focus-glow transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary/30 border-border/30 focus:border-blue-500/50 focus-glow transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-secondary/30 border-border/30 focus:border-blue-500/50 focus-glow resize-none transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-[1.02] hover:shadow-glow transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
