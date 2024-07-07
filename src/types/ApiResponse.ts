/**
 * Represents a standard API response with a generic data type.
 * @template T - The type of the data being returned in the response.
 */
export default interface ApiResponse<T> {
    /**
     * Indicates whether the API request was successful.
     */
    success: boolean;

    /**
     * The status code of the API response.
     */
    statusCode: number;

    /**
     * The message associated with the API response.
     */
    message: string;

    /**
     * The data returned by the API.
     */
    data?: T;

    /**
     * Any errors associated with the API response.
     */
    errors?: any;
}
