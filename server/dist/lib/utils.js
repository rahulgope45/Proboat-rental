import jwt from 'jsonwebtoken';
export const genrateToken = async (id, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    ;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d"
    });
    res.cookie("jwt", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true
    });
};
//# sourceMappingURL=utils.js.map