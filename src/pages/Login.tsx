import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(6, "Password musst be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-sm bg-white p-6 rounded space-y-4">
        <h6 className="text-lg font-semibold text-center">Sign In</h6>
        <div className="space-y-1">
          <label className="text-sm font-medium">Username</label>
          <Input
            type="text"
            placeholder="Enter username"
            {...register("username")}
            className={errors.username && "border-red-500"}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className={errors.password && "border-red-500"}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          login
        </Button>
        <Link to="/register">You dont have an account please klick hier</Link>
      </div>
    </form>
  );
};
export default Login;
