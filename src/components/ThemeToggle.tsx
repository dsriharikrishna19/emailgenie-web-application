"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme();

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="secondary" size="sm" className="w-10 h-10 p-0 rounded-full">
                <div className="h-4 w-4" />
            </Button>
        );
    }

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="secondary"
            size="sm"
            className="w-12 h-12 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            onClick={handleToggle}
            title="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all font-bold w-12 h-12" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all font-bold w-12 h-12" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
