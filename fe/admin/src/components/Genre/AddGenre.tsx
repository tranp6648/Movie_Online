"use client"

import { createGenre } from "@/service/api/Genre";
import { GenreFormData } from "@/type/Genre/GenreFormData";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const AddGenre = ({
    openModal
}: {
    openModal?: (
        title: string,
        desc: string,
        type?: "success" | "error" | "warning" | "info",
        autoClose?: number
    ) => void;
}) => {
    const [formData, setFormData] = useState<GenreFormData>({
        name: ""
    })
    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createGenre(formData.name);
            sessionStorage.setItem(
                "notification",
                JSON.stringify({
                    title: "Tạo thể loại",
                    message: response.message,
                    type: "success",
                })
            );
            window.location.reload();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                openModal?.(
                    "Tạo thể loại",
                    err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
                    "error"
                );
            } else {
                openModal?.(
                    "Tạo thể loại",
                    "Lỗi không xác định, vui lòng thử lại.",
                    "error"
                );
            }
        } finally {
            setFormData({
                name: ""
            })
        }
    }
    const inputClass =
        "w-full bg-[#151f30] rounded-[16px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500";

    return (
        <div className="text-white p-6">
            <div className="mx-auto">
                <div className="bg-[#131720] rounded-lg p-8 shadow-xl border border-solid border-[#2f80ed1a]">
                    <h2 className="text-2xl font-bold mb-6 text-left">
                        Tạo thể loại
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            name="name"
                            className={inputClass}
                            placeholder="Nhập tên thể loại"
                        />
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-[#2f80ed] hover:bg-white text-white hover:text-black py-3 px-6 rounded-[16px] font-semibold transition"
                            >
                                Lưu
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-[16px] font-semibold transition"
                            >
                                Trở về
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddGenre;