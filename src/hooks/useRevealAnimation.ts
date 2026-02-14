import { useEffect, useRef } from 'react'

interface UseRevealAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export function useRevealAnimation(options: UseRevealAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '-50px' } = options
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target) // Only animate once
          }
        })
      },
      { threshold, rootMargin }
    )

    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
