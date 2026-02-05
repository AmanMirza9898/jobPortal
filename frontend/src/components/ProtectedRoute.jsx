import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate("/login");
            return;
        }

        if (role && user.role !== role) {
            navigate("/");
        }
    }, [user, navigate, role]);

    if (user === null || (role && user.role !== role)) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
