import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {SuccessfulLoginDto} from "@/services/authentication/dtos/response/SuccessfulLoginDto";
import jwt from "jsonwebtoken";
import {AuthenticatedUser, DecodedRefreshToken, UserTypes} from "@/types/authentication";
import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatUserName(name: string = ""): string {
    name = name.trim()
    if (name === "" || name === null || name === undefined) {
        return "[ NAME ]"
    }
    return `${name.toUpperCase().slice(0, 17)}${name.length! > 17 ? ".." : ""}`
}

export function formatUserEmail(email: string = ""): string {


    // Construct the new format
    return email.length > 26 ? email.slice(0, 25) : email;
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
    str = str.replace("-", " ")
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function decodeToken(token: SuccessfulLoginDto): AuthenticatedUser {

    const decodedToken = jwt.decode(token.token) as DecodedRefreshToken;

    return {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        userType: decodedToken.userType,
        photo: decodedToken.photo,
        position: decodedToken.position,
        onboarding: decodedToken.onboarding,
        accessLevel: decodedToken.accessLevel,
    } as AuthenticatedUser

}


export function convertToTitleCase(input: string): string {
    return input
        .split('_') // Split by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join with spaces
}

export function convertDateToMonthDayYear(dateString: string): string {
    if (dateString === "") {
        return "NaN"
    }
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    // Use the Intl.DateTimeFormat object to format the date
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


/**
 * Checks if the authenticated user meets the required permissions.
 * @param user The authenticated user object. If null, access is denied.
 * @param requiredPermissions Array of permission keys to check against.
 * @returns True if the user meets all required permissions, false otherwise.
 */
export function userMeetsRequiredPermissions(user: AuthenticatedUser | null, requiredPermissions: (keyof AccessLevelPermissions)[]): boolean {
    // If user is not authenticated, deny access
    if (!user) {
        return requiredPermissions.length === 0; // No permissions required, access denied
    }

    // Admins have access to everything
    if (user.userType === UserTypes.Admin) {
        return true;
    }

    // Check if the user has every required permission
    return requiredPermissions.every((permission) => user?.accessLevel?.permissions[permission]);
}
