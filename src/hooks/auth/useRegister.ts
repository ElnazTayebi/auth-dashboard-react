import type { SignUpFormData } from "@/schemas/auth.shema";
import { checkUserExist, registerUser } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export function useRegister() {
     const navigate = useNavigate();
    return useMutation({
        mutationFn: async(data:SignUpFormData) => {
            const exict = await checkUserExist(data.username);

            if (exict){
                throw new Error("User already exist")
            }
            return registerUser(data)
        },
         onSuccess: (res) => {
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
         },
    })
}