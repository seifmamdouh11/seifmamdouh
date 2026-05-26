"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  demoLabel: string;
  githubLabel: string;
  delay?: number;
  priority?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  demoUrl,
  githubUrl,
  demoLabel,
  githubLabel,
  delay = 0,
  priority = false
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-col rounded-2xl glassmorphism overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-accent/30"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-foreground/5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 line-clamp-1">
          {title}
        </h3>

        <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-foreground/5 text-accent/90 border border-foreground/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-foreground/10">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-foreground/90 hover:text-accent transition-colors"
          >
            <ExternalLink size={18} />
            <span>{demoLabel}</span>
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-foreground/90 hover:text-accent transition-colors ms-auto rtl:ms-0 rtl:me-auto"
          >
            <FiGithub size={18} />
            <span>{githubLabel}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
