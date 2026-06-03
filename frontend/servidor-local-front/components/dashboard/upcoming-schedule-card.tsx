"use client"
import AppointmentItem from "./appointment-item"
import { Calendar } from "../ui/calendar"
import { useState } from "react"
import { useDashboardData } from "./dashboard-data-provider"

export default function UpcomingScheduleCard() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const { proposals } = useDashboardData()
    const upcomingItems = proposals.slice(0, 2)
  return (
    <div className="w-[320px] rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        Upcoming Schedule
      </h2>

      <div className="w-full">
        <Calendar className="w-full "selected={date} onSelect={setDate} mode="single" />
      </div>

      <div className="mt-6">
        <p className="mb-4 font-medium text-gray-700">
          {date?.toDateString()}
        </p>

        <div className="space-y-3">
          {upcomingItems.length === 0 && (
            <p className="text-sm text-gray-500">Sem agendamentos/propostas para mostrar.</p>
          )}
          {upcomingItems.map((item, index) => (
            <AppointmentItem
              key={item.id}
              time={index === 0 ? "09:00 AM" : "01:30 PM"}
              title={`Proposta #${item.id}`}
              address={`Estado: ${item.estado}`}
            />
          ))}
        </div>
      </div>

      <button className="mt-6 w-full rounded-lg bg-sky-500 py-3 text-sm font-medium text-white">
        Manage Calendar
      </button>
    </div>
  )
}
