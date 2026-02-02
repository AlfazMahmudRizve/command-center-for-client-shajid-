"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    noHover?: boolean
}

export function Card({ children, className, noHover = false, ...props }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "glass-card rounded-2xl p-6 relative overflow-hidden group",
                !noHover && "glass-hover cursor-pointer",
                className
            )}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...props as any}
        >
            <div className="relative z-10">{children}</div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    )
}
