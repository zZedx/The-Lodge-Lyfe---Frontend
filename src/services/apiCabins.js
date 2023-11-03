import { throwError } from "../utils/throwError";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllCabins() {
  const res = await fetch(apiUrl + "/cabins");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return data;
}

export async function createCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.("https://res.cloudinary.com");
  const newCabin = new FormData();
  newCabin.append("image", cabin.image);
  newCabin.append("name", cabin.name);
  newCabin.append("maxCapacity", cabin.maxCapacity);
  newCabin.append("regularPrice", cabin.regularPrice);
  newCabin.append("discount", cabin.discount);
  newCabin.append("description", cabin.description);
  hasImagePath && newCabin.append("imageName", cabin.imageName);

  const res = await fetch(apiUrl + "/cabins/create", {
    method: "POST",
    credentials: "include",
    body: newCabin,
  });
  if (!res.ok) {
    await throwError(res);
  }
}

export async function deleteCabin(id) {
  const res = await fetch(apiUrl + "/cabins/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    await throwError(res);
  }
}

export async function editCabin(cabin) {
  const hasImagePath = cabin.image?.startsWith?.("https://res.cloudinary.com");
  const newCabin = new FormData();
  newCabin.append("image", hasImagePath ? cabin.image : cabin.image[0]);
  newCabin.append("name", cabin.name);
  newCabin.append("maxCapacity", cabin.maxCapacity);
  newCabin.append("regularPrice", cabin.regularPrice);
  newCabin.append("discount", cabin.discount);
  newCabin.append("description", cabin.description);
  newCabin.append("imageName", cabin.imageName);
  newCabin.append("_id", cabin._id);

  const res = await fetch(apiUrl + "/cabins/edit", {
    method: "PUT",
    body: newCabin,
    credentials: "include",
  });
  if (!res.ok) {
    await throwError(res);
  }
}