import React from "react";

export type Lang = "en" | "ar";

export interface LangContextType {
    lang: Lang;
    toggleLang: () => void;
    setLang: (lang: Lang) => void;
}

export interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
    setTheme: (theme: "light" | "dark") => void;
}

export type Props = {
    children: React.ReactNode;
}
