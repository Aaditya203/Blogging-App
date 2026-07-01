import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";
import type { JWTPayload } from "hono/utils/jwt/types";

export const authMiddleware = createMiddleware(async(c,next)=>{
    const authorization = c.req.header("Authorization");
    if(!authorization){
        return c.json({
            message:"Token Missing!"
        },401)
    }

    const token = authorization.split(" ")[1];

    try{
        const payload = await verify(
            token,process.env.JWT_KEY!,"HS256"
        ) as JWTPayload;

        c.set("userid",payload.id);
        await next();
    }catch{
        return c.json({
            message:"Unauthorized"
        },401)
    }
})