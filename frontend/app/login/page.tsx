"use client";

import { login } from "@/lib/ApiServices/UserService";
import { useUser } from "@/lib/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const user = useUser((state) => state.user);
  console.log('User info: ', user)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // console.log("Username: ", username);
    // console.log("Password: ", password);
    const res = await login({ username, password });
    if(res.success){
      router.push('/')
    }
    console.log('Login res: ', res)
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
          <h1 className="mb-6 text-xl font-bold">Welcome back,</h1>

          <input
            className="mb-4 p-2 text-black"
            type="text"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="mb-3 p-2 text-black"
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="rounded p-3 mb-3 bg-neutral-600 w-full hover:bg-neutral-700/90 "
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link className="text-purple-400 underline" href={"/register"}>
              register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
