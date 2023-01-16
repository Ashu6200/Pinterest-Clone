
import { onAuthStateChanged, } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsub();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export function UserAuth() {
    return useContext(AuthContext);
}
