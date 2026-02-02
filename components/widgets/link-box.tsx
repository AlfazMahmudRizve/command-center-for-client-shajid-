"use client"

import { LinkBox as LinkBoxType } from "@/config/site-config"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function LinkBox({ box }: { box: LinkBoxType }) {
    return (
        <Card className="h-full flex flex-col p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white/80">{box.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {box.links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={link.title}
                            href={link.url}
                            className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-white/5 p-3 text-center transition-all hover:bg-white/10 hover:scale-[1.02]"
                        >
                            {Icon ? (
                                <Icon className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                            ) : (
                                <ExternalLink className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                            )}
                            <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors line-clamp-1">
                                {link.title}
                            </span>
                        </a>
                    )
                })}
            </div>
        </Card>
    )
}
