import { useMemo } from "react";
import { Link } from "react-router-dom";

import BottomNav from "../components/BottomNav";

function HungryScreen({ inventory }) {

  // GET EXPIRING PRODUCTS
  const expiringProducts = useMemo(() => {

    const products = [];

    Object.values(inventory).forEach((zone) => {

      zone.shelves.forEach((shelf) => {

        shelf.products.forEach((product) => {

          if (
            product.expiry_status === "red" ||
            product.expiry_status === "yellow"
          ) {
            products.push(product);
          }

        });

      });

    });

    return products;

  }, [inventory]);

  // MOCK RECIPES
  const recipes = [
    {
      id: 1,
      name: "Creamy Pasta Bowl",
      image: "🍝",
      rescueScore: 92,
      ingredients: "3/4 Ingredients available",
      tags: ["Milk", "Cheese", "Pasta"],
    },

    {
      id: 2,
      name: "Fresh Veggie Salad",
      image: "🥗",
      rescueScore: 81,
      ingredients: "2/3 Ingredients available",
      tags: ["Tomato", "Lettuce"],
    },

    {
      id: 3,
      name: "Chicken Rice Mix",
      image: "🍛",
      rescueScore: 76,
      ingredients: "4/6 Ingredients available",
      tags: ["Chicken", "Rice"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F4] max-w-md mx-auto pb-28">

      {/* HEADER */}
      <div className="px-4 pt-5">

        {/* RESCUE STATS */}
        <div
          className="
            bg-[#0A4D2D]
            rounded-3xl
            p-5
            text-white
            shadow-xl
          "
        >

          <h1 className="text-3xl font-bold">
            Tengo Hambre 🍳
          </h1>

          <p className="mt-2 text-white/80">
            Recipes powered by expiring food
          </p>

          <div className="mt-5 flex items-center justify-between">

            <div>

              <p className="text-white/70 text-sm">
                Ingredients to rescue
              </p>

              <h2 className="text-4xl font-bold mt-1">
                {expiringProducts.length}
              </h2>

            </div>

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/10
                flex
                items-center
                justify-center
                text-4xl
              "
            >
              🥬
            </div>

          </div>

        </div>

        {/* MATCHING AREA */}
        <div
          className="
            mt-5
            bg-white
            rounded-3xl
            p-5
            shadow-sm
          "
        >

          <h2 className="font-bold text-[#0A4D2D] text-lg">
            Matching with your ingredients...
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            AI recipe engine analyzing your inventory
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            {expiringProducts.length === 0 && (

              <div
                className="
                  text-sm
                  text-gray-400
                "
              >
                No expiring ingredients detected
              </div>

            )}

            {expiringProducts.map((product) => (

              <div
                key={product.id}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-[#F4F6F4]
                  text-sm
                  text-[#0A4D2D]
                  font-medium
                "
              >
                {product.name}
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RECIPES */}
      <div className="px-4 mt-5 space-y-4">

        {recipes.map((recipe) => (

          <Link
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="
              block
              bg-white
              rounded-3xl
              p-4
              shadow-sm
              active:scale-[0.98]
              transition-all
            "
          >

            <div className="flex gap-4">

              {/* IMAGE */}
              <div
                className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-[#F4F6F4]
                  flex
                  items-center
                  justify-center
                  text-5xl
                "
              >
                {recipe.image}
              </div>

              {/* INFO */}
              <div className="flex-1">

                <div className="flex items-start justify-between gap-2">

                  <div>

                    <h3 className="text-lg font-bold text-[#0A4D2D]">
                      {recipe.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {recipe.ingredients}
                    </p>

                  </div>

                  {/* RESCUE SCORE */}
                  <div
                    className="
                      px-3
                      py-1.5
                      rounded-full
                      bg-[#0A4D2D]
                      text-white
                      text-xs
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    🌱 {recipe.rescueScore}%
                  </div>

                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-4">

                  {recipe.tags.map((tag) => (

                    <div
                      key={tag}
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-[#F4F6F4]
                        text-xs
                        text-gray-600
                      "
                    >
                      {tag}
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

      <BottomNav />

    </div>
  );
}

export default HungryScreen;