import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SliderComponent = () => {
  const [flights, setFlights] = useState([]);

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer flex items-center bg-gray-200 px-2 py-10 h-full rounded-full shadow hover:bg-gray-300"
    >
      <FaArrowRight className="text-gray-600" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer flex items-center bg-gray-200 px-2 py-10 h-full rounded-full shadow hover:bg-gray-300"
    >
      <FaArrowLeft className="text-gray-600" />
    </div>
  );

  useEffect(() => {
    axios
      .get(
        "https://corsproxy.io/?" +
          encodeURIComponent(
            "https://runtrip.ir/_booking/CheapestPrice/getMinFileNew/fa/IRR/MHD/THR"
          )
      )
      .then((res) => {
        const raw = res.data.minPrice?.MHD?.THR?.minDate || {};
        const formatted = Object.entries(raw).map(([date, values]) => ({
          date,
          price: values[0],
          label: values[1],
        }));
        setFlights(formatted);
      })
      .catch((err) => {
        console.error("خطا در دریافت دیتا:", err);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: true,
    responsive: [
      {
        breakpoint: 640, // موبایل
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024, // تبلت
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        ارزان‌ترین پروازها از مشهد به تهران
      </h2>

      <div className="w-full max-w-4xl mx-auto px-4 py-6 bg-white rounded-2xl shadow-lg">
        {flights.length > 0 ? (
          <Slider {...settings}>
            {flights.map((item, index) => (
              <div key={index} className="px-0 sm:px-1 md:px-2 ">
                <div className="bg-blue-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300  text-center border border-gray-100">
                  <p className="text-sm font-semibold text-amber-50 text-center ">
                    {item.label}
                  </p>

                  <p className="text-lg font-bold text-amber-50 mt-4">
                    {(+item.price).toLocaleString()} ت
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">در حال دریافت اطلاعات...</p>
        )}
      </div>
    </div>
  );
};

export default SliderComponent;
