import { Code2, Server, Database, Palette, Lightbulb, Users } from 'lucide-react'
import { useRevealAnimation } from '@/hooks/useRevealAnimation'

const skills = [
  { icon: Code2, label: 'Frontend', desc: 'HTML, CSS, JavaScript, React' },
  { icon: Server, label: 'Backend', desc: 'Java, Node.js, APIs REST' },
  { icon: Database, label: 'Bases de Datos', desc: 'SQL, MongoDB' },
  { icon: Palette, label: 'Diseño', desc: 'UI/UX, Responsive Design' },
]

const softSkills = [
  { icon: Users, label: 'Trabajo en equipo', desc: 'Colaboración efectiva' },
  { icon: Lightbulb, label: 'Actitud proactiva', desc: 'Siempre aprendiendo' },
  { icon: Code2, label: 'Liderazgo', desc: 'Capacidad de liderar equipos' },
]

export function About() {
  const sectionRef = useRevealAnimation()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 translate-y-6 transition-all duration-700 inline-block text-blue-400 font-medium mb-4">
            Sobre mí
          </span>
          <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conoce un poco más <span className="gradient-text">sobre mí</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:from-blue-500/15 group-hover:to-purple-500/15 transition-all duration-500" />
              <div className="relative p-8 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm hover:border-blue-500/20 transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  ¡Hola! Soy Félix 👋
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Soy desarrollador web y estudiante de <span className="text-blue-400">Ingeniería Informática</span> en la
                    <span className="text-purple-400"> UIB</span> (Universitat de les Illes Balears).
                  </p>
                  <p>
                    Me considero una persona con mucha <span className="text-foreground">motivación</span> y ganas de seguir mejorando cada día.
                    En el sector web me gusta tanto el <span className="text-blue-400">backend</span> como el <span className="text-purple-400">frontend</span> —
                    soy un verdadero apasionado del desarrollo <span className="text-foreground">full-stack</span>.
                  </p>
                  <p>
                    Siempre estoy buscando nuevos retos y oportunidades para aprender tecnologías emergentes
                    y mejorar mis habilidades como desarrollador.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Skills Grid */}
          <div className="space-y-6">
            <h3 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-3 text-xl font-bold text-foreground mb-6">
              Mis habilidades técnicas
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.label}
                  className={`reveal opacity-0 translate-y-6 transition-all duration-700 stagger-${index + 3} group p-5 rounded-xl bg-card/30 border border-border/30 hover:border-blue-500/30 hover:bg-card/50 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                      <skill.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{skill.label}</h4>
                      <p className="text-sm text-muted-foreground">{skill.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-7 text-xl font-bold text-foreground mb-6 mt-8">
              Habilidades personales
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.label}
                  className={`reveal opacity-0 translate-y-6 transition-all duration-700 stagger-${index + 5} group p-4 rounded-xl bg-card/30 border border-border/30 hover:border-purple-500/30 hover:bg-card/50 hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 text-center`}
                >
                  <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300 w-fit mx-auto mb-3">
                    <skill.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{skill.label}</h4>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
