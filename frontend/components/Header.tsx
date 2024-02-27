'use client'

import { User } from "@/lib/store/user";
import { logout } from "@/lib/ApiServices/UserService";
import { useRouter } from "next/navigation";

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout()
    router.refresh();
  }

  return (
    <header className="w-full py-3 px-5 flex justify-between items-center bg-neutral-900">
      <h1 className="font-bold text-lg"><span className="text-purple-500">Supa</span>RestChat</h1>
      {user ? (
        <button className="bg-neutral-700 rounded p-2 hover:bg-neutral-700/80" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="bg-neutral-700 rounded p-2 hover:bg-neutral-700/80" onClick={() => router.push('/login')}>Login</button>
      )}
    </header>
  );
}
