export default function MiniCalendar() {
  const days = [1, 2, 3, 4, 5, 6, 7]

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2 text-center">
        {days.map((day) => (
          <div
            key={day}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm
              ${
                day === 7
                  ? "bg-sky-500 text-white"
                  : "text-gray-700"
              }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}