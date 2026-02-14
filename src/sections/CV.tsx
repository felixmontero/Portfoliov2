import { useState } from 'react'
import { GraduationCap, Languages, User, Calendar, MapPin, Award, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRevealAnimation } from '@/hooks/useRevealAnimation'

const education = [
  {
    period: '2023 - Actualidad',
    title: 'Ingeniería Informática',
    institution: 'UIB - Universitat de les Illes Balears',
    description: 'Estudiando el grado completo de Ingeniería Informática.',
    icon: BookOpen,
  },
  {
    period: '2021 - 2023',
    title: 'Curso de DAW',
    institution: 'ES LICEU',
    description: 'Desarrollo de Aplicaciones Web - FP Superior.',
    icon: GraduationCap,
  },
  {
    period: '2019 - 2021',
    title: 'Segundo de Bachillerato',
    institution: 'Instituto de Educación Secundaria',
    description: 'Modalidad de Ciencias y Tecnología.',
    icon: Award,
  },
]

const languages = [
  { name: 'Castellano', level: 'Nativo', progress: 100 },
  { name: 'Catalán', level: 'Nativo', progress: 100 },
  { name: 'Inglés', level: 'Nivel medio (mejorando)', progress: 60 },
]

const personalProfile = [
  { icon: User, label: 'Trabajo en equipo', desc: 'Colaboración efectiva en proyectos grupales' },
  { icon: Award, label: 'Actitud proactiva', desc: 'Siempre buscando mejorar y aprender' },
  { icon: MapPin, label: 'Positividad', desc: 'Enfoque positivo ante los retos' },
  { icon: Calendar, label: 'Liderazgo', desc: 'Capacidad de liderar equipos' },
]

export function CV() {
  const sectionRef = useRevealAnimation()
  const [progressAnimated, setProgressAnimated] = useState(false)

  // Separate observer for progress bars
  const progressRef = (el: HTMLDivElement | null) => {
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgressAnimated(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
  }

  return (
    <section
      id="cv"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 translate-y-6 transition-all duration-700 inline-block text-purple-400 font-medium mb-4">
            Curriculum Vitae
          </span>
          <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mi <span className="gradient-text">formación</span> y experiencia
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education Timeline */}
          <div className="lg:col-span-2 reveal opacity-0 translate-y-6 transition-all duration-700 stagger-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-lg" />
              <div className="relative p-6 lg:p-8 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                  Educación
                </h3>
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-border/50 last:pb-0 group hover:border-blue-500/50 transition-colors duration-300"
                    >
                      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-blue-500 ring-4 ring-background group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="inline-flex items-center gap-1 text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      <p className="text-purple-400 text-sm mb-1">{item.institution}</p>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Languages */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl blur-lg" />
                <div className="relative p-6 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm" ref={progressRef}>
                  <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Languages className="w-5 h-5 text-purple-400" />
                    </div>
                    Idiomas
                  </h3>
                  <div className="space-y-4">
                    {languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-foreground font-medium">{lang.name}</span>
                          <span className="text-sm text-muted-foreground">{lang.level}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{
                              width: progressAnimated ? `${lang.progress}%` : '0%',
                              transitionDelay: progressAnimated ? '300ms' : '0ms',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Profile */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-lg" />
                <div className="relative p-6 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    Perfil personal
                  </h3>
                  <div className="space-y-3">
                    {personalProfile.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 hover:translate-x-1 transition-all duration-300 group"
                      >
                        <item.icon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-5">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-[1.02] hover:shadow-glow transition-all duration-300"
              >
                <Award className="mr-2 w-4 h-4" />
                Descargar CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
