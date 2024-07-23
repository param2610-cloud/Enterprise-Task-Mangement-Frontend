export interface User {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ResponseData {
    statusCode: number;
    data: {
        _id: string;
        name: string;
        email: string;
        active: boolean;
        avatarUrl: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    message: string;
    success: boolean;
}

export interface ApiResponse {
    data: ResponseData;
    status: number;
    statusText: string;
    headers: {
        "content-length": string;
        "content-type": string;
    };
    config: {
        transitional: {
            silentJSONParsing: boolean;
            forcedJSONParsing: boolean;
            clarifyTimeoutError: boolean;
        };
        adapter: string[];
        transformRequest: null[];
        transformResponse: null[];
        timeout: number;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        maxBodyLength: number;
        env: Record<string, unknown>;
        headers: {
            Accept: string;
        };
        baseURL: string;
        withCredentials: boolean;
        params: {
            userId: string;
        };
        method: string;
        url: string;
    };
    request: Record<string, unknown>;
}
