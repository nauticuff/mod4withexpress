'use server'

import { cookies } from "next/headers";

interface AuthRequestBody {
  username: string;
  password: string;
  userIsAdmin?: boolean;
}

export const getUser = async () => {
  const cookieStore = cookies();
  const supachatAccessToken = cookieStore.get("supachatAccessToken")?.value;
  const supachatRefreshToken = cookieStore.get("supachatRefreshToken")?.value;

  const response = await fetch("http://localhost:5432/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      supachatAccessToken: `${supachatAccessToken}`,
      supachatRefreshToken: `${supachatRefreshToken}`,
    },
  });

  const data = await response.json();

  return data;
};

export const logout = async () => {
  try {
    const cookieStore = cookies();
  
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  } catch (error) {
    console.error(error)
    return 'Successfully logged out.'
  }
  
  // const response = await fetch('http://localhost:5432/logout', {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json'
  //   },
  //   credentials: 'include'
  // });

  // const data = await response.json();

  // return data;
}

export const login = async (body: AuthRequestBody) => {
  const cookieStore = cookies();

  const response = await fetch('http://localhost:5432/login', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const data = await response.json();

  cookieStore.set('accessToken', data.cookies.accessToken)
  cookieStore.set('refreshToken', data.cookies.refreshToken)

  return data;
}

export const register = async (body : AuthRequestBody) => {
  const cookieStore = cookies();

  const response = await fetch('http://localhost:5432/register', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json();
  // console.log(data.cookies.accessToken)
  cookies().set('supachatAccessToken', data.cookies.accessToken)
  cookies().set('supachatRefreshToken', data.cookies.refreshToken)
  // cookieStore.set('accessToken', data.cookies.accessToken)
  // cookieStore.set('refreshToken', data.cookies.refreshToken)

  return data;
}