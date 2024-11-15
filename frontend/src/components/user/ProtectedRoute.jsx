import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export const ProtectedRoute = ({children}) => {
    const { authData, loggedIn } = useContext(AuthContext);
    console.log(authData)

    if (authData) {
        return children;
    }else{
        return <Navigate to="/login" replace />
    }
}
