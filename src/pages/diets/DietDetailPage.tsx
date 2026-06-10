import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";

import { getDietPlanById } from "../../services/dietPlan.service";

function DietDetailPage() {

  const { dietId } = useParams();

  const navigate = useNavigate();

  const [dietPlan, setDietPlan] = useState<any>(null);

  async function fetchDietPlan() {

    try {

      if (!dietId) return;

      const data = await getDietPlanById(dietId);

      setDietPlan(data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    fetchDietPlan();

  }, []);

  if (!dietPlan) {

    return (

      <div className="p-8">

        <p className="text-gray-500">
          Diyet yükleniyor...
        </p>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto">

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

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          p-8
          shadow-sm
        "
      >

       <div className="flex justify-between items-start mb-8">

  <div>

    <h1
      className="
        text-3xl
        font-bold
        tracking-tight
        text-gray-900
      "
    >
      {dietPlan.title}
    </h1>

    <div className="flex gap-4 mt-3">

      <span
        className="
          px-3
          py-1
          rounded-full
          bg-[#557A2B]/10
          text-[#557A2B]
          text-sm
          font-semibold
        "
      >
        {dietPlan.dayCount} Günlük
      </span>

      <span
        className="
          px-3
          py-1
          rounded-full
          bg-gray-100
          text-gray-600
          text-sm
          font-medium
        "
      >
        Başlangıç : {dietPlan.contentJson.startDay}
      </span>

    </div>

  </div>

 

</div>

        <div
          className="
            bg-gray-50
            rounded-2xl
            p-6
            border
            border-gray-100
          "
        >

          <div className="space-y-6">

  {dietPlan.contentJson.days.map((day: any) => (

    <div
      key={day.dayIndex}
      className="
       bg-gradient-to-br
from-[#FAFAF8]
to-white
rounded-[28px]
border
border-gray-100
p-7
shadow-sm
      "
    >

      <h2
        className="
           text-2xl
    font-bold
    tracking-tight
    text-[#557A2B]
    mb-6
    pb-3
    border-b
    border-gray-100
        "
      >
        {day.dayName}
      </h2>

      <div className="space-y-4">

        <MealCard
          title="☀️ Kahvaltı"
          value={day.meals.breakfast}
        />

        <MealCard
          title="🍎 Ara Öğün"
          value={day.meals.snack1}
        />

        <MealCard
          title="🍽 Öğle Yemeği"
          value={day.meals.lunch}
        />

        <MealCard
          title="🥜 Ara Öğün"
          value={day.meals.snack2}
        />

        <MealCard
          title="🌙 Akşam Yemeği"
          value={day.meals.dinner}
        />

      </div>

    </div>

  ))}

</div>

        </div>

      </div>

    </div>

  );

}
function MealCard({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        p-5
        shadow-sm
      "
    >

      <p
        className="
          text-sm
          font-semibold
          text-[#557A2B]
          mb-2
        "
      >
        {title}
      </p>

      <p
        className="
          whitespace-pre-wrap
          text-gray-700
          leading-7
          text-[15px]
        "
      >
        {value || "-"}
      </p>

    </div>

  );

}

export default DietDetailPage;