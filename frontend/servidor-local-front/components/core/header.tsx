import Link from "next/link"


export const Header = () => {
    return (
        <div className="w-full h-full flex p-3 bg-white rounded-b-md gap-3 whitespace-nowrap">
            <h1 className="text-2xl font-bold text-[#13a4ec] items-center justify-center pt-[10px]">Azure Meridian</h1>
            <div className="flex items-center gap-10">
                <Link href="" className="font-semibold text-gray-500 hover:text-[#13a4ec]">Find Pros</Link>
                <Link href="/home" className="font-semibold text-[#13a4ec] border-b-2 border-[#13a4ec]">Services</Link>
                <Link href="" className="font-semibold text-gray-500 hover:text-[#13a4ec]">Projects</Link>
                <Link href="" className="font-semibold text-gray-500 hover:text-[#13a4ec]">Suport</Link>
            </div>
            <div className="flex items-center justify-end w-full h-[60px] gap-3">
                <div>
                    <input
                        type="text"
                        placeholder="🔍 Search Services..."
                        className="border border-gray-300 rounded-full px-4 py-2 focus:ring-0 bg-transparent text-gray-500"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Link href="" className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg></Link>
                    <Link href="" className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001"/><circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/></svg></Link>
                </div>
            </div>
        </div>
    )
}