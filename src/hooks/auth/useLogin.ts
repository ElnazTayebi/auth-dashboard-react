import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("userImage", res.image);
      localStorage.setItem("userName", `${res.firstName} ${res.lastName}`);
    },
  });
}
