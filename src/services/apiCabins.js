import supabase from "./supabase"
import { supabaseUrl } from "./supabase"
export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
  if (error) {
    throw new Error("Cabins could not be fetched")
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.log(error)
    throw new Error("Cabin could not be deleted")
  }
  return data;
}

export async function createEditCabin(newCabin,id) {
  console.log(supabaseUrl)
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
  const imagePath = hasImagePath?newCabin.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins');
  console.log(newCabin.image)
  console.log(id)
  if(!id){
    console.log("1")
    query = query
    .insert([{...newCabin,image:imagePath}])
  }
  
  if(id){
    console.log("2")
    query = query.update([{...newCabin, image: imagePath}])
  .eq("id",id)
  }

  const { data, error } = await query.select().single();
  if (error) {
      console.log(error)
      throw new Error("Cabin could not be deleted")
  }

  if(hasImagePath) return data;

  const { error:storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName,newCabin.image)

  if(storageError){
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id)
    throw new Error("Cabin image couldn't be uploaded")
  }
  return data;
}