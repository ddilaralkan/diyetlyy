"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patient.service";

// Modern form estetiği ve interaktif odaklanma için Lucide ikonları
import {
  User,
  Mail,
  Phone,
  Calendar,
  ArrowUp,
  Weight,
  FileText,
  ArrowLeft,
  Loader2,
  Users,
} from "lucide-react";

function EditPatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Yüklenme durumları ve odaklanma takibi state'leri
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Asıl form state yapınız
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "female",
    birthDate: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    notes: "",
  });

  // Girdi değişim takipçiniz
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Gerçek API servisinizden verileri çeken fonksiyon
  async function fetchPatient() {
    try {
      if (!id) return;
      setIsFetching(true);
      
      const data = await getPatientById(id);

      setFormData({
        fullName: data.fullName,
        gender: data.gender,
        birthDate: data.birthDate?.split("T")[0] || "",
        phone: data.phone || "",
        email: data.email || "",
        height: String(data.height || ""),
        weight: String(data.weight || ""),
        notes: data.notes || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  // Form gönderme ve güncelleme fonksiyonunuz (Yönlendirmeler korundu)
  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    try {
      if (!id) return;
      setIsLoading(true);

      const payload = {
        ...formData,
        height: Number(formData.height),
        weight: Number(formData.weight),
      };

      await updatePatient(id, payload);
      navigate(`/patients/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPatient();
  }, []);

  // Tailwind stil şablonları
  const inputBaseClass =
    "w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50/30 text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none font-medium";
  const inputFocusClass =
    "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5 shadow-sm";

  const getIconClass = (fieldName: string) =>
    `absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 ${
      focusedField === fieldName ? "text-[#557A2B]" : "text-gray-400"
    }`;

  // Sayfa ilk açıldığında veriler veritabanından gelirken çıkan şık yükleniyor ekranı
  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#557A2B] animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Hasta bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#557A2B]/20">
      <div className="max-w-3xl mx-auto">
        
        {/* ÜST BAŞLIK VE GERİ DÖNÜŞ PANELİ */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/patients/${id}`)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#557A2B] transition-colors duration-200 mb-4 group font-semibold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Detaylara Dön</span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Danışan Bilgilerini Düzenle
          </h1>
         
        </div>

        {/* ANA FORM KARTI */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)] p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Ad Soyad */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Ad Soyad</label>
                <div className="relative">
                  <User className={getIconClass("fullName")} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Ad Soyad"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "fullName" ? inputFocusClass : ""} disabled:opacity-60`}
                    required
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">E-mail</label>
                <div className="relative">
                  <Mail className={getIconClass("email")} />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "email" ? inputFocusClass : ""} disabled:opacity-60`}
                    required
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Telefon</label>
                <div className="relative">
                  <Phone className={getIconClass("phone")} />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "phone" ? inputFocusClass : ""} disabled:opacity-60`}
                  />
                </div>
              </div>

              {/* Doğum Tarihi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Doğum Tarihi</label>
                <div className="relative">
                  <Calendar className={getIconClass("birthDate")} />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("birthDate")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "birthDate" ? inputFocusClass : ""} disabled:opacity-60`}
                  />
                </div>
              </div>

              {/* Boy */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Boy (cm)</label>
                <div className="relative">
                  <ArrowUp className={getIconClass("height")} />
                  <input
                    type="number"
                    name="height"
                    placeholder="Boy"
                    value={formData.height}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("height")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "height" ? inputFocusClass : ""} disabled:opacity-60`}
                  />
                </div>
              </div>

              {/* Kilo */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Kilo (kg)</label>
                <div className="relative">
                  <Weight className={getIconClass("weight")} />
                  <input
                    type="number"
                    name="weight"
                    placeholder="Kilo"
                    value={formData.weight}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("weight")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} ${focusedField === "weight" ? inputFocusClass : ""} disabled:opacity-60`}
                  />
                </div>
              </div>

              {/* Cinsiyet */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Cinsiyet</label>
                <div className="relative">
                  <Users className={getIconClass("gender")} />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("gender")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`${inputBaseClass} appearance-none cursor-pointer ${focusedField === "gender" ? inputFocusClass : ""} disabled:opacity-60`}
                  >
                    <option value="female">Kadın</option>
                    <option value="male">Erkek</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* Klinik Notları */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Klinik Notları</label>
              <div className="relative">
                <FileText className={`absolute left-4 top-4 w-[18px] h-[18px] transition-colors duration-200 ${focusedField === "notes" ? "text-[#557A2B]" : "text-gray-400"}`} />
                <textarea
                  name="notes"
                  placeholder="Notlar"
                  value={formData.notes}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("notes")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 pt-3.5 border border-gray-200 rounded-xl bg-gray-50/30 text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none resize-none h-32 font-medium focus:border-[#557A2B] focus:bg-white focus:ring-4 focus:ring-[#557A2B]/5 disabled:opacity-60"
                />
              </div>
            </div>

            {/* GÜNCELLEME BUTONU */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[140px] h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm shadow-md shadow-gray-900/10 hover:bg-[#557A2B] hover:shadow-[#557A2B]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Güncelleniyor...</span>
                  </>
                ) : (
                  <span>Güncelle</span>
                )}
              </button>
            </div>

          </form>
        </div>
        
      </div>
    </div>
  );
}

export default EditPatientPage;