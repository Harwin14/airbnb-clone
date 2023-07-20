import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import { PhotosUploader } from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100)
  const [redirect, setRedirect] = useState(false);
  
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title || "");
      setAddress(data.address || "");
      setAddedPhotos(data.photos || "");
      setDescription(data.description || "");
      setPerks(data.perks || "");
      setExtraInfo(data.extraInfo || "");
      setCheckIn(data.checkIn || "");
      setCheckOut(data.checkOut || "");
      setMaxGuests(data.maxGuests || "");
      setPrice(data.price || "");
    });
  }, [id]);

  const inputHeader = (title) => {
    return <h2 className="text-xl mt-4">{title}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };
  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    console.log("ini datanya", placeData);
    if (id) {
      // update
      const put = await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      //  new place
      const post = await axios.post("/places", placeData);
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place, should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: My Lovely Apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Address", "Address is this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "select all the perks of your place")}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          " Check in&out times, max guests",
          "add check in and out times, remember to have sometime window for cleaning the room between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
