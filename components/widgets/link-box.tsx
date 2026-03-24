"use client"

import { LinkBox as LinkBoxType } from "@/config/site-config"
import { Card } from "@/components/ui/card"
import { ExternalLink, X, Plus } from "lucide-react"

interface LinkBoxProps {
    box: LinkBoxType
    isEditing?: boolean
    onRemove?: (url: string) => void
    onAdd?: () => void
}

export function LinkBox({ box, isEditing, onRemove, onAdd }: LinkBoxProps) {
    return (
        <Card className="h-full flex flex-col p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white/80">{box.title}</h3>
                {isEditing && (
                    <button
                        onClick={onAdd}
                        className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-3">
                {box.links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <div key={link.url} className="relative group">
                            <a
                                href={link.url}
                                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/5 p-3 text-center transition-all hover:bg-white/10 hover:scale-[1.02]"
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
                            {isEditing && (
                                <button
                                    onClick={() => onRemove?.(link.url)}
                                    className="absolute -top-1 -right-1 p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white shadow-lg transition-all scale-0 group-hover:scale-100 z-10"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
