import { Star } from "lucide-react";

export const RatingFilter = () => {
    return (
        <div className="bg-white rounded-2xl border p-5">
            <h2 className="font-semibold text-gray-700 mb-5">
                Rating
            </h2>

            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600 transition"
                    >
                        <div className="flex">
                            {Array.from({ length: rating }).map((_, index) => (
                                <Star
                                    key={index}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>

                        <span>& Up</span>
                    </button>
                ))}
            </div>
        </div>
    );
};