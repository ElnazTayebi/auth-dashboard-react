import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { signUpSchema, type SignUpFormData } from "@/schemas/auth.shema";

import InputField from "@/components/widgets/InputField";
import FormButton from "@/components/widgets/FormButton";
import { useRegister } from "@/hooks/auth/useRegister";
import AuthCard from "../widgets/AuthCard";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const registerMutation = useRegister();
  const errorMsg = registerMutation.error?.message;

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data, {});
  });

  return (
    <form onSubmit={onSubmit}>
      <AuthCard title="Sign Up">
        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
            {errorMsg}
          </div>
        )}

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

        <FormButton isLoading={registerMutation.isPending}>
          {registerMutation.isPending ? "Creating account..." : "Sign Up"}
        </FormButton>
        <Link to="/" className="text-blue-500 text-sm">
          Already have an account? Sign in
        </Link>
      </AuthCard>
    </form>
  );
};
export default RegisterForm;
