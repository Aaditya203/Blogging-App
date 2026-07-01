import { Hono } from 'hono'

import { prisma } from '../utils/prismaHelper';
import { authMiddleware } from '../middleware/auth';
const likeRouter = new Hono<{Bindings:{
  DATABASE_URL:string
},
  Variables:{
    userid:string
}}>()


likeRouter.post('/doLike',authMiddleware,async (c)=>{
    //we need two things here first is post id and second is userid
    const body = await c.req.json();
    const userid = c.get('userid')

    const postExists = await prisma.post.findUnique({
        where:{
            id:body.post_id
        }
    })
    if(!postExists){
        return c.json({
            message:"Post Not Found!"
        },404)
    }
    try{
        const response = await prisma.like.create({
        data:{
            post_id:body.post_id,
            user_id:userid
        }
    })
    return c.json({
        message:"Liked!"
    })
    }catch{
        return c.json({
            message:"Some error Occurred"
        },403)
    }
})


likeRouter.delete('/unlike',authMiddleware,async (c)=>{
    const body = await c.req.json();
    const userid = c.get('userid')
    try{
        const response = await prisma.like.delete({
            where:{
                post_id_user_id:{
                    post_id:body.post_id,
                    user_id:userid
                }
            }
        })
        return c.json({
        message:"Unliked"
        })
    }catch{
        return c.json({
            message:"Some Error Occurred!"
        },403)
    }
})

export default likeRouter