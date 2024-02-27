import Header from "@/components/Header";
import { getUser } from "@/lib/ApiServices/UserService";
import InitUser from "@/lib/store/InitUser";
import { User } from "@/lib/store/user";
// import { User } from "@/lib/store/user";

// const getUser = async () => {
//   const cookieStore = cookies();
//   const supachatAccessToken = cookieStore.get("supachatAccessToken")?.value;
//   const supachatRefreshToken = cookieStore.get("supachatRefreshToken")?.value;

//   const response = await fetch("http://localhost:5432/user", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       supachatAccessToken: `${supachatAccessToken}`,
//       supachatRefreshToken: `${supachatRefreshToken}`,
//     },
//   });

//   const data = await response.json();

//   return data;
// };

interface UserData {
  data: { user: User } | { user: null };
}

export default async function Home() {
  const { data }: UserData = await getUser();
  console.log(data.user);

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
