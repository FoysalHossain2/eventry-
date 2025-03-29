'use client'

import { useState } from "react";
import { AuthContext } from "../contexts";

export default function AuthProvider({children}) {
    const [Auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}