import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex items-end gap-8 justify-center py-40 xl:py-80">

        <Spinner className="h-8 w-8" />

      </div>
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }}></Navigate>
    }


    return children;
};

export default PrivateRoute;