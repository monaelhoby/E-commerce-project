
import {z} from 'zod'



const loginSchema = z.object({
    email: z.string().min(10, {message: "email address is required"}).email(),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" }),
  })
  
  type formOrops = {
    email:string,
    password: string,
  } 


  export {loginSchema, type formOrops}
  