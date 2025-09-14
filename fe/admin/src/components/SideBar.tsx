"use client";
import React, {useMemo, useState, useEffect} from "react";
import {
  Folder,
  Grid,
  Home,
  LogOut,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronLeft,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface MenuChild {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuChild[];
}

const MENU: MenuItem[] = [
  { title: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
  { title: "Catalog", icon: <Grid className="w-5 h-5" />, href: "/catalog" },
  {
    title: "Pages",
    icon: <Folder className="w-5 h-5" />,
    children: [
      { title: "Add item", href: "/pages/add-item" },
      { title: "Edit user", href: "/pages/edit-user" },
      { title: "Sign in", href: "/auth/sign-in" },
      { title: "Sign up", href: "/auth/sign-up" },
      { title: "Forgot password", href: "/auth/forgot" },
      { title: "404 page", href: "/404" },
    ],
  },
  { title: "Users", icon: <Users className="w-5 h-5" />, href: "/users" },
  { title: "Comments", icon: <MessageSquare className="w-5 h-5" />, href: "/comments" },
];

const Brand: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className="px-3 pt-4 pb-3 border-b border-white/10">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-blue-500/80 via-sky-400/70 to-cyan-400/60 ring-1 ring-white/20 shadow-inner">
          <span className="text-xs font-black tracking-widest text-white drop-shadow">FX</span>
        </div>
        {!collapsed && (
          <div className="text-[22px] font-extrabold tracking-tight select-none">
            <span className="text-white">FLIX</span>
            <span className="text-blue-400"> TV</span>
            <span className="ml-2 align-top text-[10px] uppercase tracking-widest text-white/50">Admin</span>
          </div>
        )}
      </div>
      {!collapsed && (
        <button
          aria-label="More"
          className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      )}
    </div>
  </div>
);

const ProfileCard: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className="px-3 py-3">
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-base">👤</div>
      {!collapsed && (
        <div className="flex-1 leading-tight min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-white/50">Admin</p>
          <p className="text-sm font-medium truncate">John Doe</p>
        </div>
      )}
      <button
        aria-label="Sign out"
        className="ml-auto rounded-lg p-2 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  </div>
);

function ActiveRail({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-sky-400 to-blue-500 transition-opacity",
        active ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

function NavLink({
  title,
  icon,
  href,
  active,
  onClick,
  variant = "default",
  collapsed,
}: {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  variant?: "default" | "sub";
  collapsed?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 px-3 py-2 text-[15px] transition-colors",
        variant === "default" &&
          "rounded-xl hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60",
        variant === "sub" && "w-full block hover:bg-white/5"
      )}
      aria-current={active ? "page" : undefined}
    >
      <ActiveRail active={active} />
      <span
        className={cn(
          "grid h-5 w-5 place-items-center transition-colors",
          active ? "text-sky-400" : "text-white/70 group-hover:text-sky-300"
        )}
      >
        {icon ? icon : <span className="-mt-[2px] text-lg">•</span>}
      </span>
      {!collapsed && (
        <span className={cn("flex-1 text-left transition-colors", active ? "text-sky-300" : "text-white/90 group-hover:text-white")}>{title}</span>
      )}
      {collapsed && <span className="sr-only">{title}</span>}
    </a>
  );
}

function NavSection({
  item,
  open,
  toggle,
  isActive,
  collapsed,
}: {
  item: MenuItem;
  open: boolean;
  toggle: () => void;
  isActive: (href?: string) => boolean;
  collapsed: boolean;
}) {
  const contentId = `section-${item.title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="select-none">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left",
          "text-white/85 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        )}
      >
        <span className="flex items-center gap-3">
          <span className="text-white/70">{item.icon}</span>
          {!collapsed && <span className="font-medium">{item.title}</span>}
          {collapsed && <span className="sr-only">{item.title}</span>}
        </span>
        {!collapsed && <ChevronDown className={cn("h-4 w-4 transition-transform text-white/70", open ? "rotate-180" : "rotate-0")} />}
      </button>

      <AnimatePresence initial={false}>
        {open && !collapsed && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden text-sm w-full -mx-2"
          >
            {item.children?.map((c) => (
              <NavLink key={c.title} title={c.title} href={c.href} active={isActive(c.href)} variant="sub" collapsed={false} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ collapsed: collapsedProp = false, currentPath = "/" }: { collapsed?: boolean; currentPath?: string; }) {
  const [openSection, setOpenSection] = useState<string | null>("Pages");
  const [collapsed, setCollapsed] = useState<boolean>(collapsedProp);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const onChange = () => setCollapsed(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = useMemo(() => (href?: string) => !!href && href === currentPath, [currentPath]);

  return (
    <aside
      className={cn(
        "relative h-screen text-gray-100",
        "bg-[#0b1018]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0b1018]/80",
        "shadow-2xl shadow-black/40 ring-1 ring-white/10",
        collapsed ? "w-[78px]" : "w-72",
        "flex flex-col"
      )}
      aria-label="Sidebar"
    >
      <Brand collapsed={collapsed} />
      <ProfileCard collapsed={collapsed} />
      <nav className="flex-1 overflow-y-auto px-2 pb-4 sidebar-scroll">
        {MENU.map((item) => {
          if (item.children?.length) {
            const opened = openSection === item.title;
            return <NavSection key={item.title} item={item} open={opened} isActive={isActive} collapsed={collapsed} toggle={() => setOpenSection(opened ? null : item.title)} />;
          }
          return <NavLink key={item.title} title={item.title} icon={item.icon} href={item.href} active={isActive(item.href)} collapsed={collapsed} />;
        })}
        <div className="mt-4 border-t border-white/10 pt-3">
          {!collapsed && <p className="px-3 text-[10px] uppercase tracking-widest text-white/40 mb-1">System</p>}
          <NavLink title="Users" icon={<Users className="w-5 h-5" />} href="/users" collapsed={collapsed} />
          <NavLink title="Comments" icon={<MessageSquare className="w-5 h-5" />} href="/comments" collapsed={collapsed} />
        </div>
      </nav>
      <footer className="px-3 pb-4 pt-2 text-[11px] text-white/45">
        {!collapsed && (<><p>© FlixTV.template, 2025</p><p>Create by <span className="text-white/70">Dmitry Volkov</span></p></>)}
      </footer>
      <button onClick={() => setCollapsed((p) => !p)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="absolute -right-3 top-24 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#0b1018] ring-1 ring-white/10 shadow-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-180" : "rotate-0")} />
      </button>
    </aside>
  );
}