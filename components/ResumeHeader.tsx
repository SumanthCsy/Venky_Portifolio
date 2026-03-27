'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { ProjectModal } from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export function ResumeHeader() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } })

      // Image entrance
      tl.from(imageRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -45,
        duration: 1.2,
      }, 0)

      // Ring animation
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })

      // Content staggered entry
      tl.from([subtitleRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
      }, 0.2)

      // Stats
      tl.from('.stat-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
      }, 0.4)

      // CTA
      tl.from(ctaRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.95,
      }, 0.6)

      // Continuous floating animation
      gsap.to(imageRef.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { label: '7+', value: 'Years XP' },
    { label: '20+', value: 'Projects' },
    { label: '3', value: 'Cos' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90dvh] lg:min-h-screen flex items-center justify-center px-6 lg:px-12 py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Profile Section */}
          <div className="flex justify-center order-first lg:order-none mb-12 lg:mb-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
              <div ref={ringRef} className="absolute -inset-4 border border-dashed border-primary/30 rounded-full" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] opacity-40 animate-pulse" />
              
              <div
                ref={imageRef}
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 bg-slate-900 shadow-2xl z-10"
              >
                <Image src="/profile.jpg" alt="Venkatesh" fill className="object-cover scale-110" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-8 text-center lg:text-left">
            <div ref={subtitleRef} className="inline-block px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em]">
              Graphic & Web Designer
            </div>
            
            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Venkatesh<br />Buddula
            </h1>

            <p ref={descRef} className="text-lg text-muted-foreground/80 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Crafting <span className="text-foreground">bespoke digital solutions</span> since 2018. Expert in UI/UX, WordPress development, and high-convertible branding.
            </p>

            <div className="grid grid-cols-3 gap-4 lg:gap-6 py-4">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item p-4 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-3xl font-black italic bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">{stat.label}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <ProjectModal trigger={
                <button ref={ctaRef} className="w-full sm:w-auto group relative px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                   <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="relative flex items-center gap-3 justify-center">
                      <span>Start Project</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </div>
                </button>
              } />
              
              <div className="flex gap-4">
                <a href="mailto:venkyweb746@gmail.com" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:scale-110"><Mail className="w-5 h-5" /></a>
                <a href="tel:+919014996841" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-all hover:scale-110"><Phone className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
