import type { Response } from "express";

export interface ApiResponse<T = unknown> {
    status: "success" | "error";
    message: string;
    data: T | null;
}

export function sendSuccess<T>(res: Response, httpStatus: number, message: string, data: T) {
    return res.status(httpStatus).json({
        status: "success",
        message,
        data,
    } satisfies ApiResponse<T>);
}

export function sendError(res: Response, httpStatus: number, message: string, data: unknown = null) {
    return res.status(httpStatus).json({
        status: "error",
        message,
        data,
    } satisfies ApiResponse);
}
