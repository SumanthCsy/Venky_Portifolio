'use client'

import { ResumeHeader } from '@/components/ResumeHeader'
import { ExperienceSection } from '@/components/ExperienceSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { EducationSection } from '@/components/EducationSection'
import { ContactFooter } from '@/components/ContactFooter'
import { AnimatedBackground3D } from '@/components/AnimatedBackground3D'

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-background">
      {/* 3D Animated Background */}
      <AnimatedBackground3D />

      {/* Content Sections */}
      <div className="relative z-10">
        <ResumeHeader />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactFooter />
      </div>
    </main>
  )
}
