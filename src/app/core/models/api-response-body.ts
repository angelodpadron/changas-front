export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: ApiError | null;
}

export interface ApiError {
    message: string;
    details: [string];
}