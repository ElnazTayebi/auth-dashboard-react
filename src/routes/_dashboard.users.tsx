import UserPage from "#/pages/dashboard/user/UserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_dashboard/users')({
  component: UserPage,
})