import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {login as loginApi} from "../../services/apiAuth"
import toast from "react-hot-toast";

// useLogin.js from features
export function useLogin(){
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate:login,isLoading} = useMutation({
        mutationFn:({email,password})=>loginApi({email,password}),
        onSuccess:(user)=>{
            // update the information about the user
            queryClient.setQueryData(['user'],user.user)
            navigate('/dashboard')
        },
        onError:(err)=>{
            console.log("Error",err)
            toast.error("Provided email or password are incorrect")
        }
    })
    return {login,isLoading}
}