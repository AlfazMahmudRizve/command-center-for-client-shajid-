"use client"

import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site-config"
import { CloudSun } from "lucide-react"

export function Weather() {
    return (
        <Card className="h-full flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10" noHover>
            <CloudSun className="h-10 w-10 text-white/80" />
            <div className="text-center">
                <div className="text-2xl font-bold text-white">72°</div>
                <div className="text-xs font-medium text-white/50">{siteConfig.widgets.weather.location}</div>
                <div className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">Partly Cloudy</div>
            </div>
        </Card>
    )
}
