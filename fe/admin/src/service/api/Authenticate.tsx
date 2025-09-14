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