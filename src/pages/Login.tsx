import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
/* import { Button } from "@/components/ui/button"; */
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

import InputField from "@/components/widgets/InputField";
import FormButton from "@/components/widgets/FormButton";

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
  const [errorMsg, setErrorMsg] = useState<string>("");

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
        throw new Error("Invalid username or password");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setErrorMsg("");
      localStorage.setItem("token", data.token);
    },

    onError: (error) => {
      setErrorMsg(error.message);
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
        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {errorMsg}
          </div>
        )}
        <h6 className="text-lg font-semibold text-center">Sign In</h6>

        <InputField
          label="Username"
          name="username"
          register={register}
          error={errors.username}
          placeholder="Enter username"
          isRequired
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Enter password"
          isRequired
          hasToggle
        />
        <FormButton
          isLoading={mutation.isPending}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loggin in..." : "Login"}
        </FormButton>
        <Link to="/register" className="text-blue-500 text-sm">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
};
export default Login;
