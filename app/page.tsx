"use client"

import { siteConfig } from "@/config/site-config"
import { Greeting } from "@/components/widgets/greeting"
import { DigitalClock } from "@/components/widgets/digital-clock"
import { Weather } from "@/components/widgets/weather"
import { CommandCenter } from "@/components/widgets/command-center"
import { TodoList } from "@/components/widgets/todo-list"
import { LinkBox } from "@/components/widgets/link-box"


export default function Home() {
  const { boxes } = siteConfig

  // Helper to find box by ID
  const getBox = (id: string) => boxes.find(b => b.id === id)

  const dailyDrivers = getBox("daily-drivers")
  const engine = getBox("the-engine")
  const hq = getBox("hq")
  const network = getBox("network")
  const downtime = getBox("downtime")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Ambient Background Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

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

          {/* Daily Drivers - Wide */}
          <div className="lg:col-span-2">
            {dailyDrivers && <LinkBox box={dailyDrivers} />}
          </div>

          {/* The Engine */}
          <div>
            {engine && <LinkBox box={engine} />}
          </div>

          {/* Mobile Todo (visible only on small screens, otherwise hidden) */}
          <div className="block lg:hidden row-span-2">
            <TodoList />
          </div>

          {/* Row 4 Helpers */}
          <div>
            {hq && <LinkBox box={hq} />}
          </div>
          <div>
            {network && <LinkBox box={network} />}
          </div>
          <div>
            {downtime && <LinkBox box={downtime} />}
          </div>
        </div>
      </div>
    </main>
  )
}
