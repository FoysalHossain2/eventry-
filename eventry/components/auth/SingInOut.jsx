'use client'

import { useAuth } from "@/app/hooks/useAuth"
import Link from "next/link";
import { useRouter } from "next/navigation";

const SingInOut = () => {

    const {Auth, setAuth} = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        router.push('/login')
    }

  return (
    <div>
        {
            Auth ? (
                <>
                    <span className="mx-2">Hello, {Auth?.name}</span>
                    <span className="mx-1">|</span>
                    <a className="cursor-pointer" onClick={logout}>Logout</a>
                </>
            ) : (<Link href="/login">Login</Link>)
        }
    </div>
  )
}

export default SingInOut