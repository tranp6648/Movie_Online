import { GetAllOptions } from "@/type/GetAllOption";
import Http from "../http/http"

export const createGenre=async(name:string)=>{
    const response= await Http.post(
        "/api/genre/create",
        {name}
    )
    return response.data;
}
export const getById=async(id:number)=>{
  const response=await Http.get(
    `/api/genre/findById/${id}`,
    {skipAuth:true,withCredentials:true}
  );
  return response.data;
}
export const updateGenre=async(id:number,genre:any)=>{
  const response=await Http.put(
    `/api/genre/update/${id}`,genre
  )
  return response.data
}
export const getAll=async(options:GetAllOptions={})=>{
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
      } = options;
      const res=await Http.get("/api/genre/getAll",{
        skipAuth:true,
        withCredentials:true,
        params:{page,size,sort,filter,searchField,searchValue,all},
        
      })
      return res.data;
}