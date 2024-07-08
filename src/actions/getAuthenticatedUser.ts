import {auth} from "@/auth";
import {AuthenticatedUser} from "@/types/authentication";

export const getAuthenticatedUser = async () => {
    let session: any = await auth();

    if (!session || !session.user) {
        return null;
    }

    return {
        id: session.user?.userId,
        name: session.user?.name,
        email: session.user?.email,
        userType: session.user?.userType,
        accessLevel: session.user?.accessLevel,
        token: session.user?.token,
    } as AuthenticatedUser

}
