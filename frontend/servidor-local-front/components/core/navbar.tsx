import { BellIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
       <nav className="stricky top-0 z-10 w-full bg-white sadow-sm ">
         <div className="flex justify-between items-center  h-16 px-6">
           <div className="flex items-center  gap-10">
             <h1 className="flex gap-10 font-semibold text-[#37B4FD] ">
               Azure Meridian </h1>

             <div className="flex gap-10  text-gray-600 "> 
               <Link className="" href="/home">Home</Link>
               <Link href="/budget">Budget</Link>
               <Link href="#">Projects</Link>
             </div>
           </div>

          <div>
            {children}
          </div>
        </div>
      </nav>
    );
}