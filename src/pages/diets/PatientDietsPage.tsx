import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientDietPlans } from "../../services/dietPlan.service";
import { ArrowLeft, Edit2, Eye } from "lucide-react";

function PatientDietsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [dietPlans, setDietPlans] =
    useState<any[]>([]);

  async function fetchDietPlans() {

    try {

      if (!id) return;

      const data =
        await getPatientDietPlans(id);

      setDietPlans(data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    fetchDietPlans();

  }, []);

  return (

    <div className="min-h-screen bg-[#F7F7F5] px-4 py-8 sm:px-10">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-500
            hover:text-[#557A2B]
            mb-6
          "
        >

          <ArrowLeft className="h-4 w-4" />

          Geri Dön

        </button>

        <h1
          className="
            text-2xl
            font-bold
            text-gray-900
            mb-8
          "
        >
          Diyet Geçmişi
        </h1>

        <div className="space-y-4">

          {dietPlans.length === 0 && (

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-dashed
                border-gray-200
                p-10
                text-center
                text-gray-400
              "
            >
              Bu danışana ait kayıtlı diyet bulunmuyor.
            </div>

          )}

          {dietPlans.map((diet) => (

            <div
              key={diet.id}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-5
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                      text-lg
                      font-semibold
                      text-gray-900
                    "
                  >
                    {
                      new Date(
                        diet.createdAt
                      ).toLocaleString("tr-TR")
                    }
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    {diet.dayCount}
                    Günlük
                    {" • "}
                    {diet.title}
                  </p>

                </div>

                <div className="flex gap-3">
<button

  onClick={() =>
    navigate(
      `/diet-plans/${diet.id}`
    )
  }

  className="
    flex
    items-center
    gap-2
    px-4
    py-2
    rounded-xl
    border
    border-gray-200
    hover:bg-gray-50
  "
>

  <Eye className="h-4 w-4" />

  Görüntüle

</button>

                  <button

  onClick={() =>
    navigate(
      `/diet-editor/${diet.id}`
    )
  }

  className="
    flex
    items-center
    gap-2
    px-4
    py-2
    rounded-xl
    bg-[#557A2B]
    text-white
    hover:opacity-90
  "
>

  <Edit2 className="h-4 w-4" />

  Düzenle

</button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default PatientDietsPage;