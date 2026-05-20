"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../../services/patient.service";

// Temiz UI elementleri için Lucide ikonları
import { Users, Plus, ArrowRight } from "lucide-react";

function PatientsPage() {
  const [patients, setPatients] = useState([]);

  // Mevcut veri çekme fonksiyonun aynen korundu
  async function fetchPatients() {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F5] px-4 py-8 sm:px-10 sm:py-10 selection:bg-[#557A2B]/20">
      
      {/* ÜST PANEL (HERO SECTION) */}
      <section
        className="
          w-full
          rounded-[24px]
          border border-gray-100
          bg-white
          shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)]
          px-6 sm:px-8
          py-5 sm:py-6
        "
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          {/* SOL ALAN - Başlık ve İkon */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#557A2B]/10">
              <Users className="h-5 w-5 text-[#557A2B]" />
            </div>
            <div>
              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-900
                  font-bold
                "
              >
                Danışanlar
              </p>
              
            </div>
          </div>

          {/* SAĞ ALAN - Sayaç ve Yeni Danışan Butonu */}
          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            
            {/* TOPLAM DANIŞAN SAYAÇ KUTUSU */}
            <div
              className="
                flex-1 sm:flex-none
                rounded-2xl
                border border-gray-300
                bg-gray-50/60
                px-5
                py-3
                shadow-[0_2px_8px_rgba(0,0,0,0.01)]
                transition-all
                duration-300
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-gray-600
                  font-bold
                "
              >
                Toplam danışan
              </p>
              <p
                className="
                  mt-0.5
                  text-xl
                  font-bold
                  text-gray-900
                  tracking-tight
                "
              >
                {patients.length}
                <span className="ml-1 text-xs font-semibold text-[#557A2B]">kişi</span>
              </p>
            </div>

            {/* YENİ DANIŞAN BUTONU */}
            <Link
              to="/patients/new"
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#020617]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-gray-950/10
                transition-all
                duration-300
                hover:bg-[#557A2B]
                hover:shadow-[#557A2B]/20
                hover:-translate-y-0.5
                active:translate-y-0
                w-full sm:w-auto
              "
            >
              <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              Yeni Danışan
            </Link>

          </div>
        </div>
      </section>

      {/* DANIŞAN LİSTESİ KONTEYNERI */}
      <div
        className="
          mt-6
          rounded-[24px]
          border border-gray-100
          overflow-hidden
          bg-white
          shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)]
        "
      >
        {/* Liste Boş Kontrolü */}
        {patients.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 mx-auto mb-3">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-400">Henüz kayıtlı danışan bulunmuyor.</p>
          </div>
        ) : (
          // Liste Satırları Döngüsü
          patients.map((patient: any, index: number) => (
            <Link
              key={patient.id}
              to={`/patients/${patient.id}`}
              className={`
                group
                flex
                items-center
                justify-between
                px-6 sm:px-10
                py-5
                transition-all
                duration-300
                hover:bg-gray-50/60
                hover:pl-12
                ${index !== patients.length - 1 ? "border-b border-gray-100" : ""}
              `}
            >
              {/* SOL TARAF - Baş harfler ve ID alanları tamamen kaldırıldı, sadece saf isim kaldı */}
              <div className="flex items-center">
                <h2
                  className="
                    text-base
                    font-semibold
                    text-gray-800
                    transition-colors
                    duration-300
                    group-hover:text-[#557A2B]
                  "
                >
                  {patient.fullName}
                </h2>
              </div>

              {/* SAĞ TARAF - "Görüntüle" ve Ok Efekti */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-300
                  transition-all
                  duration-300
                  group-hover:text-[#557A2B]
                  group-hover:gap-3
                "
              >
                <span className="text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Görüntüle
                </span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>

            </Link>
          ))
        )}
      </div>

      {/* SAYFA ALTI YAZISI */}
      <div className="mt-8 text-center">
        
      </div>

    </div>
  );
}

export default PatientsPage;