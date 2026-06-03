import Image from "next/image"

export default function Sidebar() {
    return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r border-gray-200 p-6">

        <div className="flex items-center mb-10">
            <Image
                src=""
                alt="Avatar"
                className="w-11 h-11 rounded-lg object-cover bg-gray-200"
            />
            <div className="ml-3">
                <h3 className="text-sm font-bold text-gray-800 leading-none">Bob's Handyman</h3>
                <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Service Provider</p>
            </div>
        </div>

        <nav className="flex-1 space-y-1">

            <a href="#" className="flex items-center px-3 py-2 text-sm font-semibold text-blue-500 bg-blue-50 rounded-lg group">
                <span className="mr-3 text-lg text-blue-500">📊</span>
                Dashboard
            </a>

            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-lg">👤</span>
                Profile
            </a>

            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-lg">📅</span>
                Calendar
            </a>

            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-lg">📄</span>
                <span className="flex-1 text-left">Quotations</span>
            </a>

        </nav>

        <div className="pt-4 border-t border-gray-100">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-lg">⚙️</span>
                Settings
            </a>
        </div>

    </aside>
)}