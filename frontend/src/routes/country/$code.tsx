import CountryDetailsPage from '@/pages/CountryPage'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/country/$code')({
  component: RouteComponent,
})

function RouteComponent() {
  const { code } = Route.useParams()

  return <CountryDetailsPage code={code} />
}
