import type { NextFunction, Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCurrenrUser: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map