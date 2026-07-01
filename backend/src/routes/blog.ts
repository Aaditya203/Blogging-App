import { Hono } from 'hono'
import { blogSchema, blogUpdateSchema } from '../schema/index';
import { prisma } from '../utils/prismaHelper';
const blogRouter = new Hono<{Bindings:{
  DATABASE_URL:string
},
  Variables:{
    userid:string
}}>()


blogRouter.post('/create', async (c) => {
  // const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const result = blogSchema.safeParse(body);

  if(!result.success){
     c.status(400)
     return c.json({
      mssg:"Invalid/Incomplete Input"
     })
  }
  const userid = c.get('userid');

  const blog = await prisma.post.create({
    data:{
      title:result.data.title,
      content:result.data.content,
      authorId:userid,
    }
  })
  return c.json({
    mssg:"Blog Created Successfully!!",
  })
})

blogRouter.get('/bulk', async (c) => {
  // const prisma = getPrisma(c.env.DATABASE_URL);
  try{const blogs = await prisma.post.findMany({
    take:10,
    skip:0,
    select:{
      id:true,
      title:true,
      content:true,
      createdAt:true,
      author:{
        select:{
          id:true,
          name:true,
        }
      },
      _count:{
        select:{
          likes:true
        }
      }
      }
    
  });

  return c.json({
    blogs:blogs
  })}
  catch(error){
    return c.json({
      message:error
    },401)
  }
})
blogRouter.get('/my', async (c) => {
  const userid = c.get('userid');
  // const prisma = getPrisma(c.env.DATABASE_URL);
  try{
    const myBlogs = await prisma.post.findMany({
    where:{
      authorId:userid
    },
    select:{
      id:true,
      title:true,
      createdAt:true,
      _count:{
        select:{
          likes:true
        }
      }
    }
  });
  return c.json({
    blogs:myBlogs
  })}
  catch(error){
    return c.json({
      message:error
    },401)
  }
})

blogRouter.get('/user/:id/blogs', async (c) => {
  const otherAuthorId = c.req.param('id');
  // const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany({
    where:{
      authorId:otherAuthorId
    },
    
  });

  return c.json({
    blogs
  })
})

blogRouter.get('/:id',async (c) => {
  // const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const userid = c.get('userid')

  const blog = await prisma.post.findUnique({
    where:{
      id:blogId
    },
    select:{
      id:true,
      title:true,
      content:true,
      createdAt:true,
      author:{
        select:{
          id:true,
          username:true,
          bio:true,
          name:true,
      }
    },
    _count:{
      select:{
        likes:true
      }
    }
    }
  })
  if(!blog){
    return c.json({
      mssg:"Blog Not Found"
    },404)
  }

  const hasLiked = await prisma.like.findUnique({
    where:{
      post_id_user_id:{
        post_id:blogId,
        user_id:userid
      }
    }
  })
  return c.json({
    blogs:{
      ...blog,
      likesCount:blog._count.likes,
      hasLiked: !!hasLiked
    }
  })
})

blogRouter.put('/:id',async (c) => {
  const userid = c.get('userid');
  // const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const blog = await prisma.post.findUnique({
  where: {
    id: blogId
  }
});

if (!blog || blog.authorId !== userid) {
  return c.json({ mssg: "Unauthorized" }, 403);
}
  const body = await c.req.json();
  const result = blogUpdateSchema.safeParse(body);
  if(!result.success){
    return c.json({
      mssg:"Invalid Format"
    },400)
  }
  try{
    const updatedBlog = await prisma.post.update({
    where:{
      id:blogId,
     
    },
    data:{
      title:result.data.title,
      content:result.data.content
    }
  })
  return c.json({
    mssg:"Blog Updated Successfully!!"
  })}catch{
    return c.json({
      mssg:'Failed'
    },500)
  }
})

blogRouter.delete('/:id', async (c) => {
  const userid = c.get('userid');
  // const prisma = getPrisma(c.env.DATABASE_URL);

  const blogId = c.req.param('id');
  
  try{
      const blog = await prisma.post.findUnique({
      where:{
        id:blogId
      }
    });

    if(!blog || blog.authorId !== userid){
      return c.json(
        { mssg:"Unauthorized" },
        403
      );
    }

    await prisma.post.delete({
      where:{
        id:blogId
      }
    });
  return c.json({
    mssg:"Blog deleted!!"
  })
  }catch{
    return c.json({
      mssg:"Failed!"
    },500)
  }
})

export default blogRouter