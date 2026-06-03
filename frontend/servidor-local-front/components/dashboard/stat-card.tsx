
type StatCardProps = {
    title: string
    value: string
    icon: React.ReactNode
}

export default function StatCard({
    title,
    value,
    icon,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-gray-100 bg-gray-100 p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <span>{icon}</span>
                <span>{title}</span>
            </div>

            <div className="text-xl font-bold text-gray-900">
                {value.includes("/hr") ?  (
                    <>
                    {value.split("/hr") [0]}
                    <span className="text-gray-400">/hr</span>
                    </>
                ) : (
                    value
                )}
            </div>
        </div>
    )
}