"use client";

import { ReactNode, useState, cloneElement, isValidElement, ReactElement, useEffect } from "react";
import SideBar from "./SideBar";
import { AlertModal } from "./AlertModal";
import { OpenModalFn } from "@/type/modal";


interface LayoutProps {
    title: string;
    children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProps, setModalProps] = useState({
        title: "",
        description: "",
        type: "info" as "success" | "error" | "warning" | "info",
        autoClose: 0,
    });

    // Hàm mở modal có type rõ ràng
    const openModal: OpenModalFn = (
        title,
        description,
        type = "info",
        autoClose = 4000
    ) => {
        setModalProps({ title, description, type, autoClose });
        setModalOpen(true);
    };
    useEffect(() => {
        const stored = sessionStorage.getItem("notification");
        if (stored) {
            const { title, message, type } = JSON.parse(stored);
            openModal(title, message, type, 3000);
            sessionStorage.removeItem("notification");
        }
    }, []);
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <SideBar />

            {/* Nội dung chính */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 bg-[#131722] flex items-center justify-between px-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                        ADD ITEM
                    </button>
                </header>

                {/* Children + truyền openModal */}
                <main className="flex-1 p-6 overflow-y-auto bg-[#131720]">
                    {isValidElement(children)
                        ? cloneElement(children as ReactElement<any>, { openModal })
                        : children}
                </main>
            </div>

            {/* Modal */}
            <AlertModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                title={modalProps.title}
                description={modalProps.description}
                type={modalProps.type}
                autoClose={modalProps.autoClose}
            />
        </div>
    );
};

export default Layout;
