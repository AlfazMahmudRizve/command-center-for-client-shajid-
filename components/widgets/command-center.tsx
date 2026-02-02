"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site-config"


export function CommandCenter() {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
            if (e.key === "Escape") {
                setOpen(false)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    React.useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [open])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query) return

        // Check for smart triggers
        const trigger = siteConfig.search.shortcuts.find(s => query.startsWith(s.key + " "))

        if (trigger) {
            const q = query.slice(trigger.key.length + 1)
            window.location.href = trigger.url + encodeURIComponent(q)
        } else {
            // Default to Google
            const defaultSearch = siteConfig.search.shortcuts.find(s => s.key === "/g")
            window.location.href = (defaultSearch ? defaultSearch.url : "https://www.google.com/search?q=") + encodeURIComponent(query)
        }
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group relative flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white"
            >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left">Search or type a command...</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50 opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                        >
                            <form onSubmit={handleSearch} className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                                <Search className="h-5 w-5 text-white/50" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Where to? (/gh, /yt, /r)..."
                                    className="flex-1 bg-transparent text-lg text-white placeholder:text-white/20 focus:outline-none"
                                    autoComplete="off"
                                />
                                <div onClick={() => setOpen(false)} className="cursor-pointer rounded-sm p-1 hover:bg-white/10 text-white/50 hover:text-white">
                                    <X className="h-5 w-5" />
                                </div>
                            </form>
                            <div className="px-2 py-2">
                                <div className="text-xs font-medium text-white/30 px-2 py-1 mb-1">Try</div>
                                <div className="grid grid-cols-2 gap-1">
                                    {siteConfig.search.shortcuts.map((s) => (
                                        <div key={s.key}
                                            onClick={() => {
                                                setQuery(s.key + " ");
                                                inputRef.current?.focus();
                                            }}
                                            className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-white/70 hover:bg-white/5 cursor-pointer transition-colors"
                                        >
                                            <span className="font-mono text-white/40">{s.key}</span>
                                            <span>{s.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
