"use client";

import { useState, useEffect } from "react";
import {
    Bell,
    Menu,
} from "lucide-react";
import Image from "next/image";

import {
    HomeIcon,
    DiscoverIcon,
    LibraryIcon,
    StackIcon,
    SubscriptIcon,
    ReWardsIcon,
    SettingsIcon
} from "@/components/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { getInitials } from "@/hooks/get-initials";


export default function MentorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);



    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        setIsDesktop(mediaQuery.matches);
        setIsSidebarOpen(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches);
            setIsSidebarOpen(e.matches);
        };
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const sidebarVariants = {
        open: {
            x: 0,
            transition: { type: "spring" as const, stiffness: 260, damping: 28 },
        },
        closed: {
            x: "-100%",
            transition: { type: "spring" as const, stiffness: 260, damping: 28 },
        },
    };

    const overlayVariants = {
        open: { opacity: 1, transition: { duration: 0.3 } },
        closed: { opacity: 0, transition: { duration: 0.3 } },
    };

    const navItems = [
        {
            name: "Home",
            icon: HomeIcon,
            href: "/dashboard"
        },
        {
            name: "Discover",
            icon: DiscoverIcon,
            href: "/dashboard/discover"
        },
        {
            name: "Library",
            icon: LibraryIcon,
            href: "/dashboard/library",
        },
        {
            name: "Tech Stack",
            icon: StackIcon,
            href: "/dashboard/tech-stack",
        },
        {
            name: "Subscription",
            icon: SubscriptIcon,
            href: "/dashboard/subscription"
        },
        {
            name: "Rewards Hub",
            icon: ReWardsIcon,
            href: "/dashboard/earn-rewards"
        },
        {
            name: "Settings",
            icon: SettingsIcon,
            href: "/dashboard/settings"
        },
    ];

    const fullName =
        `${user?.user_metadata?.first_name ?? ""} ${user?.user_metadata?.last_name ?? ""}`.trim() || "User";

    return (
        <div className="bg-[#F8F9FB] dark:bg-background-dark text-text-primary antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                initial={false}
                animate={isSidebarOpen ? "open" : "closed"}
                className="fixed top-0 left-0 z-20 flex flex-col w-64 h-full bg-white dark:bg-[#1E1E2C] border-r border-gray-100 dark:border-[#333]"
            >

                <div className="p-6">
                    <Image src="/flowva_logo.png" alt="logo" width={150} height={150} />
                </div>
                <nav className="flex-1 flex flex-col gap-1 py-4 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon as any;
                        return (
                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                key={item.name}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => !isDesktop && setIsSidebarOpen(false)}
                                    className={`flex items-center mx-4 rounded-xl gap-3 px-8 py-3  text-sm font-medium transition-all group relative ${isActive
                                        ? "bg-[#ead2ff] dark:bg-white/10 text-primary dark:text-secondary"
                                        : "text-text-primary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-secondary"
                                        }`}
                                >
                                    <Icon
                                        className={` transition-colors ${isActive
                                            ? "text-primary dark:text-secondary"
                                            : "text-gray-400 group-hover:text-primary dark:group-hover:text-secondary"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>
                <div className="border-t py-6 px-4 mx-2 flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={fullName} />
                        <AvatarFallback className="font-semibold text-sm text-primary">
                            {getInitials(user?.user_metadata?.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-black font-bold">
                            {user?.user_metadata?.email
                                ? user.user_metadata.email.slice(0, 5).replace(/^./, (c: string) => c.toUpperCase())
                                : 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user?.user_metadata?.email}</p>
                    </div>
                </div>
            </motion.aside>
            {/* Mobile Overlay */}
            {!isDesktop && isSidebarOpen && (
                <motion.div
                    variants={overlayVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className={`flex-1 w-full flex flex-col h-full overflow-hidden relative transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
                }`}>
                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-30 dark:bg-[#1E1E2C]/80 flex items-center justify-between px-6 z-10 sticky top-0"
                >
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className=" p-2 text-text-primary md:hidden hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu />
                        </motion.button>
                        <div>
                            <h1 className=" font-semibold text-text-strong text-2xl md:mb-4 dark:text-white">
                                Rewards Hub
                            </h1>
                            <p className="hidden md:block">Earn points, unlock rewards, and celebrate your progress!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 text-text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Bell className="w-6 h-6" />
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1E1E2C]"
                            />
                        </motion.button>

                    </div>
                </motion.header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">{children}</div>
            </main>
        </div>
    );
}
