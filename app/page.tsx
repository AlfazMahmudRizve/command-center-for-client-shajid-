"use client"

import React, { useState } from "react"
import { Greeting } from "@/components/widgets/greeting"
import { DigitalClock } from "@/components/widgets/digital-clock"
import { Weather } from "@/components/widgets/weather"
import { CommandCenter } from "@/components/widgets/command-center"
import { TodoList } from "@/components/widgets/todo-list"
import { LinkBox } from "@/components/widgets/link-box"
import { useDynamicLinks } from "@/hooks/use-dynamic-links"
import { Settings2, X } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Home() {
  const { boxes, isLoaded, addLink, removeLink } = useDynamicLinks()
  const [isEditing, setIsEditing] = useState(false)
  const [showAddModal, setShowAddModal] = useState<{ boxId: string } | null>(null)
  const [newLink, setNewLink] = useState({ title: "", url: "" })

  if (!isLoaded) return null

  const getBox = (id: string) => boxes.find(b => b.id === id)

  const sections = [
    { id: "shajid-workspace", title: "Workspace" },
    { id: "engine", title: "Engine" },
    { id: "assistants", title: "Assistants" },
    { id: "performance", title: "Performance" },
    { id: "network", title: "Network" },
    { id: "downtime", title: "Downtime" }
  ]

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (showAddModal && newLink.title && newLink.url) {
      addLink(showAddModal.boxId, { ...newLink })
      setNewLink({ title: "", url: "" })
      setShowAddModal(null)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Ambient Background Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Edit Mode Toggle */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`fixed top-6 right-6 p-2 rounded-full transition-all z-50 ${isEditing ? "bg-white text-black scale-110 shadow-lg" : "bg-white/5 text-white/40 hover:text-white"
          }`}
      >
        <Settings2 className="h-5 w-5" />
      </button>

      <div className="w-full max-w-7xl space-y-6 z-10">
        {/* Top Row: Greeting, Clock, Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 flex flex-col justify-center px-4">
            <Greeting />
          </div>
          <div className="h-full">
            <DigitalClock />
          </div>
          <div className="h-full">
            <Weather />
          </div>
        </div>

        {/* Search Row */}
        <div className="w-full">
          <CommandCenter />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Todo List - Tall */}
          <div className="row-span-2 hidden lg:block h-full">
            <TodoList />
          </div>

          {sections.map(({ id }) => (
            <div key={id}>
              {getBox(id) && (
                <LinkBox
                  box={getBox(id)!}
                  isEditing={isEditing}
                  onRemove={(url) => removeLink(id, url)}
                  onAdd={() => setShowAddModal({ boxId: id })}
                />
              )}
            </div>
          ))}

          {/* Mobile Todo (visible only on small screens, otherwise hidden) */}
          <div className="block lg:hidden row-span-2">
            <TodoList />
          </div>
        </div>
      </div>

      {/* Simple Add Link Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-zinc-950 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Link</h3>
              <button onClick={() => setShowAddModal(null)} className="p-1 hover:bg-white/5 rounded-full transition-colors">
                <X className="h-5 w-5 text-white/40" />
              </button>
            </div>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Display Name</label>
                <input
                  autoFocus
                  required
                  value={newLink.title}
                  onChange={e => setNewLink({ ...newLink, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-all"
                  placeholder="e.g. DigitalOcean"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">URL</label>
                <input
                  required
                  type="url"
                  value={newLink.url}
                  onChange={e => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-all"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(null)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-all"
                >
                  Add Link
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isEditing && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-full font-bold text-xs shadow-2xl z-50 animate-bounce">
          EDIT MODE ACTIVE
        </div>
      )}
    </main>
  )
}
