import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLogin } from "@/hooks/auth/useLogin";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";

import InputField from "@/components/widgets/InputField";
import FormButton from "@/components/widgets/FormButton";
import AuthCard from "../widgets/AuthCard";
import Squares from "../animations/Squares";

const LoginForm = () => {
    const navigate = useNavigate();
    const {mutate: loginUser, isPending, error, isError} = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

/*   const loginMutation = useLogin(); */
  /* const errorMsg = loginMutation.error?.message; */

  const onSubmit = handleSubmit((data) => {
   loginUser(data, {
      onSuccess: () => {
        navigate({ to: "/" });
      },
    });
  });

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <AuthCard title="Sign in">
            {isError && (
              <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
                {error?.message || "Invalid credentials. Please try again."}
              </div>
            )}

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
              isLoading={isPending}
              loadingText="Signing in..."
            >
              Sign in
            </FormButton>

            <Link
              to="/register"
              className="text-blue-500 text-sm mt-2 block text-center"
            >
              Don't have an account? Sign up
            </Link>
          </AuthCard>
        </form>
      </div>

      <div className="hidden md:block relative w-full h-full bg-slate-950 overflow-hidden border-l border-border">
        <div className="absolute inset-0 w-full h-full">
          <Squares
            direction="diagonal"
            speed={0.3}
            squareSize={45}
            borderColor="rgba(255, 255, 255, 0.05)"
            hoverColor="rgba(59, 130, 246, 0.2)"
          />
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
