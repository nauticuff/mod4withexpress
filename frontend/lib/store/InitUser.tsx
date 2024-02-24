'use client'

import { useEffect, useRef } from 'react';

interface User {
  iat: number
  userId: string;
  userIsAdmin: number;
  username: string
}

import { useUser } from './user';

export default function InitUser({ user }: { user: User | null }) {

    const initState = useRef(false);

    useEffect(() => {
        if (!initState.current) {
          useUser.setState({ user });
        }
        initState.current = true;
    }, []);

    return <></>;    
    
}
