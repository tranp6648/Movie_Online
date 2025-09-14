"use client";
import { useEffect, useState } from "react";
import { AlertModal, AlertType } from "../AlertModal";
import { login } from "@/service/api/Authenticate";
import { saveTokens } from "@/util/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const [modalCfg, setModalCfg] = useState<{
    type: AlertType;
    title: string;
    description?: string;
  } | null>(null);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data.role === "ADMIN") {
        setSuccess("Đăng nhập thành công!");
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          accessTokenAt: response.data.accessTokenExpiryAt,
          refreshTokenAt: response.data.refreshTokenExpiryAt,
        })
      } else {
        setError("Bạn không có quyền truy cập hệ thống.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // err là lỗi từ axios, có thể truy cập err.response
        setError(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } else {
        // err là loại khác (string, Error,...)
        setError("Lỗi không xác định, vui lòng thử lại.");
    }
    }
  };
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
  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open)
    if (!open && modalCfg?.type === 'success') {
      router.push('/dashboard')
    }
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('https://flixtv.volkovdesign.com/admin/img/bg.jpg')] bg-cover bg-center">
      <div className="relative z-10 w-full max-w-sm bg-[#131720] rounded-2xl p-8 shadow-lg text-white border border-[#151f30] border-solid">
        <h1 className="text-2xl font-bold text-center mb-6">
          FLIX <span className="text-blue-500">TV</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
          />



          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition"
          >
            SIGN IN
          </button>

          {/* social login */}
          {/* <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div> */}

          {/* <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#161b22] hover:bg-blue-600 transition"
            >
              F
            </button>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#161b22] hover:bg-sky-500 transition"
            >
              T
            </button>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#161b22] hover:bg-red-500 transition"
            >
              G
            </button>
          </div> */}

          {/* links */}
          <div className="text-center text-sm text-[#e0e0e0]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up!
            </a>
            <br />
            <br />
            <a href="#" className="hover:underline text-blue-500 mt-15">
              Forgot password?
            </a>
          </div>
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
  );
};

export default LoginComponent;
