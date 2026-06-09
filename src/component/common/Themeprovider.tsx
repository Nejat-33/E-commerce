import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemecontextType {
    theme: Theme,
    settheme: (theme: Theme) => void
}

const Themecontext = createContext<ThemecontextType | undefined>(undefined)

const ThemecontextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, settheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'system')


    useEffect(() => {
        const root = window.document.documentElement
        const body = window.document.body
        root.classList.remove("light", 'dark')
        body.classList.remove('light', 'dark');

        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.add(isDark ? 'dark' : 'light');
        } else {
            root.classList.add('light');
        }
        localStorage.setItem('theme', theme)

    }, [theme])

    return <Themecontext.Provider value={{ theme, settheme }}>
        {children}
    </Themecontext.Provider>
}

export default ThemecontextProvider

export const useTheme = () => {
    const context = useContext(Themecontext)
    if (!context) {
        throw new Error('the context must be used inside the provider')
    }
    return context
}
