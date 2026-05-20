"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { calculateAge } from "../../utils/calculateAge";
import { deletePatient, getPatientById } from "../../services/patient.service";

// Görsel hiyerarşiyi desteklemek için Lucide ikon paketini ekledik
import { ArrowLeft, Edit2, Trash2, Calendar, User, Phone, Mail, ArrowUp, Weight, FileText } from "lucide-react";

function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchPatient() {
    try {
      if (!id) return;
      const data = await getPatientById(id);
      setPatient(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Hastayı silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;
    setIsDeleting(true);

    try {
      if (!id) return;
      await deletePatient(id);
      navigate("/patients");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    fetchPatient();
  }, []);

  // Hasta yüklenirken ya da bulunamadığında çıkan ekranı da temaya uygun hale getirdik
  if (!patient) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-semibold text-gray-400 animate-pulse">Hasta verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] px-4 py-8 sm:px-10 sm:py-10 selection:bg-[#557A2B]/20">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* ÜST GEZİNTİ ALANI */}
        <div className="mb-6">
          <Link
            to="/patients"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#557A2B] transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Hastalara Dön
          </Link>
        </div>

        {/* ANA DETAY KARTI */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 sm:p-10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)] space-y-8">
          
          {/* HASTA ADI VE EYLEM BUTONLARI */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {patient.fullName}
            </h1>
            
            {/* Buton Grubu */}
            <div className="flex items-center gap-3">
              {/* Düzenle Butonu */}
              <Link
                to={`/patients/${patient.id}/edit`}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-gray-950/10 hover:bg-[#557A2B] hover:shadow-[#557A2B]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <Edit2 className="h-4 w-4" />
                Düzenle
              </Link>

              {/* Sil Butonu */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100 hover:text-red-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Siliniyor..." : "Hastayı Sil"}
              </button>
            </div>
          </div>

          {/* İKİ SÜTUNLU METRİK GRID ALANI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            
            {/* Yaş */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50">
              <Calendar className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">Yaş:</span>
                {calculateAge(patient.birthDate)}
              </p>
            </div>

            {/* Cinsiyet */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50">
              <User className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">Cinsiyet:</span>
                {patient.gender === "female" || patient.gender === "Kadın" ? "Kadın" : "Erkek"}
              </p>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50">
              <Phone className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">Telefon:</span>
                {patient.phone || "Belirtilmemiş"}
              </p>
            </div>

            {/* E-posta */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50">
              <Mail className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">E-mail:</span>
                {patient.email || "Belirtilmemiş"}
              </p>
            </div>

            {/* Boy */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50 md:border-none">
              <ArrowUp className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">Boy:</span>
                {patient.height} cm
              </p>
            </div>

            {/* Kilo */}
            <div className="flex items-center gap-3 py-2 border-b border-gray-50 md:border-none">
              <Weight className="h-4 w-4 text-[#557A2B]/70" />
              <p className="text-sm font-semibold text-gray-500">
                <span className="text-gray-900 mr-1.5">Kilo:</span>
                {patient.weight} kg
              </p>
            </div>

          </div>

          {/* ÖZEL KLİNİK NOTLARI ALANI */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-[#557A2B]" />
              <h2 className="text-lg font-bold text-gray-900">
                Klinik Notları
              </h2>
            </div>
            
            {/* Not İçerik Kutusu - Soluna zeytin yeşili şerit çekilerek premium hale getirildi */}
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/70 border-l-4 border-l-[#557A2B]">
              <p className="text-sm leading-relaxed font-medium text-gray-600 whitespace-pre-wrap">
                {patient.notes || "Bu danışana ait herhangi bir klinik notu bulunmuyor."}
              </p>
            </div>
          </div>

        </div>

        {/* ALT LOGO VEYA SİSTEM METNİ */}
      

      </div>
    </div>
  );
}

export default PatientDetailPage;