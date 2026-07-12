import { useState } from "react";
import { useUsers } from "@/hooks/useUser";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FormButton from "@/components/widgets/FormButton";

const UserPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  
  const { data, isLoading, error, isFetching } = useUsers(page);

  
  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading users</p>;

  const totalPages = Math.ceil((data?.total || 0) / limit);
  const hasNextPage = page < totalPages;

  return (
    <div className="w-full p-4 flex justify-center">

      <div className={`w-full max-w-6xl border border-border rounded-lg bg-card overflow-hidden flex flex-col transition-opacity duration-200 ${isFetching ? "opacity-75" : "opacity-100"}`}>
        

        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-150 table-fixed min-h-120">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="w-25">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className="truncate">{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        
        <div className="flex w-full items-center justify-between p-4 border-t border-border bg-card">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
         
            {isFetching && <span className="text-xs text-blue-500 animate-pulse">(Updating...)</span>}
          </div>

          <div className="flex items-center gap-2">
            <FormButton
              variant="outline"
              size="sm"
              fullWidth={false}
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1 || isFetching} 
            >
              Previous
            </FormButton>

            <FormButton
              variant="outline"
              size="sm"
              fullWidth={false}
              onClick={() => {
                if (hasNextPage) setPage((old) => old + 1);
              }}
              disabled={!hasNextPage || totalPages <= 1 || isFetching}
            >
              Next
            </FormButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPage;