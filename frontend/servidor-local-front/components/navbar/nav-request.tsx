import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import BellIcon from "@/assets/icons/bell-icon";
import NavLinks from "./nav-links";


export default function NaveBar() {

    return (

        <header className="h-16 rounded-2xl bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shadow-sm">
            {/* Lado Esquerdo: Logo */}
            <div className="text-blue-500 mx-2">
                <BellIcon />
            </div>

            <div className="flex items-center gap-4 min-w-[200px]">
                <h1 className="text-xl font-bold  dark:text-white hidden sm:block text-blue-500">
                    HandyConnect</h1>
            </div>

            {/* Drawer para mobile */}
            <Drawer direction="right">
                <DrawerTrigger asChild className="md:hidden ">
                    <Button variant="outline"></Button>
                </DrawerTrigger>

                <DrawerContent className="p-4  max-w-xs text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <nav className="flex flex-col gap-6">
                        <NavLinks />
                    </nav>
                </DrawerContent>
            </Drawer>

            {/* Centro: Pesquisa e Links */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center px-4">
                <nav className="flex items-center gap-6 whitespace-nowrap">
                    <NavLinks />
                </nav>
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar serviços..."
                        className="w-full bg-slate-100 dark:bg-slate-800  rounded-[10px] border-1 border-gray-200 dark:border-gray-800 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Lado Direito: Perfil e Notificações */}
            <div className="flex items-center gap-4 min-w-[120px] justify-end">

                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                    <BellIcon />
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                    ?
                </button>
                <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-slate-800">
                    SD
                </div>
            </div>
        </header>

    )
}
