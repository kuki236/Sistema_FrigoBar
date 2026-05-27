import { useState } from "react";
import AddProductModal from "../components/AddProductModal";
import BottomNav from "../components/BottomNav";

function InventoryScreen({
  inventory,
  setInventory,
}) {

  const [activeTab, setActiveTab] =
    useState("refrigerator");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const currentContainer =
    inventory[activeTab];

  return (
    <div className="min-h-screen bg-[#F4F6F4] max-w-md mx-auto pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#F4F6F4] px-4 pt-5 pb-4">

        {/* APP TITLE */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#0A4D2D]">
              FrigoBar
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Smart food inventory
            </p>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div className="mt-5">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              bg-white
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              outline-none
              text-sm
              shadow-sm
            "
          />

        </div>

        {/* TOGGLE TABS */}
        <div className="flex mt-5 bg-[#0A4D2D] rounded-2xl p-1">

          <button
            onClick={() => setActiveTab("refrigerator")}
            className={`
              flex-1
              py-2.5
              rounded-2xl
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                activeTab === "refrigerator"
                  ? "bg-white text-[#0A4D2D]"
                  : "text-white"
              }
            `}
          >
            Refrigerator
          </button>

          <button
            onClick={() => setActiveTab("pantry")}
            className={`
              flex-1
              py-2.5
              rounded-2xl
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                activeTab === "pantry"
                  ? "bg-white text-[#0A4D2D]"
                  : "text-white"
              }
            `}
          >
            Pantry
          </button>

        </div>

      </div>

      {/* SHELVES */}
      <div className="px-4 space-y-5">

        {currentContainer.shelves.map((shelf) => {

          const filteredProducts = shelf.products.filter((product) =>
            product.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );

          if (
            searchTerm &&
            filteredProducts.length === 0
          ) {
            return null;
          }

          return (
            <div
              key={shelf.shelf_id}
              className="
                bg-[#E2E8E2]
                rounded-3xl
                p-4
              "
            >

              {/* SHELF HEADER */}
              <div className="flex items-center justify-between mb-4">

                <h2 className="text-lg font-bold text-[#0A4D2D]">
                  {shelf.shelf_name}
                </h2>

                <button
                  className="
                    text-sm
                    text-[#0A4D2D]
                    bg-white
                    w-8
                    h-8
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  ✏️
                </button>

              </div>

              {/* PRODUCTS */}
              <div className="space-y-3">

                {filteredProducts.map((product) => (

                  <div
                    key={product.id}
                    className={`
                      bg-white
                      rounded-2xl
                      p-3
                      shadow-sm
                      border-l-4
                      active:scale-[0.98]
                      transition-all

                      ${
                        product.expiry_status === "red"
                          ? "border-red-600"
                          : product.expiry_status === "yellow"
                          ? "border-yellow-400"
                          : "border-green-600"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      {/* ICON */}
                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-[#F4F6F4]
                          flex
                          items-center
                          justify-center
                          text-3xl
                        "
                      >
                        {product.icon}
                      </div>

                      {/* INFO */}
                      <div className="flex-1">

                        <h3 className="font-semibold text-[#0A4D2D]">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {product.quantity}
                        </p>

                      </div>

                      {/* STATUS DOT */}
                      <div
                        className={`
                          w-3
                          h-3
                          rounded-full

                          ${
                            product.expiry_status === "red"
                              ? "bg-red-600"
                              : product.expiry_status === "yellow"
                              ? "bg-yellow-400"
                              : "bg-green-600"
                          }
                        `}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>
          );
        })}

      </div>

      {/* SMALL ADD BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed
          bottom-24
          right-5
          z-40

          w-14
          h-14

          rounded-full
          bg-[#0A4D2D]
          text-white

          text-3xl
          shadow-xl

          flex
          items-center
          justify-center

          active:scale-95
          transition-all
        "
      >
        +
      </button>

      {/* BOTTOM NAVIGATION */}
      <BottomNav />

      {/* MODAL */}
      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inventory={inventory}
        setInventory={setInventory}
      />

    </div>
  );
}

export default InventoryScreen;