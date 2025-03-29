import { useContext } from "react";
import { AuthContext } from "../contexts";


export const useAuth = () => {
    const {Auth, setAuth} = useContext(AuthContext);

    return  {Auth, setAuth}
}