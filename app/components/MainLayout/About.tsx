"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { aboutContent } from '@/app/translations/about';
import SectionHeader from '../shared/SectionHeader';
import SkillCard from '../shared/SkillCard';
import StatCounter from '../shared/StatCounter';
import { Download, MapPin, GraduationCap } from 'lucide-react';
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiNodedotjs,
    SiTailwindcss,
    SiGit,
    SiBootstrap,
    SiMui,
    SiMysql
} from 'react-icons/si';
import { IoAnalytics } from 'react-icons/io5';

const skills = [
    { name: "React", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "var(--foreground)" }, // Adaptive
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952b3" },
    { name: "MUI", icon: <SiMui />, color: "#007FFF" },
    { name: "Git", icon: <SiGit />, color: "#F05032" },
    { name: "MySQL", icon: <SiMysql />, color: "#4bbad8ff" },
    { name: "PowerBI", icon: <IoAnalytics />, color: "#9c9c39" },
];

export default function About() {
    const { lang } = useLang();
    const content = aboutContent[lang];

    return (
        <section
            id="about"
            className="relative min-h-[100dvh] flex flex-col items-center justify-center py-20 overflow-hidden"
            style={{ scrollMarginTop: '80px' }}
        >
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-secondary-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl w-full px-6 md:px-10 z-10">
                <SectionHeader eyebrow={content.eyebrow} title={content.title} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Bio Column */}
                    <motion.div
                        initial={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col gap-6 ${lang === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                        <div className="glassmorphism p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />

                            <p className="text-base md:text-lg text-foreground/80 leading-relaxed relative z-10">
                                {content.bio}
                            </p>

                            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-foreground/10 relative z-10">
                                <div className="flex items-center gap-3 text-foreground/80">
                                    <span className="p-2 bg-foreground/5 rounded-lg text-accent"><MapPin size={20} /></span>
                                    <span className="font-medium">{content.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/80">
                                    <span className="p-2 bg-foreground/5 rounded-lg text-accent"><GraduationCap size={20} /></span>
                                    <span className="font-medium">{content.education}</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href="/Seif Mamdouh CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto self-start"
                        >
                            <button className="w-full sm:w-auto relative group text-accent border border-accent/20 transition-all duration-300 px-8 py-3.5 rounded-xl text-base font-semibold hover:pe-12 hover:bg-accent/5 cursor-pointer glassmorphism">
                                <span className="relative z-10 uppercase tracking-wider">{content.downloadCV}</span>
                                <span className="absolute opacity-0 ms-0 group-hover:opacity-100 group-hover:ms-2 transition-all duration-300 top-1/2 -translate-y-1/2">
                                    <Download className="w-5 h-5" />
                                </span>
                            </button>
                        </a>
                    </motion.div>

                    {/* Skills & Stats Column */}
                    <div className={`flex flex-col gap-10 ${lang === 'ar' ? 'lg:order-1' : 'lg:order-2'}`}>

                        {/* Skills Grid */}
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-accent rounded-full inline-block" />
                                {content.skills}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                {skills.map((skill, index) => (
                                    <SkillCard
                                        key={skill.name}
                                        name={skill.name}
                                        icon={skill.icon}
                                        color={skill.color}
                                        delay={index * 0.05}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {content.stats.map((stat, index) => (
                                <StatCounter
                                    key={stat.label}
                                    value={stat.value}
                                    label={stat.label}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
