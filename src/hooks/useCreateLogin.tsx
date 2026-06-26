/* import type { useMutation } from "@tanstack/react-query"

function useCreateLogin() {
const {mutate} = useMutation ({
    mutationFn: (data: FormData) => {
        const res = await fetch('https://dummyjson.com/auth/login', {
            headers: {
                "Content-Type": "application/json",
            }
        })

    }
})
return {mutate}
}
export default useCreateLogin */