import DashboardPage from '@/pages/dashboard/DashboardPage'
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/')({
  component: DashboardPage,
})