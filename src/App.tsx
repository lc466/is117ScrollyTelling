import React, { useEffect, useRef, useState } from 'react'
import './App.css'

type Section = { id: string; title: string; body: string }

const SECTIONS: Section[] = [
  { id: 'hero', title: 'Building Human-Centered AI Products', body: 'Design AI features that respect people’s needs, contexts, and agency. Scroll to explore principles, a compact case study, and an interactive demo.' },
  { id: 'problem', title: 'Why generic AI tools are not enough', body: 'Generic models can surprise users and fail in context-sensitive ways. Human-centered design focuses on real needs, appropriate control, and measurable outcomes.' },
  { id: 'process', title: 'Human-centered design process', body: 'Define the problem, prototype early, test with people, iterate, and measure impact. Use transparency and control to build trust.' },
  { id: 'project', title: 'Prototype: Smart Suggest', body: 'A small prototype that surfaces suggestions while giving users clear control and feedback. Below the visual area demonstrates tradeoffs between suggestion strength and user control.' },
  { id: 'cta', title: 'Takeaways & Next steps', body: 'Apply these principles: prioritize clarity, provide controls, test with real users, and measure outcomes. Reach out to discuss projects or ask for the repo.' }
]

export default function App() {
  const [active, setActive] = useState(0)
  const [images, setImages] = useState<string[]>(['/images/placeholder.svg'])
  const sectionRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    // Try to load `/images/gallery.json` (optional). If not present, fallback to placeholder.
    fetch('/images/gallery.json')
      .then((r) => {
        if (!r.ok) throw new Error('no gallery')
        return r.json()
      })
      .then((data: string[]) => {
        if (Array.isArray(data) && data.length > 0) setImages(data.map((p) => `/images/${p}`))
      })
      .catch(() => {
        // leave default placeholder
      })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-idx'))
          if (entry.isIntersecting) {
            setActive(idx)
            entry.target.classList.add('in-view')
          } else {
            entry.target.classList.remove('in-view')
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.45 }
    )

    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="container layout">
      <div className="scrolly">
        <aside className="narrative">
          <div className="narrative-inner">
            {SECTIONS.map((s, i) => (
              <div key={s.id} className={`nav-block ${i === active ? 'active' : ''}`}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="visuals">
          <div className="visual-frame">
            <VisualPanel images={images} index={active} />
          </div>

          <div className="sections">
            {SECTIONS.map((s, i) => (
              <article
                key={s.id}
                ref={(el) => (sectionRefs.current[i] = el)}
                data-idx={i}
                className="scroll-section"
                aria-labelledby={`section-${s.id}`}
              >
                <h3 id={`section-${s.id}`}>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function VisualPanel({ images, index }: { images: string[]; index: number }) {
  const img = images[index % images.length]
  return (
    <div className="visual" role="img" aria-label="Illustration">
      <img src={img} alt={`Illustration ${index + 1}`} />
      <div className="visual-caption">Section {index + 1} — visual</div>
    </div>
  )
}
