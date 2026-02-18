import { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight, Gamepad2, Shapes, Container } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useRevealAnimation } from '@/hooks/useRevealAnimation'

const projects = [
  {
    id: 1,
    title: 'Maze Game',
    description: 'Juego del laberinto donde un personaje está encerrado y debe encontrar la salida.',
    longDescription: 'Un juego interactivo de laberinto desarrollado con tecnologías web. El jugador controla un personaje que debe navegar por un laberinto generado proceduralmente para encontrar la salida. Incluye sistema de puntuación, niveles de dificultad y diseño responsive.',
    icon: Gamepad2,
    tags: ['HTML', 'CSS', 'JavaScript', 'Java'],
    repoUrl: 'https://github.com/felixmontero/SegonaPracticaObligatoria',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Figuras',
    description: 'Aplicación web para crear diferentes figuras geométricas mediante un formulario interactivo.',
    longDescription: 'Una aplicación web que permite a los usuarios crear y visualizar diferentes figuras geométricas (círculos, cuadrados, triángulos, etc.) a través de un formulario intuitivo. Las figuras se renderizan en tiempo real con opciones de personalización de color, tamaño y posición.',
    icon: Shapes,
    tags: ['HTML', 'CSS', 'JavaScript', 'Java'],
    repoUrl: 'https://github.com/felixmontero/PrimeraPracticaObligatoria',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Docker Guide',
    description: 'Guía completa de instalación y configuración de Docker para proyectos desde cero.',
    longDescription: 'Documentación detallada que explica paso a paso cómo instalar Docker en diferentes sistemas operativos y crear un proyecto completo desde cero utilizando contenedores. Incluye ejemplos prácticos, comandos útiles y mejores prácticas.',
    icon: Container,
    tags: ['Markdown', 'Docker', 'DevOps'],
    repoUrl: 'https://github.com/felixmontero/docker',
    color: 'from-blue-600 to-blue-400',
  },
]

export function Projects() {
  const sectionRef = useRevealAnimation()
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 translate-y-6 transition-all duration-700 inline-block text-blue-400 font-medium mb-4">
            Proyectos
          </span>
          <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mis <span className="gradient-text">trabajos</span> destacados
          </h2>
          <p className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-2 text-muted-foreground text-lg max-w-2xl mx-auto">
            Aquí puedes ver algunos de los proyectos en los que he trabajado.
            Cada uno representa un paso en mi aprendizaje como desarrollador.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`reveal opacity-0 translate-y-6 transition-all duration-700 stagger-${index + 3} tilt-card relative group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="tilt-card-inner relative h-full rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-all duration-300">
                {/* Project Header */}
                <div className="relative h-40 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <project.icon className="w-10 h-10 text-foreground group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs bg-secondary/50 text-muted-foreground border border-border/30 group-hover:border-blue-500/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gradient-border bg-transparent hover:bg-secondary/30"
                      onClick={() => setSelectedProject(project)}
                    >
                      Ver más
                      <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-blue-500/30 transition-all hover:scale-110"
                      aria-label={`Ver repositorio de ${project.title} en GitHub`}
                    >
                      <Github className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="reveal opacity-0 translate-y-6 transition-all duration-700 stagger-6 text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="gradient-border bg-transparent hover:bg-secondary/30 hover:scale-105 transition-all duration-300"
            asChild
          >
            <a
              href="https://github.com/felixmontero"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 w-4 h-4" />
              Ver más en GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg bg-card/95 backdrop-blur-xl border-border/30">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedProject?.color} flex items-center justify-center`}>
                {selectedProject && <selectedProject.icon className="w-7 h-7 text-white" />}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedProject?.title}
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-muted-foreground">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground mb-6">
              {selectedProject?.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject?.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-secondary/50 text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                asChild
              >
                <a
                  href={selectedProject?.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Ver en GitHub
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
