import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import useUsersService from "@/services/users/useUsersService";
import {useCallback, useEffect} from "react";
import {setUserDetails} from "@/store/features/auth/authSlice";

const useAuthenticatedUserDetails = () => {

    const authenticatedUserDetails = useSelector((state: RootState) => state.auth.userDetails);
    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);

    const dispatch = useDispatch();
    const {getEmployee} = useUsersService()

    const fetchCurrentUser = useCallback(async () => {
        try {
            await getEmployee(authenticatedUser!.email).then((response) => {
                if (response.statusCode === 200) {
                    dispatch(setUserDetails(response.data!))
                }
            }).catch()
        } catch {
            
        }

    }, [dispatch, authenticatedUser]);

    useEffect(() => {
        if (!authenticatedUserDetails && authenticatedUser) {

            fetchCurrentUser().then();
        }
    }, [authenticatedUserDetails, authenticatedUser]);


    useEffect(() => {
        if (authenticatedUser) {
            fetchCurrentUser().then();
        }
    }, [authenticatedUser]);

    return {
        authenticatedUserDetails,
    }
}

export default useAuthenticatedUserDetails;
