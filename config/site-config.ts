import { LucideIcon, LayoutGrid, Github, Youtube, Mail, Cloud, Activity, ShoppingBag, Twitter, Database, Globe, Server } from "lucide-react"

export interface LinkItem {
  title: string
  url: string
  icon?: LucideIcon
}

export interface LinkBox {
  id: string
  title: string
  links: LinkItem[]
}

export const siteConfig = {
  user: {
    name: "Sheriff",
    greeting: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    },
  },
  search: {
    placeholder: "Search the web or enter a command...",
    shortcuts: [
      { key: "/gh", name: "GitHub", url: "https://github.com/search?q=" },
      { key: "/yt", name: "YouTube", url: "https://www.youtube.com/results?search_query=" },
      { key: "/r", name: "Reddit", url: "https://www.reddit.com/search/?q=" },
      { key: "/g", name: "Google", url: "https://www.google.com/search?q=" },
    ],
  },
  widgets: {
    weather: {
      location: "San Francisco, CA", // Placeholder
    },
    todo: {
      title: "Tasks",
    },
  },
  boxes: [
    {
      id: "daily-drivers",
      title: "Daily Drivers",
      links: [
        { title: "Gmail", url: "https://mail.google.com", icon: Mail },
        { title: "Keep", url: "https://keep.google.com", icon: LayoutGrid },
        { title: "Gemini", url: "https://gemini.google.com/u/2/app?pageId=none" },
        { title: "Perplexity", url: "https://perplexity.ai" },
      ],
    },
    {
      id: "the-engine",
      title: "The Engine",
      links: [
        { title: "GitHub", url: "https://github.com", icon: Github },
        { title: "N8N", url: "https://v3-n8n.veemi.site/projects/KiJqJI6LSipImmsi/workflows", icon: Activity },
        { title: "Vercel", url: "https://vercel.com", icon: Server },
        { title: "Cloudflare", url: "https://cloudflare.com", icon: Cloud },
        { title: "GCP", url: "https://console.cloud.google.com", icon: Database },
      ],
    },
    {
      id: "hq",
      title: "HQ",
      links: [
        { title: "Analytics", url: "https://analytics.google.com", icon: Activity },
        { title: "Search Console", url: "https://search.google.com/search-console", icon: Globe },
        { title: "whoisalfaz.me", url: "https://whoisalfaz.me", icon: Globe },
        { title: "v1.whoisalfaz.me", url: "https://v1.whoisalfaz.me", icon: Globe },
        { title: "Ads Manager", url: "https://adsmanager.facebook.com/adsmanager/manage/adsets/edit/standalone?act=1495358527395168&selected_campaign_ids=120229864378420543&selected_adset_ids=120229864940530543&ads_manager_write_regions=true&business_id=1452019422020361&nav_source=no_referrer#", icon: Activity },
      ],
    },
    {
      id: "network",
      title: "The Network",
      links: [
        { title: "Twitter", url: "https://twitter.com", icon: Twitter },
        { title: "LinkedIn", url: "https://linkedin.com" },
        { title: "Facebook", url: "https://facebook.com" },
        { title: "Instagram", url: "https://instagram.com" },
      ],
    },
    {
      id: "downtime",
      title: "Downtime",
      links: [
        { title: "Dropshop", url: "https://dropshop.com.bd", icon: ShoppingBag },
        { title: "YouTube", url: "https://youtube.com", icon: Youtube },
        { title: "TorrentBD", url: "https://torrentbd.com" },
      ],
    },
  ] as LinkBox[],
}
