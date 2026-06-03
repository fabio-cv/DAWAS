import { Brush, Hammer, Paintbrush, Plug, Wrench } from "lucide-react";
import { RatingFilter } from "../ui/ratingFilter";



const categories = [
    {
        name: "All Services",
        icon: Wrench,
        active: true,
    },
    {
        name: "Plumbing",
        icon: Wrench,
    },
    {
        name: "Electrical",
        icon: Plug,
    },
    {
        name: "Carpentry",
        icon: Hammer,
    },
    {
        name: "Painting",
        icon: Paintbrush,
    },
    {
        name: "HVAC",
        icon: Brush,
    },
];

export const Sidebar = () => {
    return (
        <aside className="hidden lg:block w-64 space-y-6">
            <div className="bg-white rounded-2xl border p-5">
                <h2 className="font-semibold text-gray-700 mb-5">
                    Service Categories
                </h2>

                <div className="space-y-4">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <button
                                key={category.name}
                                className={`flex items-center gap-3 text-sm font-medium transition w-full ${
                                    category.active
                                        ? "text-sky-600"
                                        : "text-gray-500 hover:text-sky-600"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <RatingFilter />
        </aside>
    );
};