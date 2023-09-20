"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGlobal } from "../context/GlobalContext";

function Home() {
  const { user, getProfile } = useGlobal();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);
    // console.log("login", `isLogged ${res.data.isLogged}`);
    if (res.data.email) {
      getProfile();

      toast.success("Conexion exitosa ...", { position: "bottom-right" })
      router.push("/");
      router.refresh();


    } else {
      toast.error("Usuario y/o contraseña invalida. reintente...", { position: "bottom-right" });
    }
  };

  return (
    <div className="flex justify-center bg-base-100 mt-4">
      <form onSubmit={handleSubmit} className="bg-base-200 p-4 rounded-ee-3xl shadow-2xl max-w-md">
        <h1 className="text-2xl text-primary font-bold">Bienvenido</h1>
        <input
          className="input input-bordered input-primary w-full max-w-md mt-2"
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
          className="textarea textarea-primary w-full max-w-md mt-2"
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
