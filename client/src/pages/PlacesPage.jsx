import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../components/Perks";
import { PhotosUploader } from "../components/PhotosUploader";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos]= useState([])
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);

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

    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={"/account/places/new"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === "new" && (
                <div>
                    <form>
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
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                        {preInput("Description", "description of the place")}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {preInput(
                            "Perks",
                            "select all the perks of your place"
                        )}
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
                        <div className="grid gap-2 sm:grid-cols-3">
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
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">
                                    Max number of guests
                                </h3>
                                <input
                                    type="number"
                                    value={maxGuests}
                                    onChange={(e) =>
                                        setMaxGuests(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}
