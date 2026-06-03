import Link from "next/link";
import { Card } from "../ui/card";
import { Briefcase, LayoutDashboardIcon, Settings, Users } from "lucide-react";

export function Sidebar() {
    return (
        < aside className="w-64 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col" >
            <div className="p-4 flex flex-col items-start mb-4 rounded-xl ">
                <h1 className="font-semibold">
                    Service Categories
                </h1>
            </div>

            <Card className="flex-1 p-4 space-y-1 m-2">
                <button className="flex items-center w-full p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium">
                    <LayoutDashboardIcon size={20} className="mr-3" />
                    Dashboard
                </button>
                <button className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                    <Briefcase size={20} className="mr-3" />
                    Serviços
                </button>
                <button className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                    <Users size={20} className="mr-3" />
                    Clientes
                </button>
                <button className="flex items-center w-full p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                    <Settings size={20} className="mr-3" />
                    Configurações
                </button>
            </Card>
        </aside >


    );
}