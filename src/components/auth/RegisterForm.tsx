import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { signUpSchema, type SignUpFormData } from "@/schemas/auth.schema";

import InputField from "@/components/widgets/InputField";
import FormButton from "@/components/widgets/FormButton";
import { useRegister } from "@/hooks/auth/useRegister";
import AuthCard from "../widgets/AuthCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUserExist } from "@/services/auth.service";

const RegisterForm = () => {
  const [usernameToCheck, setUsernameToCheck] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const registerMutation = useRegister();
  const { data: isUsernameTaken, isFetching: isCheckingUsername } = useQuery({
    queryKey: ["checkUsername", usernameToCheck],
    queryFn: () => checkUserExist(usernameToCheck),
    enabled: usernameToCheck.length > 3,
    staleTime: 60 * 1000,
  });
  const errorMsg = registerMutation.error?.message;

  const onSubmit = handleSubmit((data) => {
    if (isUsernameTaken) return;
    registerMutation.mutate(data, {});
  });

  return (
    <form onSubmit={onSubmit}>
      <AuthCard title="Sign Up">
        {registerMutation.isError && (
          <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
            {errorMsg}
          </div>
        )}

        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          placeholder="email@email.com"
          isRequired
        />

        <InputField
          label="Username"
          name="username"
          register={register}
          error={errors.username}
          placeholder="Enter username"
          isRequired
          onBlur={(e) => {
            setUsernameToCheck(e.target.value.trim());
          }}
        />
        {isCheckingUsername && (
          <p className="text-xs text-gray-400 mt-1">
            Checking username availability...
          </p>
        )}
        {!isCheckingUsername && isUsernameTaken && (
          <p className="text-xs text-red-500 mt-1">
            This username is already taken!
          </p>
        )}
        {!isCheckingUsername &&
          isUsernameTaken === false &&
          usernameToCheck.length > 3 && (
            <p className="text-xs text-green-600 mt-1">
              Username is available! ✨
            </p>
          )}
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
          isLoading={registerMutation.isPending}
          disabled={
            isUsernameTaken || isCheckingUsername || registerMutation.isPending
          }
        >
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
