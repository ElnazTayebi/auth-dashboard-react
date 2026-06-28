import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useLogin";
import { loginSchema, type LoginFormData } from "@/schemas/auth.shema";

import InputField from "@/components/widgets/InputField";
import FormButton from "@/components/widgets/FormButton";
import AuthCard from "../widgets/AuthCard";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const errorMsg = loginMutation.error?.message;
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <AuthCard title="Sin in">
        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
            {errorMsg}
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
        <FormButton isLoading={loginMutation.isPending}>
          {loginMutation.isPending ? "Loggin in..." : "Login"}
        </FormButton>
        <Link to="/register" className="text-blue-500 text-sm">
          Don't have an account? Sign up
        </Link>
      </AuthCard>
    </form>
  );
};
export default LoginForm;
