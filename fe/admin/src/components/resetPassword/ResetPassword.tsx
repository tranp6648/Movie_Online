"use client"
import { resetPasswordforLogin, validateToken } from "@/service/api/Authenticate";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlertModal, AlertType } from "../AlertModal";

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validToken, setValidToken] = useState<boolean | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalCfg, setModalCfg] = useState<{
        type: AlertType;
        title: string;
        description?: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const checkToken = async () => {
        try {
            const res = await validateToken(token as string);
            if (res.status === 200) {
                setValidToken(true)
            } else {
                setValidToken(false)
            }
        } catch (err) {
            setValidToken(false)
        }
    }
    useEffect(() => {
        if (error) {
            setModalCfg({
                type: "error",
                title: "Lỗi",
                description: error
            });
            setModalOpen(true)
        }
    }, [error])
    useEffect(() => {
        if (success) {
            setModalCfg({
                type: "success",
                title: "Thành công",
                description: success,
            });
            setModalOpen(true);
        }
    }, [success]);
    useEffect(() => {
        if (!token) {
            setValidToken(false);
            return;
        }
        checkToken();
    }, [token])
    const handleModalOpenChange = (open: boolean) => {
        setModalOpen(open)
        if (!open && modalCfg?.type === 'success') {
            router.push('/dashboard')
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resetPasswordDTO = {
                newPassword: password,
                confirmPassword: confirmPassword
            }
            const response = await resetPasswordforLogin(token as string, resetPasswordDTO);
            if (response.status === 200) {
                setSuccess(response.data.message);
            }
           
        } catch (err: any) {

            if (axios.isAxiosError(err)) {
                // err là lỗi từ axios, có thể truy cập err.response
                setError(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
            } else {
                // err là loại khác (string, Error,...)
                setError("Lỗi không xác định, vui lòng thử lại.");
            }
        }
    }
    if (validToken == null) {
        return <p className="text-center text-white">Đang kiểm tra liên kết...</p>;
    }
    if (!validToken) {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-[url('https://flixtv.volkovdesign.com/admin/img/bg.jpg')] bg-cover bg-center">
                <div className="relative z-10 w-full max-w-md bg-[#131720] rounded-2xl p-8 shadow-lg text-white border border-[#151f30] border-solid text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">
                        Liên kết không hợp lệ
                    </h1>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Đường dẫn này đã hết hạn hoặc không còn hiệu lực.
                        Vui lòng yêu cầu đặt lại mật khẩu mới hoặc liên hệ quản trị viên để được hỗ trợ.
                    </p>
                    <button
                        onClick={() => router.push("/forgot-password")}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition"
                    >
                        YÊU CẦU LẠI
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-3 w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 font-semibold transition"
                    >
                        QUAY VỀ TRANG CHỦ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[url('https://flixtv.volkovdesign.com/admin/img/bg.jpg')] bg-cover bg-center">
            <div className="relative z-10 w-full max-w-sm bg-[#131720] rounded-2xl p-8 shadow-lg text-white border border-[#151f30] border-solid">
                <h1 className="text-2xl font-bold text-center mb-6">
                    FLIX <span className="text-blue-500">TV</span>
                </h1>
                <form
                    className="mt-6 space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition"
                    >
                        ĐẶT LẠI MẬT KHẨU
                    </button>
                </form>
            </div>
            <AlertModal
                open={modalOpen}
                onOpenChange={handleModalOpenChange}
                type={modalCfg?.type ?? "info"}
                title={modalCfg?.title ?? ""}
                description={modalCfg?.description}
                closable
                autoClose={modalCfg?.type === "success" ? 1600 : undefined}
                primaryAction={{
                    label: "OK",
                    autoFocus: true,
                }}
            />
        </div>
    )
}
export default ResetPassword;