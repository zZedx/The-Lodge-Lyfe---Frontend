export async function throwError(res){
    const data = await res.json()
    throw new Error(data.message)
}