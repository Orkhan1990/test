import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const result = await fetch(
          "http://localhost:3007/api/v1/listing/get?offer=true&limit=4"
        );
        const data = await result.json();
        setOfferListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const result = await fetch(
          "http://localhost:3007/api/v1/listing/get?type=sale&limit=4"
        );
        const data = await result.json();
        setSaleListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const result = await fetch(
          "http://localhost:3007/api/v1/listing/get?type=rent&limit=4"
        );
        const data = await result.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <div>
      <div className="max-w-6xl mx-auto flex flex-col gap-4 my-[100px]">
        <h1 className="text-5xl font-bold">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-slate-400 text-sm">
          Sahand Estate will help you find your home fast,easy and comfortable.
          <br />
          Our expert support are always avaliable.
        </p>
        <Link
          to={"/search"}
          className="text-blue-700 text-sm font-semibold hover:underline"
        >
          {"Let's Start now..."}
        </Link>
      </div>

      {/* SLIDER WITH SWIPER */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((offerListing, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${offerListing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="max-w-6xl mx-auto">
        <div>
          {offerListings && offerListings.length > 0 && (
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {saleListings && saleListings.length > 0 && (
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more offers
              </Link>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {rentListings && rentListings.length > 0 && (
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more offers
              </Link>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
