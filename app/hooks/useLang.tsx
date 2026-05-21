import { useContext } from "react";
import { LangContext } from "../context/LanguageContext";

export const useLang = () => {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error("useLang must be used within a LanguageProvider");
    }
    return context;
};