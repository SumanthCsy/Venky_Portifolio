'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Globe, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react'
import { ProjectModal } from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export function ContactFooter() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef(null);

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Visit Me',
      value: 'Hyderabad, India',
      details: 'Available for remote excellence',
      color: 'from-rose-500 to-pink-500',
      link: '#',
    },
    {
      icon: Phone,
      label: 'Call Anytime',
      value: '+91 90149 96841',
      details: 'Mon-Sat, 9AM-8PM',
      link: 'tel:+919014996841',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Mail,
      label: 'Email Support',
      value: 'venkyweb746@gmail.com',
      details: 'Response in 24 hours',
      link: 'mailto:venkyweb746@gmail.com',
      color: 'from-sky-500 to-blue-500',
    },
  ]

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'bg-[#0077b5]' },
    { icon: Github, label: 'GitHub', url: '#', color: 'bg-[#333]' },
    { icon: ExternalLink, label: 'Portfolio', url: '#', color: 'bg-primary' },
    { icon: Globe, label: 'Behance', url: '#', color: 'bg-accent' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=50',
          },
        }
      );

      // Contact cards flip entry
      contactCardsRef.current.forEach((card, idx) => {
        if (!card) return
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotationY: 30,
            transformPerspective: 1000
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=50',
            },
          }
        )
      })

      // Footer fade in
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
        }
      })
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden border-t border-white/5 bg-gradient-to-t from-black to-transparent"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-24">
          <h2 ref={titleRef} className="text-5xl md:text-8xl font-black tracking-tighter italic px-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Say Hello!
            </span>
          </h2>
          <p className="mt-8 text-xl text-muted-foreground font-bold uppercase tracking-[0.4em] opacity-40">Get in touch for a collaboration</p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) contactCardsRef.current[idx] = el
              }}
              className="group perspective"
            >
              <a
                href={info.link}
                className="block relative h-full rounded-[3rem] border border-white/10 bg-gradient-to-br from-card/80 to-card/20 backdrop-blur-3xl p-12 transition-all duration-500 shadow-2xl hover:border-primary/50 group-hover:shadow-primary/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${info.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative z-10 space-y-8">
                  <div className={`inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-to-br ${info.color} shadow-lg shadow-black/20 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground italic">{info.label}</h3>
                    <p className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">{info.value}</p>
                    <p className="text-sm font-bold text-primary/60">{info.details}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Socials & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-20 pointer-events-auto">
          <div className="space-y-10">
            <div className="space-y-6">
              <h4 className="text-3xl font-black italic">Venkatesh Buddula</h4>
              <p className="text-lg text-muted-foreground font-medium max-w-sm">Crafting premium digital products with a focus on details and user-centric design since 2018.</p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl ${social.color} border border-white/10 shadow-lg hover:scale-110 hover:-rotate-6 transition-all`}
                  title={social.label}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>

           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <ProjectModal 
                trigger={
                  <button className="relative w-full py-10 px-10 bg-black rounded-[3rem] border border-white/10 flex items-center justify-between group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-4xl font-black italic tracking-tighter">Start Project</span>
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-125 transition-transform group-hover:rotate-45">
                        <ArrowRight className="w-8 h-8 text-black" />
                    </div>
                  </button>
                }
              />
           </div>
        </div>

        {/* Bottom Bar */}
        <div ref={footerRef} className="pt-20 border-t border-white/5 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest italic opacity-40 mb-4 sm:mb-0">
            © 2026 Venkatesh Buddula
          </p>
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest italic opacity-40">
            Made With ❤️ By Venkatesh Buddula
          </p>
        </div>
      </div>
    </section>
  )
}
