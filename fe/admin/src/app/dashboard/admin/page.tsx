"use client"
import ListUserAdmin from "@/components/Account/Admin/ListUserAdmin"
import Layout from "@/components/Layout"

const ListUserAdminPage=()=>{
    return(
        <Layout title="Danh sách tài khoản quản trị">
                <ListUserAdmin/>
        </Layout>
    )
}
export default ListUserAdminPage