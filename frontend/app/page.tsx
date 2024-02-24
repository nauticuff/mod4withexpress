"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import { getUser } from "@/lib/store/ApiServices/UserService";
import InitUser from "@/lib/store/InitUser";
import { User } from "@/lib/store/user";

export default function Home() {
  const [data, setData] = useState<{ user: User } | { user: null }>({
    user: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await getUser();
      setData(userData);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen w-full">
      <Header user={data.user} />
      <main className="">
        {!data.user ? (
          <div>
            <h1>I don't recognize you.</h1>
            <p className="mb-3">You are not logged in.</p>
            <p>Please do login.</p>
          </div>
        ) : (
          <div className="bg-neutral-800 text-neutral-200">
            <h1 className="text-xl">Welcome back, {data.user.username}</h1>
            <p>You are most definitely logged in.</p>
          </div>
        )}
      </main>

      <InitUser user={data.user} />
    </div>
  );
}
