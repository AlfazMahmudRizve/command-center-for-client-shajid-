"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function DigitalClock() {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        setTime(new Date())
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    if (!time) return <Card noHover className="flex items-center justify-center p-4 min-h-[140px] animate-pulse bg-white/5" >Loading...</Card>

    return (
        <Card noHover className="flex flex-col items-center justify-center p-8 h-full min-h-[140px]">
            <div className="text-5xl font-bold tracking-tighter tabular-nums text-white">
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-sm font-medium text-white/40 mt-2 uppercase tracking-widest">
                {time.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
            </div>
        </Card>
    )
}
