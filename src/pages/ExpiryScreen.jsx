import { useMemo } from "react";
import BottomNav from "../components/BottomNav";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
function ExpiryScreen({ inventory }) {

  // FLATTEN ALL PRODUCTS
  const allProducts = useMemo(() => {

    const products = [];

    Object.values(inventory).forEach((container) => {

      container.shelves.forEach((shelf) => {

        shelf.products.forEach((product) => {

          // CALCULATE DAYS LEFT
          let daysLeft = null;

          if (product.raw_expiry_date) {

            const today = new Date();

            const expiry = new Date(product.raw_expiry_date);

            const diff =
              expiry.getTime() - today.getTime();

            daysLeft = Math.ceil(
              diff / (1000 * 60 * 60 * 24)
            );
          }

          products.push({
            ...product,
            shelf_name: shelf.shelf_name,
            container_name: container.display_name,
            days_left: daysLeft,
          });

        });

      });

    });

    return products;

  }, [inventory]);

  // FILTER CRITICAL + WARNING
  const urgentProducts = useMemo(() => {

    return allProducts
      .filter(
        (product) =>
          product.expiry_status === "red" ||
          product.expiry_status === "yellow"
      )
      .sort((a, b) => {

        if (a.days_left === null) return 1;

        if (b.days_left === null) return -1;

        return a.days_left - b.days_left;
      });

  }, [allProducts]);

  const getProgressWidth = (daysLeft) => {

    if (daysLeft <= 0) return "0%";

    if (daysLeft >= 10) return "100%";

    return `${daysLeft * 10}%`;
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] max-w-md mx-auto pb-28">

    {/* HEADER */}
    <div
    className="
        sticky
        top-0
        z-20
        bg-[#F4F6F4]
        px-4
        pt-5
        pb-4
    "
    >

    <div className="flex items-start justify-between">

        <div>

        <h1 className="text-3xl font-bold text-[#0A4D2D]">
            Expiry Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
            Priority food consumption timeline
        </p>

        </div>

        {/* SETTINGS BUTTON */}
        <Link
        to="/expiry-settings"
        className="
            w-12
            h-12
            rounded-2xl
            bg-white
            border
            border-gray-200
            flex
            items-center
            justify-center
            shadow-sm
            text-[#0A4D2D]

            active:scale-95
            transition-all
        "
        >
        <Settings size={22} />
        </Link>

    </div>

    </div>
      {/* CRITICAL TOP SECTION */}
      <div className="px-4">

        <div
          className="
            bg-white
            rounded-3xl
            p-5
            shadow-sm
            border
            border-red-100
          "
        >

          {/* TITLE */}
          <div className="flex items-center justify-between">

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-[#D32F2F]
                "
              >
                Consume Immediately
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Products nearing expiration
              </p>

            </div>

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-red-50
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              ⚠️
            </div>

          </div>

          {/* PRODUCT LIST */}
          <div className="mt-6 space-y-4">

            {urgentProducts.length === 0 && (

              <div
                className="
                  bg-[#F4F6F4]
                  rounded-2xl
                  py-8
                  text-center
                "
              >

                <div className="text-4xl">
                  🥬
                </div>

                <p className="text-gray-500 mt-3">
                  No urgent products detected
                </p>

              </div>

            )}

            {urgentProducts.map((product) => {

              const isCritical =
                product.expiry_status === "red";

              return (

                <div
                  key={product.id}
                  className={`
                    rounded-3xl
                    p-4
                    border
                    shadow-sm
                    transition-all

                    ${
                      isCritical
                        ? "bg-red-50 border-red-100"
                        : "bg-yellow-50 border-yellow-100"
                    }
                  `}
                >

                  {/* TOP */}
                  <div className="flex items-center gap-4">

                    {/* ICON */}
                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-white
                        flex
                        items-center
                        justify-center
                        text-3xl
                        shadow-sm
                      "
                    >
                      {product.icon}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <div>

                          <h3
                            className="
                              text-lg
                              font-bold
                              text-[#0A4D2D]
                            "
                          >
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {product.quantity}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {product.shelf_name}
                          </p>

                        </div>

                        {/* STATUS BADGE */}
                        <div
                          className={`
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-semibold
                            whitespace-nowrap

                            ${
                              isCritical
                                ? "bg-[#D32F2F]/10 text-[#D32F2F]"
                                : "bg-[#FBC02D]/20 text-[#B28704]"
                            }
                          `}
                        >

                          {product.days_left <= 0
                            ? "Expires today!"
                            : isCritical
                            ? `Expires in ${product.days_left} day`
                            : `${product.days_left} days left`}

                        </div>

                      </div>

                      {/* PROGRESS BAR */}
                      <div className="mt-4">

                        <div
                          className="
                            w-full
                            h-2.5
                            bg-white/70
                            rounded-full
                            overflow-hidden
                          "
                        >

                          <div
                            className={`
                              h-full
                              rounded-full
                              transition-all
                              duration-500

                              ${
                                isCritical
                                  ? "bg-[#D32F2F]"
                                  : "bg-[#FBC02D]"
                              }
                            `}
                            style={{
                              width: getProgressWidth(
                                product.days_left || 0
                              ),
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      </div>

      {/* BOTTOM NAV */}
      <BottomNav />

    </div>
  );
}

export default ExpiryScreen;