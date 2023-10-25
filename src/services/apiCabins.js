import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(cabin) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data ,error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
  }

  const {error : storageError} = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

    if(storageError){
      await supabase.from("cabins").delete().eq("id", data.id)
      throw new Error("Cabin image could not be uploaded")
    }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Deleted");
  }
}

/* ************************************* Mongo DB  ********************************* */

// export async function getAllCabins(){
//   const res = await fetch("http://localhost:3000/cabins")
//   const data = await res.json()
//   return data
// }
