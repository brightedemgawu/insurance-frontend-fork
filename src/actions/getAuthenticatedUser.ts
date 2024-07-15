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
        photo: session.user?.photo,
        position: session.user?.position,
        onboarding: session.user?.onboarding,
        userType: session.user?.userType,
        accessLevel: session.user?.accessLevel,
        token: session.user?.token,
    } as AuthenticatedUser

}
