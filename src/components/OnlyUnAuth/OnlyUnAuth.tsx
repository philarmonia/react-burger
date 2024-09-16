
import {ReactElement, useMemo} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";


type TOnlyUnAuth = {
    element: ReactElement;
}

export const OnlyUnAuth = ({ element }: TOnlyUnAuth): ReactElement => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const user = useSelector(store => store.user.user)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const to = useMemo(() => new URLSearchParams(location.search).get("to"), [location.search]);

    if (user) {
        return <Navigate to={to || "/"} replace={true} />;
    }

    return element;
}
