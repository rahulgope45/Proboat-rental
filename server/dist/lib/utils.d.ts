import type { Response } from 'express';
interface JWTPAYlOAD {
    id: number;
}
export declare const genrateToken: (payload: JWTPAYlOAD, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=utils.d.ts.map