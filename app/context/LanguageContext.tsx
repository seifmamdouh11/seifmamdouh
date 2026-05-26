"use client"
import { createContext, useEffect, useState } from "react";
import type { LangContextType, Props } from "../types/types";

export const LangContext = createContext<LangContextType | null>(null);

export default function LanguageProvider({ children }: Props) {
    const [lang, setLang] = useState<LangContextType["lang"]>("en");
    const toggleLang = () => {
        setLang((prevLang) => (prevLang === "en" ? "ar" : "en"));
    };

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
    }, [lang]);

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang && (savedLang === "en" || savedLang === "ar")) {
            setLang(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
}
