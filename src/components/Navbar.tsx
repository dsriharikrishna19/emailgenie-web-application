"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Templates", icon: Mail },
    { href: "/compose", label: "Compose", icon: Sparkles },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-black/20 backdrop-blur-md sticky top-0 z-50">
            <div className="px-8 md:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                        <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        EmailGenie AI
                    </span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium pb-0.5 border-b-2 transition-all duration-200",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                                        : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Mobile nav */}
                    <nav className="flex md:hidden items-center gap-4">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-1.5 text-xs font-medium border-b-2 pb-0.5 transition-all",
                                        isActive
                                            ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                                            : "text-slate-500 dark:text-slate-400 border-transparent"
                                    )}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
