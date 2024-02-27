"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { register } from "@/lib/ApiServices/UserService";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store/user";

export default function Page() {
  const router = useRouter();
  const user = useUser((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    // console.log("Username: ", username);
    // console.log("Password: ", password);
    // console.log("admin: ", isAdmin);

    const res = await register({ username, password, userIsAdmin: isAdmin });
    console.log(res)
    if (res.success) {

      router.push("/");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-64px)] p-3 bg-black flex justify-center items-center">
        <div className="flex flex-col px-5 py-5 bg-gray-800">
          <h1 className="mb-6 text-xl font-bold">Register</h1>
          <input
            className="mb-4 p-2 text-black"
            type="text"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="mb-4 p-2 text-black"
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="flex items-center gap-2 mb-4">
            <input
              id="isAdmin"
              type="checkbox"
              onChange={(e) => setIsAdmin(!isAdmin)}
            ></input>
            <label htmlFor="isAdmin">admin</label>
          </div>
          <button
            type="button"
            className="rounded p-3 bg-neutral-600 w-full hover:bg-neutral-700/90 "
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="text-sm my-3">
            Already have an account?{" "}
            <Link className="text-purple-400 underline" href={"/login"}>
              login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
