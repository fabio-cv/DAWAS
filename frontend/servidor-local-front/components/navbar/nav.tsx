"use client";
import Link from "next/link";

import { Input } from "../ui/input";
import UserRound from "@/assets/icons/user-icon";
import BellIcon from "@/assets/icons/bell-icon";
import SearchIcon from "@/assets/icons/search-icon";



export default function Nav() {
    return (
        <nav className="sticky top-0 z-10 w-full bg-white shadow-sm p-4">
            <div className="flex justify-between items-center h-16 px-6">
                <div className="flex items-center gap-10">
                    <span className="text-3xl font-semibold tracking-tight text-blue-500">Azure Meridian</span>

              
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block group">
                        <Input
                            className="w-64 h-12 pl-11 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                            placeholder="Search services..."
                            type="text" />
                    </div>

                    <div className="p-2 hover:bg-slate-50 rounded-full transition-all active:scale-95">
                        <Link href="#">
                            <BellIcon />
                        </Link>
                    </div>
                    <div className="p-2 hover:bg-slate-50 rounded-full transition-all active:scale-95">
                        <Link href="#">
                            <UserRound />
                        </Link>
                    </div>


                </div>
            </div>
        </nav>
    )
}