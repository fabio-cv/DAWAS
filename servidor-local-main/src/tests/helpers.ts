import type { Response } from "express";

export function createMockResponse() {
    const response = {
        statusCode: 200,
        body: null as unknown,
        status(code: number) {
            this.statusCode = code;
            return this;
        },
        json(payload: unknown) {
            this.body = payload;
            return this;
        },
    };

    return response as Response & {
        statusCode: number;
        body: unknown;
    };
}
