type Props = {
  time: string
  title: string
  address: string
}

export default function AppointmentItem({
  time,
  title,
  address,
}: Props) {
  return (
    <div className="flex gap-3 rounded-xl bg-gray-50 p-3">
      <div className="w-16 text-sm font-semibold text-gray-700">
        {time}
      </div>

      <div className="border-l border-cyan-400 pl-3">
        <h3 className="font-medium text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {address}
        </p>
      </div>
    </div>
  )
}
