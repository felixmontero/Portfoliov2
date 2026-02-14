import { useEffect, useState } from 'react'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { CV } from './sections/CV'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { ParticleBackground } from './components/ParticleBackground'
import { Toaster } from './components/ui/Toaster'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <CV />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default App
