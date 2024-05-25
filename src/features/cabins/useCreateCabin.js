import {useMutation,useQueryClient } from "@tanstack/react-query"
import {createEditCabin } from "../../services/apiCabins";
import {toast} from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const {isPending:isCreating,mutate:createCabin,reset}=useMutation({
    mutationFn:createEditCabin,
    onSuccess:()=>{
      toast.success("Cabin created!");
      queryClient.invalidateQueries({queryKey:["cabins"]});
      reset();
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  });
  return {isCreating,createCabin}
}
