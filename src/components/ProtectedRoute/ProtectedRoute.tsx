import { ReactElement } from "react";
import {Navigate, useLocation} from 'react-router-dom'
import { useSelector } from "../../services/hooks/hooks";

type TProtectedRoute = {
    element: ReactElement;
}

export const ProtectedRoute = ({ element }: TProtectedRoute) => {
    const { user } = useSelector(store => store.user)
    const location = useLocation()

    return user ? (element) : (<Navigate to={`/login?to=${location.pathname}`} replace={false} />)
}
