import { useState } from "react";

function AddProductModal({
  open,
  onClose,
  inventory,
  setInventory,
}) {
  const [selectedZone, setSelectedZone] = useState("refrigerator");
  const [selectedShelf, setSelectedShelf] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("unit");

  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // DYNAMIC SHELVES FROM REAL INVENTORY
  const shelves =
    inventory?.[selectedZone]?.shelves || [];

  const categories = [
    "Dairy",
    "Vegetables",
    "Meat",
    "Drinks",
    "Pasta",
    "Snacks",
  ];

  const handleAddProduct = () => {
    if (!inventory) return;

    if (!productName || !selectedShelf) return;

    const newProduct = {
      id: Date.now(),

      name: productName,

      quantity: `${quantity} ${unit}`,

      category: selectedCategory,

      expiry_status: "green",

      icon: "🧊",

      raw_expiry_date: expiryDate,
    };

    const updatedInventory = structuredClone(inventory);

    const targetShelves =
      updatedInventory[selectedZone].shelves;

    const targetShelf = targetShelves.find(
      (shelf) => shelf.shelf_name === selectedShelf
    );

    if (targetShelf) {
      targetShelf.products.push(newProduct);
    }

    setInventory(updatedInventory);

    // RESET FORM
    setProductName("");
    setSelectedShelf("");
    setSelectedCategory("");
    setQuantity(1);
    setUnit("unit");
    setExpiryDate("");

    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/30
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      {/* MODAL CARD */}
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          p-5
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-[#0A4D2D]">
              Add Product
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Quickly add items to inventory
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              text-lg
            "
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <div className="mt-6 space-y-6">

          {/* PRODUCT NAME */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              autoFocus
              type="text"
              placeholder="e.g., Milk"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="
                w-full
                mt-2
                border
                border-gray-200
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-[#0A4D2D]/20
              "
            />

          </div>

          {/* STORAGE ZONE */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Storage Zone
            </label>

            <div className="flex mt-3 bg-[#0A4D2D] rounded-2xl p-1">

              <button
                type="button"
                onClick={() => {
                  setSelectedZone("refrigerator");
                  setSelectedShelf("");
                }}
                className={`
                  flex-1
                  py-2
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    selectedZone === "refrigerator"
                      ? "bg-white text-[#0A4D2D]"
                      : "text-white"
                  }
                `}
              >
                Fridge
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedZone("pantry");
                  setSelectedShelf("");
                }}
                className={`
                  flex-1
                  py-2
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    selectedZone === "pantry"
                      ? "bg-white text-[#0A4D2D]"
                      : "text-white"
                  }
                `}
              >
                Pantry
              </button>

            </div>

          </div>

          {/* SHELF SELECTOR */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Shelf
            </label>

            <div className="flex flex-wrap gap-2 mt-3">

              {shelves.map((shelf) => (

                <button
                  type="button"
                  key={shelf.shelf_id}
                  onClick={() =>
                    setSelectedShelf(shelf.shelf_name)
                  }
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    transition-all

                    ${
                      selectedShelf === shelf.shelf_name
                        ? "bg-[#0A4D2D] text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {shelf.shelf_name}
                </button>

              ))}

            </div>

          </div>

          {/* CATEGORY */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Category
            </label>

            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">

              {categories.map((category) => (

                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    whitespace-nowrap
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    transition-all

                    ${
                      selectedCategory === category
                        ? "bg-[#0A4D2D] text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

          {/* QUANTITY */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>

            <div className="flex items-center gap-3 mt-3">

              {/* COUNTER */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-gray-100
                  rounded-2xl
                  px-4
                  py-3
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  className="
                    text-xl
                    text-[#0A4D2D]
                    w-6
                  "
                >
                  −
                </button>

                <span
                  className="
                    text-lg
                    font-bold
                    text-[#0A4D2D]
                    min-w-[20px]
                    text-center
                  "
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="
                    text-xl
                    text-[#0A4D2D]
                    w-6
                  "
                >
                  +
                </button>

              </div>

              {/* SMALL UNIT SELECT */}
              <div className="relative w-28">

                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="
                    w-full
                    appearance-none
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    py-3
                    pr-8
                    outline-none
                    bg-white
                    text-sm
                    text-gray-700
                    focus:ring-2
                    focus:ring-[#0A4D2D]/20
                  "
                >
                  <option value="unit">unit</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                  <option value="pack">pack</option>
                  <option value="bottle">bottle</option>
                </select>

                <div
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-gray-400
                    text-xs
                  "
                >
                  ▼
                </div>

              </div>

            </div>

          </div>

          {/* EXPIRY DATE */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="
                w-full
                mt-2
                border
                border-gray-200
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-[#0A4D2D]/20
              "
            />

          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleAddProduct}
            className="
              w-full
              mt-2
              bg-[#0A4D2D]
              text-white
              py-4
              rounded-2xl
              font-semibold
              shadow-lg
              active:scale-[0.98]
              transition-all
            "
          >
            Add to Inventory
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddProductModal;