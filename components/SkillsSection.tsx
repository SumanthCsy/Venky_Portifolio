'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Code, Palette, Video, Globe, Zap, Cpu, MousePointer2, Smartphone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Design Master',
    icon: Palette,
    skills: ['Graphic Design', 'UI/UX', 'Logo Design', 'Branding & Identity', 'Banners & Layouts'],
    color: 'from-pink-500 to-rose-500',
    description: 'Transforming visions into pixel-perfect masterpieces',
  },
  {
    title: 'CMS Wizard',
    icon: Globe,
    skills: ['WordPress', 'Shopify', 'Elementor', 'WooCommerce', 'Plugin Customization'],
    color: 'from-blue-500 to-indigo-500',
    description: 'Dynamic web solutions built on robust platforms',
  },
  {
    title: 'Code Ninja',
    icon: Code,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
    color: 'from-emerald-500 to-teal-500',
    description: 'Structure, style, and logic in perfect harmony',
  },
  {
    title: 'Tools & Creative',
    icon: Video,
    skills: ['Photoshop', 'Illustrator', 'Video Editing', 'Social Media Graphics', 'Marketing Assets'],
    color: 'from-orange-500 to-amber-500',
    description: 'The creative arsenal for modern digital presence',
  },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Professional Title Anim
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, skewX: 10 },
        {
          opacity: 1,
          scale: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
          },
        }
      );

      // Flip & Roll Entry for Cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            rotationY: 180, 
            scale: 0.5, 
            z: -500,
            transformPerspective: 1500 
          },
          {
            opacity: 1,
            rotationY: 0,
            scale: 1,
            z: 0,
            duration: 1.5,
            delay: idx * 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=50',
            },
          }
        )

        // Floating hover effect with depth
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            rotationX: -5,
            rotationY: 10,
            scale: 1.05,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.4)',
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          })
        })
      });
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Dynamic particles in background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-20" />
      
      <div className="container mx-auto max-w-6xl">
        <div className="mb-24 text-center">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black italic tracking-tighter px-4">
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Creative Skills
            </span>
          </h2>
          <p className="mt-8 text-2xl text-muted-foreground font-bold max-w-2xl mx-auto uppercase tracking-widest opacity-40">The Craftsmanship</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el
              }}
              className="group perspective h-full"
            >
              <div
                className="relative h-full overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-3xl p-10 transition-all duration-500 shadow-xl hover:shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background Decor */}
                <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${category.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
                
                {/* Accent line on top */}
                <div className={`absolute top-0 left-10 right-10 h-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${category.color} shadow-lg shadow-black/20 group-hover:scale-125 transition-transform duration-500`}>
                      <category.icon className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-none tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-sm font-semibold text-muted-foreground italic mt-2 opacity-80">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, sidx) => (
                      <div
                        key={sidx}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-base font-bold text-foreground/90 hover:bg-gradient-to-r hover:from-white/10 hover:to-transparent hover:border-white/10 transition-all cursor-default shadow-sm hover:shadow-lg"
                      >
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abstract Icons at Bottom */}
                <div className="mt-12 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-4">
                      <Cpu className="w-6 h-6 text-primary" />
                      <MousePointer2 className="w-6 h-6 text-secondary" />
                      <Smartphone className="w-6 h-6 text-accent" />
                   </div>
                   <div className="text-4xl font-black text-white/5 italic">MASTER</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
