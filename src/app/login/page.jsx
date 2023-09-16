"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGlobal } from "../context/GlobalContext";

function Home() {
  const { getProfile } = useGlobal();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);
    console.log("login", `isLogged ${res.data.isLogged}`);
    if (res.data.isLogged) {
      getProfile();
      router.push("/");
      router.refresh();
    } else {
      toast.error("Usuario y/o contraseña invalida. reintente...");
    }
  };

  return (
    <div className="flex  justify-center items-center py-4 bg-base-200 rounded-ee-full">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary">Bienvenido</h1>
        <input
          className="input input-bordered input-primary w-full max-w-xs mt-2"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              email: e.target.value,
            })
          }
        />
        <input
          className="textarea textarea-primary w-full max-w-xs mt-2"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
        />
        <button className="btn btn-primary mt-2 block">Login</button>
      </form>
    </div>
  );
}

export default Home;
