"use client"

import {
  MoreHorizontal,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface Participant {
  id: string
  name: string
  email: string | null
  ticket: string
  batch: string
  status: string
  checkin: boolean
}

interface Props {
  participants: Participant[]
}

export function ParticipantsTable({
  participants,
}: Props) {
  return (
    <div className="space-y-4">

      <div className="hidden md:block bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Participante
              </th>

              <th className="p-4 text-left">
                Ingresso
              </th>

              <th className="p-4 text-left">
                Pagamento
              </th>

              <th className="p-4 text-left">
                Check-in
              </th>

              <th className="p-4" />

            </tr>

          </thead>

          <tbody>

            {participants.map(
              (p) => (

                <tr
                  key={p.id}
                  className="border-b"
                >

                  <td className="p-4">

                    <p className="font-bold">
                      {p.name}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {p.email}
                    </p>

                  </td>

                  <td className="p-4">

                    <p className="font-bold">
                      {p.ticket}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {p.batch}
                    </p>

                  </td>

                  <td className="p-4">

                    <span>
                      {p.status}
                    </span>

                  </td>

                  <td className="p-4">

                    {p.checkin ? (
                      <CheckCircle2 className="text-emerald-600 size-4" />
                    ) : (
                      <Clock className="text-zinc-400 size-4" />
                    )}

                  </td>

                  <td className="p-4">

                    <button>
                      <MoreHorizontal className="size-4" />
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}