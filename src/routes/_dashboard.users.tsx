import UserPage from "#/pages/dashboard/user/UserPage";
import { usersSearchSchema } from "#/schemas/auth.schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_dashboard/users')({
  component: UserPage,
  validateSearch: (search) => {
    const result = usersSearchSchema.safeParse(search);
    return { page: result.success ? result.data.page || 1 : 1 };
  }
})