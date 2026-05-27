import { Link, useLocation } from "react-router-dom";

import {
  Refrigerator,
  TriangleAlert,
  ChefHat,
} from "lucide-react";

function BottomNav() {

  const location = useLocation();

  return (
    <>
      {/* CENTER FLOATING BUTTON */}
      <Link
        to="/recipes"
        className={`
          fixed
          bottom-7
          left-1/2
          -translate-x-1/2
          z-50

          w-16
          h-16

          rounded-full

          flex
          items-center
          justify-center

          shadow-2xl
          border-4
          border-[#F4F6F4]

          active:scale-95
          transition-all

          ${
            location.pathname === "/recipes"
              ? "bg-[#083824]"
              : "bg-[#0A4D2D]"
          }
        `}
      >
        <ChefHat
          size={28}
          className="text-white"
        />
      </Link>

      {/* BOTTOM NAVBAR */}
      <div
        className="
          fixed
          bottom-0
          left-1/2
          -translate-x-1/2

          w-full
          max-w-md

          bg-white
          border-t
          border-gray-200

          h-20

          flex
          items-center
          justify-around

          z-40
        "
      >

        {/* INVENTORY */}
        <Link
          to="/"
          className="
            flex
            flex-col
            items-center
            justify-center

            text-xs
            font-medium
          "
        >

          <Refrigerator
            size={22}
            className={
              location.pathname === "/"
                ? "text-[#0A4D2D]"
                : "text-gray-400"
            }
          />

          <span
            className={
              location.pathname === "/"
                ? "text-[#0A4D2D]"
                : "text-gray-400"
            }
          >
            Inventory
          </span>

        </Link>

        {/* SPACE FOR FAB */}
        <div className="w-16" />

        {/* EXPIRY */}
        <Link
          to="/expiry"
          className="
            flex
            flex-col
            items-center
            justify-center

            text-xs
            font-medium
          "
        >

          <TriangleAlert
            size={22}
            className={
              location.pathname === "/expiry" ||
              location.pathname === "/expiry-settings"
                ? "text-[#0A4D2D]"
                : "text-gray-400"
            }
          />

          <span
            className={
              location.pathname === "/expiry" ||
              location.pathname === "/expiry-settings"
                ? "text-[#0A4D2D]"
                : "text-gray-400"
            }
          >
            Expiry
          </span>

        </Link>

      </div>
    </>
  );
}

export default BottomNav;