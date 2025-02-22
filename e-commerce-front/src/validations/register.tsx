
import {z} from 'zod'



const registerationSchema = z.object({
    firstName: z.string().min(1, {message: "first name is required"}),
    lastName: z.string().min(1, {message: "last name is required"}),
    email: z.string().min(10, {message: "email address is required"}).email(),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((input) => input.password === input.confirmPassword, {
      message: "Password and Confirm Password does not match",
      path: ["confirmPassword"],
  })
  
  type formOrops = {
    firstName: string,
    lastName: string,
    email:string,
    password: string,
    confirmPassword: string
  } 


  export {registerationSchema, type formOrops}
  