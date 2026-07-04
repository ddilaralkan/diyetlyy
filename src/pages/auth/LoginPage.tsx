"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { getApiErrorMessage } from "../../services/api";
import logo from "../../assets/logo.png";

// İkonlar ve Shadcn UI benzeri minimalist elementler için
import { AlertCircle, Mail, Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();

  // Mevcut state ve form yapın birebir korundu
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/patients", { replace: true });
    }
  }, [navigate]);

  // Input değişim takipçisi
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Form gönderme fonksiyonu
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("E-posta ve şifre alanları zorunludur.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      localStorage.setItem("token", response.token);
      navigate("/patients");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Giriş yapılamadı. Bilgilerinizi kontrol edin."));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 sm:px-6">
      
      {/* Dikey, zarif ve beyaz kart yapısı */}
      <div className="w-full max-w-[500px] bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center">
        
        {/* LOGO - Boyutu ciddi oranda büyütüldü */}
        <div className="flex justify-center w-full">
          <img
            src={logo}
            alt="Diyetly Logo"
            className="w-64 sm:w-72 h-auto object-contain"
          />
        </div>

        {/* Başlık ve Alt Metin - Logo altındaki boşluk mt-[-28px] ile tamamen kapatıldı */}
        <div className="text-center mb-8 mt-[-28px] pt-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 hidden">
            Hesabınıza Giriş Yapın
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-medium">
            Devam etmek için bilgilerinizi giriniz
          </p>
        </div>

        {/* Giriş Formu */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {errorMessage && (
            <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {/* E-posta Alanı */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-800 pl-1">
              E-posta
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#557A2B] transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-14 rounded-2xl border border-gray-200 pl-12 pr-5 bg-gray-50/50 outline-none text-gray-900 placeholder-gray-400 font-medium focus:border-[#557A2B] focus:bg-white focus:ring-4 focus:ring-[#557A2B]/5 transition-all duration-200 disabled:opacity-60"
                required
              />
            </div>
          </div>

          {/* Şifre Alanı */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-800 pl-1">
              Şifre
            </label>
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Şifrenizi giriniz"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-14 rounded-2xl border border-gray-200 px-5 pr-12 bg-gray-50/50 outline-none text-gray-900 placeholder-gray-400 font-medium focus:border-[#557A2B] focus:bg-white focus:ring-4 focus:ring-[#557A2B]/5 transition-all duration-200 disabled:opacity-60"
                required
              />
              {/* Şifre Göster/Gizle Butonu */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Beni Hatırla & Şifremi Unuttum Satırı */}
          <div className="flex items-center justify-between pl-1 my-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded text-[#557A2B] focus:ring-[#557A2B] border-gray-300 accent-[#557A2B] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-medium text-gray-500 cursor-pointer select-none hover:text-gray-800 transition-colors">
                Beni Hatırla
              </label>
            </div>
            <a href="#" className="text-sm font-semibold text-[#557A2B] hover:underline transition-all">
              Şifremi Unuttum?
            </a>
          </div>

          {/* Giriş Yap Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-[#557A2B] text-white font-semibold text-base shadow-lg shadow-[#557A2B]/20 hover:bg-[#466524] hover:shadow-[#557A2B]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-2 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Giriş yapılıyor...
              </span>
            ) : (
              "Giriş Yap"
            )}
          </button>

        </form>

        {/* Alt Kısım: Kayıt Ol Alanı */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Hesabınız yok mu?{" "}
          <a href="#" className="font-semibold text-[#557A2B] hover:underline transition-all">
            Kayıt Olun
          </a>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
