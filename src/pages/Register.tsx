import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import * as z from "zod";
import { useState } from "react";
import InputField from "@/components/widgets/InputField";

const signUpSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(6, "Password musst be at least 6 characters"),
  email: z.email("Invalid email"),
});

type formData = z.infer<typeof signUpSchema>;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(signUpSchema),
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  const checkUserExist = async (email: string) => {
    const res = await fetch(`https://dummyjson.com/users/search?q=${email}`);
    const data = await res.json();
    return data.users.length > 0;
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: formData) => {
      const exist = await checkUserExist(data.username);

      if (exist) {
        throw new Error("User already exist");
      }
      const res = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Register failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    },

    onError: (error) => {
      setErrorMsg(error.message);
    },
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
        <h6 className="text-lg font-semibold text-center">Sign Up</h6>
        <div className="space-y-1">
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            placeholder="email@email.com"
            isRequired
          />
        </div>
    
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
        

        <Button type="submit" className="w-full mt-4">
          Sign Up
        </Button>
        <Link to="/" className="text-blue-500 text-sm">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
};
export default Register;
