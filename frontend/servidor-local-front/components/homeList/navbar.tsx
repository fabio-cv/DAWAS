import { Bell, Search, User } from "lucide-react";

export const Navbar = () => {
    return (
        <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-10">
                    <h1 className="text-2xl font-bold text-sky-600">
                        Azure Meridian
                    </h1>

                    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
                        <a href="#">Find Pros</a>
                        <a href="#" className="text-sky-600">
                            Services
                        </a>
                        <a href="#">Projects</a>
                        <a href="#">Support</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
                        <Search className="w-4 h-4 text-gray-400" />

                        <input
                            type="text" 
                            placeholder="Search services..."
                            className="bg-transparent outline-none text-sm ml-2 w-full"
                        />
                    </div>

                    <Bell className="w-5 h-5 text-gray-500" />
                    <User className="w-5 h-5 text-gray-500" />
                </div>
            </div>
        </header>
    );
};