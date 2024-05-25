import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import {useForm} from "react-hook-form"
import {useCreateCabin} from "./useCreateCabin";
import {useEditCabin} from "./useEditCabin";

function CreateCabinForm({cabinToEdit={}}) {
  const {id:editId,...editValues} = cabinToEdit;

  const isEditSession = Boolean(editId);

  const {isCreating,createCabin} = useCreateCabin();

  const {isEditing,editCabin} = useEditCabin();

  const {register,handleSubmit,getValues,formState:{errors},reset} = useForm({
    defaultValues:isEditSession?editValues:{}
  });

  

  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    console.log(data)
    const image = typeof data.image=== "string" ? data.image : data.image[0];
    if(isEditSession)editCabin({newCabinData:{...data,image},id:editId});
    else createCabin({...data,image},{onSuccess:(data)=>{
      reset()
    }})
    //  mutate({...data,image:data.image[0]});

  }

  function onError(errors){
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name",{
          required:"This field is required",
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input {...register("maxCapacity",{
          required:"This field is required",
        })} type="number" id="maxCapacity" />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input {...register("regularPrice",{
          required:"This field is required",
        })} type="number" id="regularPrice" />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input {...register("discount",{
          required:"This field is required",
          validate:(value)=> value <= getValues().regularPrice || "Discount must be less than regular price"
        })} type="number" id="discount" defaultValue={0} />
      </FormRow>

      <FormRow label="description">
        <Textarea type="number" id="description" defaultValue="" />
      </FormRow>

      <FormRow label="cabin photo">
        <FileInput id="image" accept="image/*" {...register("image",{
          required:isEditSession?false:"This field is required",
        })} />
      </FormRow>

      <FormRow>
        <Button disabled={isWorking} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession?'Edit cabin':"Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
