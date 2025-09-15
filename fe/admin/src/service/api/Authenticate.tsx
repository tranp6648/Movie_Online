import { GetAllOptions } from "@/type/GetAllOption";
import Http from "../http/http"

export const login=async(username:string,password:string)=>{
    const response=await Http.post(
        "/api/account/login",
        {username,password},
        {skipAuth:true,withCredentials:true}
    )
    return response.data;
}
export const register=async(account:any)=>{
    return await Http.post("/api/account/register",account)
}
export const validateToken=async(token:string)=>{
    return await Http.get(`/api/account/validate-token?token=${token}`);
}
export const resetPasswordforLogin=async(token:string,resetPassword:any)=>{
    return await Http.post(`/api/account/reset-password-active-account?token=${token}`,resetPassword)
}
export const getAll=async(options:GetAllOptions={})=>{
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        search,
        all = false,
      } = options;
      const res=await Http.get("/api/account/getAll",{
        skipAuth:true,
        withCredentials:true,
        params:{page,size,sort,filter,search,all},
        
      })
      return res.data;
}