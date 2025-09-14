"use client";

import { register } from "@/service/api/Authenticate";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface AdminFormData {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    idRole: number;
}

const AddUserAdmin = ({
    openModal,
}: {
    openModal?: (
        title: string,
        desc: string,
        type?: "success" | "error" | "warning" | "info",
        autoClose?: number
    ) => void;
}) => {
    const [formData, setFormData] = useState<AdminFormData>({
        fullName: "",
        email: "",
        phone: "",
        gender: "MALE",
        birthday: "",
        idRole: 3,
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            sessionStorage.setItem(
                "notification",
                JSON.stringify({
                  title: "Tạo tài khoản",
                  message: response.data.message,
                  type: "success",
                })
              );
    
              window.location.reload();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                openModal?.(
                    "Tạo tài khoản",
                    err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
                    "error"
                );
            } else {
                openModal?.(
                    "Tạo tài khoản",
                    "Lỗi không xác định, vui lòng thử lại.",
                    "error"
                );
            }
        } finally {
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                gender: "MALE",
                birthday: "",
                idRole: 3,
            })
        }
    };

    const inputClass =
        "w-full bg-[#151f30] rounded-[16px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500";

    return (
        <div className="text-white p-6">
            <div className="mx-auto">
                <div className="bg-[#131720] rounded-lg p-8 shadow-xl border border-solid border-[#2f80ed1a]">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Avatar */}
                        <div className="flex flex-col items-center col-span-1">
                            <input type="file" id="avatar" className="hidden" />
                            <label
                                htmlFor="avatar"
                                className="relative w-full aspect-[3/4] bg-[#151f30] rounded-[16px] cursor-pointer overflow-hidden group"
                            >
                                <span className="flex h-full w-full items-center justify-center text-gray-300 text-2xl font-bold leading-none transition duration-500 group-hover:text-white">
                                    +
                                </span>
                                <span className="absolute inset-0 bg-[#243652] opacity-0 transition-opacity duration-500 group-hover:opacity-60 rounded-[16px]" />
                            </label>
                        </div>

                        {/* Fields */}
                        <div className="col-span-2 space-y-5">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={inputClass}
                                placeholder="Nhập họ và tên"
                                required
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className={inputClass}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                            </select>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={inputClass}
                                placeholder="admin@example.com"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={inputClass}
                                placeholder="0123456789"
                            />
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleInputChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="col-span-3 flex space-x-4">
                            <button
                                type="submit"
                                className="bg-[#2f80ed] hover:bg-white text-white hover:text-black py-3 px-6 rounded-[16px] font-semibold transition"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserAdmin;
