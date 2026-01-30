export class ApiError extends Error {
    status: number;
    code?: string;

    constructor(message: string, status: number = 500, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
