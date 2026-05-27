export const mockInventory = {
  refrigerator: {
    display_name: "My Refrigerator",

    shelves: [
      {
        shelf_id: 1,
        shelf_name: "Top Shelf",

        products: [
          {
            id: 1,
            name: "Milk",
            quantity: "1 L",
            expiry_status: "red",
            icon: "🥛",
          },

          {
            id: 2,
            name: "Juice",
            quantity: "3 bottles",
            expiry_status: "yellow",
            icon: "🧃",
          },
        ],
      },

      {
        shelf_id: 2,
        shelf_name: "Middle Shelf",

        products: [
          {
            id: 3,
            name: "Chicken",
            quantity: "1 kg",
            expiry_status: "green",
            icon: "🍗",
          },
        ],
      },
    ],
  },

  pantry: {
    display_name: "My Pantry",

    shelves: [
      {
        shelf_id: 1,
        shelf_name: "Snacks Section",

        products: [
          {
            id: 4,
            name: "Potato Chips",
            quantity: "2 bags",
            expiry_status: "green",
            icon: "🥔",
          },
        ],
      },
    ],
  },
};