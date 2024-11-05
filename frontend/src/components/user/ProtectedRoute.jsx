import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export const ProtectedRoute = ({children}) => {
    const { authLoading, loggedIn } = useContext(AuthContext);

    // if (authLoading) {
    //     return <div>Loading...</div>;
    // }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
