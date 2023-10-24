import supabase from "./supabase";

export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
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
