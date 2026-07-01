import z  from "zod";

export const blogSchema = z.object({
    title:z.string().min(3),
    content:z.string()
})

export const blogUpdateSchema = z.object({
    title:z.string().optional(),
    content:z.string().optional()
})


export const signUpSchema = z.object({
    email:z.email(),
    password:z.string(),
    name:z.string(),
    username:z.string()
})

export const signInSchema = z.object({
    email:z.email(),
    password:z.string()
})


export type BlogInputSchema = z.infer<typeof blogSchema>
export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>