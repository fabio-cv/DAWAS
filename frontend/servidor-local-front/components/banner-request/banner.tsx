import CalendarIcon from "@/assets/icons/calendar";
import HourGlassIcon from "@/assets/icons/horglass-icon";
import TextIcon from "@/assets/icons/text-icon";
import Link from "next/link";

export default function BannerRequest() {
    return (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-end gap-4 py-4 mb-2">
                <div className="flex min-w-72 flex-col gap-2 py-4">
                    <h1 className="text-slate-900 dark:text-slate-300 text-4xl font-black leading-tight tracking-[-0.033em]">Request Status</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                        Track your service requests, review quotes, and manage bookings.
                    </p>
                </div>

                <Link href="/request/new-request" className="rounded-lg h-10 px-6 bg-blue-500 hover:bg-blue-600  
                text-white text-sm font-bold leading-normal tracking-[0.015em] 
                transition-colors shadow-sm gap-2 flex justify-center items-center cursor-pointer">
                    <span>+</span>
                    <span>New Request</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 mb-6 transition-colors">
                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 
                border border-slate-200 dark:border-slate-800 
                shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer 
                relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
                            Pending Quotes
                        </p>
                        <span className="text-orange-400 opacity-80">
                            <HourGlassIcon />
                        </span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
                        2
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Waiting for provider responses
                    </p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
                            Action Required
                        </p>
                        <span className="text-blue-500 opacity-80">
                            <TextIcon />
                        </span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">4</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Quotes ready for your review</p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
                            Active Bookings
                        </p>
                        <span className=" text-emerald-500 opacity-80">
                            <CalendarIcon />
                        </span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">1</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Scheduled and upcoming services</p>
                </div>
            </div>
        </div>
        
    )
}