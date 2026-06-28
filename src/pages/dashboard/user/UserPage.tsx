import { useUsers } from "@/hooks/useUser";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserPage = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>

              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.username}</TableCell>

              <TableCell>
                <button className="text-blue-500 hover:underline">View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPage;
