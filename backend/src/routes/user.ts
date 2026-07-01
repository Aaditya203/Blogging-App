import { Hono } from "hono";
import { sign } from "hono/jwt";
import { prisma } from "../utils/prismaHelper.js";
import bcrypt from "bcrypt"
import { signUpSchema,signInSchema } from "../schema/index.js";
import { Prisma } from "../generated/prisma/client.js";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken.js";
import { authMiddleware } from "../middleware/auth.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const userRouter = new Hono<{Bindings:{
    DATABASE_URL:string,
    JWT_KEY:string},
    Variables:{
        userid:string
    }

}>();

userRouter.post('/signup', async (c) => {
    // const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const result = signUpSchema.safeParse(body);
    if(!result.success){
        return c.json({
            mssg:"Invalid Input!"
        },403)
    }
    try{
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
        data:{
            email:body.email,
            password:hashedPassword,
            name:body.name,
            username:body.username
        }
    })
    const token = await generateToken(user.id);
    return c.json({
        jwt:token
    })
}catch(error){
    
    if(
        error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2002'
    ){
        return c.json({
            message:"User Already Exist"
        },409)
    }
    
    return c.json({
        message:String(error)
    },500)
}
})

userRouter.post('/signin', async (c) => {
    // const prisma = getPrisma(c.env.DATABASE_URL);


    const body = await c.req.json();

    const result = signInSchema.safeParse(body);
    if(!result.success){
        return c.json({
            mssg:"Invalid Input!"
        },403)
    }
    const user = await prisma.user.findUnique({
        where:{
            email:body.email,
        }
    });

    if (!user) {
  return c.json(
    {
      message:"User Don't Exists!"
    },
    403
  );
}
if (!user.password) {
    return c.json(
        {
            message: "This account uses Google Sign-In. Please continue with Google.",
        },
        400
    );
}
    const isPasswordValid = await bcrypt.compare(body.password,user.password);
    if(!isPasswordValid){
        return c.json({
            message:"Invalid Password"
        },403)
    }
    const token = await generateToken(user.id);
    return c.json({
        jwt:token,
        username:user.username,
        email:user.email,
        name:user.name
    })
})

userRouter.post('/google',async(c)=>{
    const body = await c.req.json();
    const {credential} = body;
    const ticket = await client.verifyIdToken({
        idToken:credential,
        audience:process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload();
    if(!payload){
        return c.json({
            message:"Invalid Google Token"
        },401)
    }
    const email = payload.email!;
    const name = payload.name!
    const googleid = payload.sub;
    let user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if (user && user.provider === "LOCAL") {
    return c.json(
        {
            message:
                "This email is already registered with password. Please sign in using your email and password."
        },
        409
    );
}
    if(!user){
        user = await prisma.user.create({
            data:{
                email:email,
                name:name,
                username:email.split("@")[0],
                googleId:googleid,
                provider:"GOOGLE"

            }
        })
    }
    const token = await generateToken(user.id);
    return c.json({
        jwt:token,
        username:user.username,
        name:name,
        email:email 
    })
})

userRouter.get("/check-username/:username",async(c)=>{
    const username = c.req.param("username");

    if(username.length<3){
        return c.json({
            available:false,
            message:"Username must be at least 3 characters"
        });
    }

    const user = await prisma.user.findUnique({
        where:{
            username:username
        }
    })

    if(user){
        return c.json({
            available:false,
            message:"Someone's already writing with this username."
        });
    }

    return c.json({
        available:true,
        message:"Looks goog! It's all yours."
    });
})

userRouter.get("/profileDetails",authMiddleware, async(c)=>{
    const id = c.get("userid");
    try{

        const user = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                name:true,
                username:true,
                bio:true,
                country:true,
                portfolio:true,
                joinedAt:true,
                email:true
            }
        })
        if(!user){
            return c.json({
                message:"User Not Found!"
            },401)
        }
        return c.json({
            data:user
        })
    }
    catch{
        return c.json({
            message:"Some Error Occurred!"
        },403)
    }

})

userRouter.put("/updateProfile",authMiddleware,async(c)=>{
    const id = c.get("userid");

    const user = await prisma.user.findMany({
        where:{
            id:id
        }
    })

    if(!user){
        return c.json({
            message:"User Not Found!"
        },403)
    }

    const body = await c.req.json();
    
    try{
        const updateProfile = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                name:body.name,
                bio:body.bio,
                country:body.country,
                portfolio:body.portfolio
            }
        })
        return c.json({
            message:"Updated Successfully!"
        })
    }
    catch(error){
        return c.json({
            message:error
        },500)
    }
})

export default userRouter;