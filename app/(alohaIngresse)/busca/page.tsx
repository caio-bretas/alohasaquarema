import { getEventsAction } from "../actions/get-events"
import BuscaPage from "./_components/buscapage"



export default async function Page() {

  const { events } = await getEventsAction()

  return (
    <BuscaPage events={events} />
  )
}