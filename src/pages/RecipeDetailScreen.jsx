
import {
  Clock3,
  ChefHat,
  Leaf,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

function RecipeDetailScreen() {

  const { id } = useParams();

  // MOCK DATA
  const recipe = {
    recipe_id: "rec_089",

    title: "Penne Arrabbiata",

    waste_rescue_score: 85,

    cooking_time_mins: 30,

    difficulty: "Easy",

    image_url:
      "https://images.unsplash.com/photo-1546549032-9571cd6b27df",

    ingredients_matching: {

      rescued_items: [
        {
          id: "prod_001",
          name: "Leche Fresh",
          amount_needed: "200ml",
        },

        {
          id: "prod_002",
          name: "Queso Cheddar",
          amount_needed: "100g",
        },
      ],

      missing_items: [
        {
          name: "Fideos Penne",
          suggested_buy_amount: "500g",
        },

        {
          name: "Fresh Basil",
          suggested_buy_amount: "1 bunch",
        },
      ],
    },

    steps: [
      "Boil water for 9 minutes.",

      "Sauté garlic and add the rescued cheese until melted.",

      "Mix everything and serve hot.",
    ],
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] max-w-md mx-auto pb-10">

      {/* HERO IMAGE */}
      <div className="relative h-80 overflow-hidden">

        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            to-black/10
          "
        />

        {/* BACK BUTTON */}
        <Link
          to="/recipes"
          className="
            absolute
            top-5
            left-4

            w-11
            h-11

            rounded-full
            bg-white/90

            flex
            items-center
            justify-center
          "
        >
          <ArrowLeft
            size={20}
            className="text-[#0A4D2D]"
          />
        </Link>

        {/* TITLE */}
        <div className="absolute bottom-5 left-5 right-5">

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-2

              rounded-full
              bg-[#0A4D2D]

              text-white
              text-sm
              font-semibold
            "
          >
            <Leaf size={16} />

            {recipe.waste_rescue_score}% rescued
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
              mt-4
            "
          >
            {recipe.title}
          </h1>

        </div>

      </div>

      {/* META INFO */}
      <div className="px-4 mt-5">

        <div
          className="
            bg-white
            rounded-3xl
            p-4

            flex
            items-center
            gap-6

            shadow-sm
          "
        >

          <div className="flex items-center gap-2">

            <Clock3
              size={18}
              className="text-[#0A4D2D]"
            />

            <span className="text-sm font-medium">
              {recipe.cooking_time_mins} mins
            </span>

          </div>

          <div className="flex items-center gap-2">

            <ChefHat
              size={18}
              className="text-[#0A4D2D]"
            />

            <span className="text-sm font-medium">
              {recipe.difficulty}
            </span>

          </div>

        </div>

      </div>

      {/* INGREDIENTS */}
      <div className="px-4 mt-6 space-y-5">

        {/* RESCUED */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <h2
            className="
              text-xl
              font-bold
              text-[#0A4D2D]
            "
          >
            In Your Fridge
          </h2>

          <div className="mt-5 space-y-4">

            {recipe.ingredients_matching.rescued_items.map(
              (item) => (

                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.amount_needed}
                    </p>

                  </div>

                  <span
                    className="
                      text-xs
                      bg-yellow-100
                      text-yellow-700

                      px-2
                      py-1
                      rounded-full
                    "
                  >
                    Expiring Soon
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* MISSING */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <h2
            className="
              text-xl
              font-bold
              text-[#0A4D2D]
            "
          >
            Missing Ingredients
          </h2>

          <div className="mt-5 space-y-4">

            {recipe.ingredients_matching.missing_items.map(
              (item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    border
                    border-dashed
                    border-gray-300
                    rounded-2xl
                    p-4
                  "
                >

                  <div
                    className="
                      w-5
                      h-5
                      rounded-md
                      border-2
                      border-gray-400
                    "
                  />

                  <div>

                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Buy {item.suggested_buy_amount}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* STEPS */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <h2
            className="
              text-xl
              font-bold
              text-[#0A4D2D]
            "
          >
            Cooking Steps
          </h2>

          <div className="mt-5 space-y-5">

            {recipe.steps.map((step, index) => (

              <div
                key={index}
                className="
                  flex
                  gap-4
                "
              >

                <div
                  className="
                    min-w-[36px]
                    h-9

                    rounded-full
                    bg-[#0A4D2D]

                    text-white
                    font-bold

                    flex
                    items-center
                    justify-center
                  "
                >
                  {index + 1}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecipeDetailScreen;