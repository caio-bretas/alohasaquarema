import {
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface Props {
  participants: any[]
}

export function StatsSummary({
  participants,
}: Props) {

  const total =
    participants.length

  const checked =
    participants.filter(
      (p) => p.checkin
    ).length

  const pending =
    participants.filter(
      (p) =>
        !p.checkin
    ).length

  const stats = [
    {
      label:
        "Total",
      value: total,
      icon: Users,
    },

    {
      label:
        "Check-in",
      value: checked,
      icon:
        CheckCircle2,
    },

    {
      label:
        "Pendentes",
      value: pending,
      icon: Clock,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">

      {stats.map((s) => (

        <div
          key={s.label}
          className="bg-white border p-4 rounded-2xl"
        >

          <s.icon className="size-4 mb-2" />

          <p className="text-xs">
            {s.label}
          </p>

          <p className="text-2xl font-black">
            {s.value}
          </p>

        </div>
      ))}

    </div>
  )
}