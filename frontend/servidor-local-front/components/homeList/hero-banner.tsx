export const HeroBanner = () => {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-900 to-cyan-600 p-8 h-48 flex items-center">
            <div className="max-w-md text-white space-y-3 z-10">
                <h2 className="text-3xl font-bold">
                    HandyPro Services
                </h2>

                <p className="text-sm text-sky-100 leading-relaxed">
                    Expert assistance for every corner of your home.
                    Trusted professionals, guaranteed quality.
                </p>
            </div>

            <div className="absolute right-0 bottom-0 opacity-20 text-[240px] font-black text-white">
                🔧
            </div>
        </section>
    );
};