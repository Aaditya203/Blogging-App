import { Hono } from 'hono'
import { verify  } from 'hono/jwt'
import { cors } from 'hono/cors';
import userRouter from './routes/user'
import blogRouter from './routes/blog'
import { serve } from '@hono/node-server';
import "dotenv/config";
import likeRouter from './routes/like';
import aiRouter from './routes/ai';

type JwtPayload = {
  id: string;
  role: string;
  exp: number;
};
const app = new Hono<{
    Bindings:{
        JWT_KEY:string
    },
    Variables:{
        userid:string
    }
}>()

app.use('/*',cors())
app.use('/api/v1/blog/*',async (c,next)=>{
    const authorizationID = c.req.header('Authorization');
    if(!authorizationID){
        return c.json({
            mssg:"Token missing!!"
        },401)
    }
    const token = authorizationID.split(" ")[1];
    try{
        const jwtKey = process.env.JWT_KEY!
        const payload = await verify(token,jwtKey,'HS256') as JwtPayload;
        c.set('userid',payload.id);
        await next();
    }catch{
        return c.json({
            mssg:"Unauthorized"
        },401)
    }
    
})
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/like',likeRouter)
app.route('/api/v1/ai',aiRouter)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`🚀 Server running at http://localhost:${info.port}`);
  }
);