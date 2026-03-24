"use client"

import { useState, useEffect } from "react"
import { siteConfig, LinkBox, LinkItem } from "@/config/site-config"

const STORAGE_KEY = "sheriff-custom-links"

export function useDynamicLinks() {
    const [boxes, setBoxes] = useState<LinkBox[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load links
    useEffect(() => {
        const loadLinks = async () => {
            // Try Chrome Storage first
            // @ts-expect-error - chrome is defined in extension environment
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                // @ts-expect-error - chrome.storage is valid
                chrome.storage.local.get([STORAGE_KEY], (result) => {
                    if (result[STORAGE_KEY]) {
                        setBoxes(result[STORAGE_KEY])
                    } else {
                        setBoxes(siteConfig.boxes)
                    }
                    setIsLoaded(true)
                })
            } else {
                // Fallback to localStorage
                const saved = localStorage.getItem(STORAGE_KEY)
                if (saved) {
                    try {
                        setBoxes(JSON.parse(saved))
                    } catch (e) {
                        setBoxes(siteConfig.boxes)
                    }
                } else {
                    setBoxes(siteConfig.boxes)
                }
                setIsLoaded(true)
            }
        }

        loadLinks()
    }, [])

    // Save links
    const saveLinks = (newBoxes: LinkBox[]) => {
        setBoxes(newBoxes)
        // @ts-expect-error - chrome is defined in extension environment
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            const data: { [key: string]: LinkBox[] } = {}
            data[STORAGE_KEY] = newBoxes
            // @ts-expect-error - chrome.storage.local is valid
            chrome.storage.local.set(data)
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoxes))
        }
    }

    const addLink = (boxId: string, link: LinkItem) => {
        const newBoxes = boxes.map(box => {
            if (box.id === boxId) {
                return { ...box, links: [...box.links, link] }
            }
            return box
        })
        saveLinks(newBoxes)
    }

    const removeLink = (boxId: string, linkUrl: string) => {
        const newBoxes = boxes.map(box => {
            if (box.id === boxId) {
                return { ...box, links: box.links.filter(l => l.url !== linkUrl) }
            }
            return box
        })
        saveLinks(newBoxes)
    }

    const resetLinks = () => {
        saveLinks(siteConfig.boxes)
    }

    return { boxes, isLoaded, addLink, removeLink, resetLinks }
}
