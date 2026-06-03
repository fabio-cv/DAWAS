


export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 p-6 hidden md:block ">
<div className="mt-12 flex items-center justify-between">
<p className="text-sm text-slate-500">Showing 6 of 42 services</p>
<div className="flex gap-2">
<button className="w-10 h-10 flex items-center justify-center bg-sky-600 text-white rounded-lg font-bold">1</button>
<button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">2</button>
<button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">3</button>

</div>
</div>


        </footer>
    );
}