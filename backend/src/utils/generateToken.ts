import { sign } from "hono/jwt";

export async function generateToken(userId: string) {
    return sign(
        {
            id: userId,
            role: "user",
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        process.env.JWT_KEY!
    );
}