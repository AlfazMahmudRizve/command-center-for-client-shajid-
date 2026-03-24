import { LucideIcon, LayoutGrid, Github, Youtube, Mail, Cloud, Activity, ShoppingBag, Twitter, Database, Globe, Server, Linkedin, Facebook, Instagram, MessageCircle, BarChart, Search, Sparkles, MessageSquare, BookOpen } from "lucide-react"

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
    name: "Shajid",
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
      location: "Dhaka, BD", // Placeholder
    },
    todo: {
      title: "Tasks",
    },
  },
  boxes: [
    {
      id: "shajid-workspace",
      title: "Workspace",
      links: [
        { title: "Gmail", url: "https://mail.google.com", icon: Mail },
        { title: "Bulk SMS BD", url: "https://bulksmsbd.net/sms-logs/list", icon: MessageCircle },
        { title: "Ashbazar Admin", url: "https://ashbazarbd.com/admin/login/?next=/admin/ashbazar/order/", icon: Database },
        { title: "FB Business", url: "https://business.facebook.com/business/loginpage/?next=https%3A%2F%2Fbusiness.facebook.com%2Flatest%2Finbox%2Fmessenger%3Fasset_id%3D650425684817223%26nav_ref%3Dbiz_unified_f3_login_page_to_mbs&login_options%5B0%5D=FB&login_options%5B1%5D=IG&login_options%5B2%5D=SSO&config_ref=biz_login_tool_flavor_mbs", icon: Facebook },
        { title: "Ashbazar EN", url: "https://ashbazarbd.com/en/", icon: Globe },
      ],
    },
    {
      id: "engine",
      title: "Engine",
      links: [
        { title: "GitHub", url: "https://github.com", icon: Github },
        { title: "N8N", url: "https://v4-n8n.veemi.site/home/workflows", icon: Activity },
        { title: "DigitalOcean", url: "https://cloud.digitalocean.com/apps/", icon: Server },
        { title: "Vercel", url: "https://vercel.com", icon: Server },
        { title: "Cloudflare", url: "https://cloudflare.com", icon: Cloud },
        { title: "GCP", url: "https://console.cloud.google.com", icon: Database },
      ],
    },
    {
      id: "assistants",
      title: "Assistants",
      links: [
        { title: "Gemini", url: "https://gemini.google.com/u/2/app?pageId=none", icon: Sparkles },
        { title: "ChatGPT", url: "https://chat.openai.com", icon: MessageSquare },
        { title: "Perplexity", url: "https://perplexity.ai", icon: Search },
        { title: "NotebookLLM", url: "https://notebooklm.google.com", icon: BookOpen },
        { title: "Google AI Studio", url: "https://aistudio.google.com/", icon: Sparkles },
      ],
    },
    {
      id: "performance",
      title: "Performance",
      links: [
        { title: "Analytics", url: "https://analytics.google.com", icon: Activity },
        { title: "Search Console", url: "https://search.google.com/search-console", icon: Search },
        { title: "Bing Webmaster", url: "https://www.bing.com/webmasters/home?siteUrl=http://whoisalfaz.me/", icon: Globe },
        { title: "Ads Manager", url: "https://adsmanager.facebook.com/adsmanager/manage/adsets/edit/standalone?act=1495358527395168&selected_campaign_ids=120229864378420543&selected_adset_ids=120229864940530543&ads_manager_write_regions=true&business_id=1452019422020361&nav_source=no_referrer#", icon: BarChart },
      ],
    },
    {
      id: "network",
      title: "Network",
      links: [
        { title: "Twitter", url: "https://twitter.com", icon: Twitter },
        { title: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
        { title: "Facebook", url: "https://facebook.com", icon: Facebook },
        { title: "Instagram", url: "https://instagram.com", icon: Instagram },
        { title: "Medium", url: "https://medium.com/", icon: BookOpen },
        { title: "Contra", url: "https://contra.com/community/for-you", icon: MessageCircle },
      ],
    },
    {
      id: "downtime",
      title: "Downtime",
      links: [
        { title: "Dropshop", url: "https://dropshop.com.bd", icon: ShoppingBag },
        { title: "YouTube", url: "https://youtube.com", icon: Youtube },
        { title: "TorrentBD", url: "https://torrentbd.com", icon: Globe },
        { title: "AniKai", url: "https://anikai.to/", icon: Youtube },
      ],
    },
  ] as LinkBox[],
}
