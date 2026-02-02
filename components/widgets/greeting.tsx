"use client"

import { siteConfig } from "@/config/site-config"
import { useEffect, useState } from "react"

export function Greeting() {
    const [greeting, setGreeting] = useState(siteConfig.user.greeting.morning)

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting(siteConfig.user.greeting.morning)
        else if (hour < 18) setGreeting(siteConfig.user.greeting.afternoon)
        else setGreeting(siteConfig.user.greeting.evening)
    }, [])

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight text-white/90">
                {greeting}, {siteConfig.user.name}.
            </h1>
            <p className="text-white/50 text-sm mt-1">Ready to ship?</p>
        </div>
    )
}
