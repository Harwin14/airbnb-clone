import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/register", {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            alert("Registration successfully, Now you can log in");
            setRedirect(true)
        } catch (error) {
            alert("Registration failed. Please try again later");
        }
    };
if(redirect){
    return <Navigate to={'/login'} />
}

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <button className="primary" type="submit">
                        Register
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member ? &nbsp;
                        <Link className="underline text-black" to={"/login"}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
