import type { User } from "#/types/user";
import type { SignUpFormData } from "@/schemas/auth.schema";
import { checkUserExist, registerUser } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";


export function useRegister() {
     const navigate = useNavigate();
    return useMutation({
        mutationFn: async(data:SignUpFormData): Promise<User> => {
            const isExist = await checkUserExist(data.username);

            if (isExist){
                throw new Error("User already exist")
            }
            return registerUser(data)
        },
         onSuccess: (res) => {
        localStorage.setItem("user", JSON.stringify(res));
        navigate({to:"/"});
         },
    })
}