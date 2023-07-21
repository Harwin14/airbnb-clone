import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return null;

  return (
    <div className="mt-4 bg-gray-100 px-8 py-8">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-2xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn}
            <br />
            Check-out: {place.checkOut}
            <br />
            Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
          </div>
        <div className="bg-white px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
