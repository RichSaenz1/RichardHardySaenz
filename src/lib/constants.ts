import {
  BarChart3,
  BookOpen,
  Bot,
  CreditCard,
  Home,
  Inbox,
  MessageSquare,
  Package,
  Settings,
  Users,
} from "lucide-react";

export const PRODUCT_MOTIONS = [
  {
    name: "Reserva Viva",
    description: "Reception, missed-call recovery, and booking support.",
  },
  {
    name: "Venta Viva",
    description: "WhatsApp sales, catalog support, carts, and checkout.",
  },
];

export const BUSINESS_TYPES = [
  { value: "clinic", label: "Clinic / medical office" },
  { value: "dental", label: "Dental office" },
  { value: "beauty", label: "Beauty, spa, or wellness" },
  { value: "legal", label: "Legal services" },
  { value: "real_estate", label: "Real estate" },
  { value: "insurance", label: "Insurance" },
  { value: "auto", label: "Auto services" },
  { value: "home_services", label: "Home services" },
  { value: "retail", label: "Retail / product seller" },
  { value: "restaurant", label: "Restaurant / catering" },
  { value: "other", label: "Other" },
];

export const LANGUAGES = [
  { value: "es", label: "Spanish" },
  { value: "en", label: "English" },
  { value: "both", label: "Spanish + English" },
];

export const TONES = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "warm", label: "Warm" },
  { value: "concise", label: "Concise" },
];

export const TIMEZONES = [
  "America/Panama",
  "America/Bogota",
  "America/Mexico_City",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/Madrid",
];

export const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Overview", icon: Home, activeExact: true },
  { href: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/dashboard/orders", label: "Orders", icon: Inbox },
  { href: "/dashboard/catalog", label: "Catalog", icon: Package },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/automations", label: "Automations", icon: Bot },
  { href: "/dashboard/channels", label: "Channels", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export const FUTURE_MODULES = [
  {
    title: "Conversations",
    description: "Future shared inbox and transcript storage.",
    icon: MessageSquare,
  },
  {
    title: "Catalog",
    description: "Future products and services for Venta Viva.",
    icon: Package,
  },
  {
    title: "Orders",
    description: "Future carts, payment links, and fulfillment states.",
    icon: Inbox,
  },
  {
    title: "Channels",
    description: "Future WhatsApp, voice, and official API bindings.",
    icon: BookOpen,
  },
];
