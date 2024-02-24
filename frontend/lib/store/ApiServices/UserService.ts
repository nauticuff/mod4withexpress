interface AuthRequestBody {
  username: string;
  password: string;
  userIsAdmin?: boolean;
}

export const getUser = async () => {
  const response = await fetch('http://localhost:5432/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  const data = await response.json();

  return data;

}

export const logout = async () => {
  const response = await fetch('http://localhost:5432/logout', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  const data = await response.json();

  return data;
}

export const login = async (body: AuthRequestBody) => {
  const response = await fetch('http://localhost:5432/login', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const data = await response.json();

  return data;
}

export const register = async (body : AuthRequestBody) => {
  const response = await fetch('http://localhost:5432/register', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}