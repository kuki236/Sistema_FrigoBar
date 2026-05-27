import { useMemo } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  UtensilsCrossed,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

import BottomNav from "../components/BottomNav";

function ExpirySettingsScreen({
  inventory,
  setInventory,
}) {

  // FLATTEN ALL PRODUCTS
  const allProducts = useMemo(() => {

    const products = [];

    Object.values(inventory).forEach((zone) => {

      zone.shelves.forEach((shelf) => {

        shelf.products.forEach((product) => {

          products.push({
            ...product,
            shelf_name: shelf.shelf_name,
            zone_name: zone.display_name,
          });

        });

      });

    });

    return products;

  }, [inventory]);

  // FILTERS
  const redItems = allProducts.filter(
    (product) => product.expiry_status === "red"
  );

  const yellowItems = allProducts.filter(
    (product) => product.expiry_status === "yellow"
  );

  const greenItems = allProducts.filter(
    (product) => product.expiry_status === "green"
  );

  // REMOVE PRODUCT
  const removeProduct = (productId) => {

    const updatedInventory = structuredClone(inventory);

    Object.values(updatedInventory).forEach((zone) => {

      zone.shelves.forEach((shelf) => {

        shelf.products = shelf.products.filter(
          (product) => product.id !== productId
        );

      });

    });

    setInventory(updatedInventory);
  };

  // MARK AS CONSUMED
  const markAsConsumed = (productId) => {

    const updatedInventory = structuredClone(inventory);

    Object.values(updatedInventory).forEach((zone) => {

      zone.shelves.forEach((shelf) => {

        shelf.products = shelf.products.map((product) => {

          if (product.id === productId) {

            return {
              ...product,
              expiry_status: "green",
            };

          }

          return product;

        });

      });

    });

    setInventory(updatedInventory);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] max-w-md mx-auto pb-28">

    {/* HEADER */}
<div className="sticky top-0 z-20 bg-[#F4F6F4] px-4 pt-5 pb-5">

  <div className="flex items-start justify-between">

    <div className="flex items-start gap-3">

      {/* BACK BUTTON */}
      <Link
        to="/expiry"
        className="
          w-11
          h-11
          rounded-2xl
          bg-white
          border
          border-gray-200
          flex
          items-center
          justify-center
          shadow-sm
          text-[#0A4D2D]
          mt-1

          active:scale-95
          transition-all
        "
      >
        <ArrowLeft size={20} />
      </Link>

      <div>

        <h1 className="text-3xl font-bold text-[#0A4D2D]">
          Expiry Rules
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Control your expiration alerts system
        </p>

      </div>

    </div>

  </div>

</div>

      {/* CONTENT */}
      <div className="px-4 space-y-5">

        {/* RED RULE */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                <AlertTriangle
                  className="text-red-600"
                  size={24}
                />
              </div>

              <div>

                <h2 className="font-bold text-red-600">
                  Critical Zone
                </h2>

                <p className="text-sm text-gray-500">
                  Less than 3 days
                </p>

              </div>

            </div>

            <ChevronDown className="text-gray-400" />

          </div>

          <div className="mt-5 space-y-3">

            {redItems.length === 0 && (
              <p className="text-sm text-gray-400">
                No critical products
              </p>
            )}

            {redItems.map((product) => (

              <div
                key={product.id}
                className="
                  bg-red-50
                  rounded-2xl
                  p-4
                  border
                  border-red-100
                "
              >

                <div className="flex items-center gap-3">

                  <div className="text-3xl">
                    {product.icon}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-[#0A4D2D]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.quantity}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        markAsConsumed(product.id)
                      }
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <UtensilsCrossed
                        size={18}
                        className="text-[#0A4D2D]"
                      />
                    </button>

                    <button
                      onClick={() =>
                        removeProduct(product.id)
                      }
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* YELLOW RULE */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <AlertTriangle
                  className="text-yellow-500"
                  size={24}
                />
              </div>

              <div>

                <h2 className="font-bold text-yellow-600">
                  Warning Zone
                </h2>

                <p className="text-sm text-gray-500">
                  Between 3 and 7 days
                </p>

              </div>

            </div>

            <ChevronDown className="text-gray-400" />

          </div>

          <div className="mt-5 space-y-3">

            {yellowItems.length === 0 && (
              <p className="text-sm text-gray-400">
                No warning products
              </p>
            )}

            {yellowItems.map((product) => (

              <div
                key={product.id}
                className="
                  bg-yellow-50
                  rounded-2xl
                  p-4
                  border
                  border-yellow-100
                "
              >

                <div className="flex items-center gap-3">

                  <div className="text-3xl">
                    {product.icon}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-[#0A4D2D]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.quantity}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        markAsConsumed(product.id)
                      }
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <UtensilsCrossed
                        size={18}
                        className="text-[#0A4D2D]"
                      />
                    </button>

                    <button
                      onClick={() =>
                        removeProduct(product.id)
                      }
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* GREEN RULE */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <CheckCircle2
                  className="text-green-600"
                  size={24}
                />
              </div>

              <div>

                <h2 className="font-bold text-green-600">
                  Safe Zone
                </h2>

                <p className="text-sm text-gray-500">
                  More than 7 days
                </p>

              </div>

            </div>

            <ChevronDown className="text-gray-400" />

          </div>

          <div className="mt-5 space-y-3">

            {greenItems.length === 0 && (
              <p className="text-sm text-gray-400">
                No safe products
              </p>
            )}

            {greenItems.map((product) => (

              <div
                key={product.id}
                className="
                  bg-green-50
                  rounded-2xl
                  p-4
                  border
                  border-green-100
                "
              >

                <div className="flex items-center gap-3">

                  <div className="text-3xl">
                    {product.icon}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-[#0A4D2D]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.quantity}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
            {/* BOTTOM NAV */}
<BottomNav />
    </div>
  );
}

export default ExpirySettingsScreen;