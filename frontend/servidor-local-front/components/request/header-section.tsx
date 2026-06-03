"use client"

import { Hammer, User } from "lucide-react"

export const HeaderSection = () => {
    return (
        <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">

            <div className="flex items-center gap-2">
                <Hammer className="text-[#1E73EA] w-7 h-7" />

                <span className="text-3xl font-bold text-[#0E1525]">
                    HandyPro
                </span>
            </div>

            <nav className="flex items-center gap-10">

                <span className="text-[#52607A] font-medium cursor-pointer">
                    Services
                </span>

                <span className="text-[#52607A] font-medium cursor-pointer">
                    Providers
                </span>

                <span className="text-[#52607A] font-medium cursor-pointer">
                    My Requests
                </span>

                <div className="border-2 border-[#1E73EA] rounded-full p-2">
                    <User className="text-[#52607A] w-6 h-6" />
                </div>
            </nav>
        </header>
    )
}