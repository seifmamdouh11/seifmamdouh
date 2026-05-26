"use client";

import React from 'react';
import { useLang } from '@/app/hooks/useLang';
import { projectsContent } from '@/app/translations/projects';
import SectionHeader from '../shared/SectionHeader';
import ProjectCard from '../shared/ProjectCard';

export default function Projects() {
  const { lang } = useLang();
  const content = projectsContent[lang];

  return (
    <section 
      id="projects" 
      className="relative min-h-[100dvh] flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="max-w-7xl w-full px-6 md:px-10 z-10">
        <SectionHeader eyebrow={content.eyebrow} title={content.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {content.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              demoLabel={content.viewProject}
              githubLabel={content.sourceCode}
              delay={index * 0.1}
              priority={index === 0 || index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
