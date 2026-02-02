"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Plus, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
    id: string
    text: string
    completed: boolean
}

export function TodoList() {
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [inputValue, setInputValue] = React.useState("")
    const [isLoaded, setIsLoaded] = React.useState(false)

    React.useEffect(() => {
        const saved = localStorage.getItem("sheriff-tasks")
        if (saved) {
            try {
                setTasks(JSON.parse(saved))
            } catch (e) {
                console.error(e)
            }
        }
        setIsLoaded(true)
    }, [])

    React.useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("sheriff-tasks", JSON.stringify(tasks))
        }
    }, [tasks, isLoaded])

    const addTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return
        setTasks([...tasks, { id: crypto.randomUUID(), text: inputValue.trim(), completed: false }])
        setInputValue("")
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }

    const removeTask = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setTasks(tasks.filter(t => t.id !== id))
    }

    if (!isLoaded) return <Card className="h-full min-h-[300px]" noHover>Loading tasks...</Card>

    return (
        <Card className="h-full flex flex-col p-0 overflow-hidden" noHover>
            <div className="p-5 border-b border-white/5 bg-white/5">
                <h3 className="font-medium text-white/80">Tasks</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-[200px] max-h-[300px] custom-scrollbar">
                {tasks.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-sm text-white/30">
                        No tasks yet. Stay focused!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 cursor-pointer",
                                task.completed && "opacity-50"
                            )}
                        >
                            <div className={cn(
                                "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                                task.completed ? "bg-white text-black border-white" : "border-white/20 group-hover:border-white/50"
                            )}>
                                {task.completed && <Check className="h-3.5 w-3.5" />}
                            </div>
                            <span className={cn("flex-1 text-sm text-white/80", task.completed && "line-through")}>
                                {task.text}
                            </span>
                            <button
                                onClick={(e) => removeTask(task.id, e)}
                                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={addTask} className="p-3 border-t border-white/5">
                <div className="relative">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add new task..."
                        className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-1 top-1 rounded-md p-1 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-0 transition-all"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </Card>
    )
}
