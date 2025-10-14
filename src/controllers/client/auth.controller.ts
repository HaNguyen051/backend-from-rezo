import { render } from "ejs";
import { Request, Response } from "express";
import { registerNewUsers } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";


const getLoginPage = async (req: Request, res: Response) => {
    // const user = req.user; 
    const { session } = req as any; 
    const messages = session?.messages ?? []; 
    return res.render("client/auth/login.ejs", {
        messages
    }); 
}
const getRegisterPage = async (req: Request, res: Response) => {
    const errors = []; 
    const oldData = {
        fullName: "", 
        email: "", 
        password: "",
        confirmPassword:""
    }
    return res.render("client/auth/register.ejs", {
        errors, 
        oldData
    }); 
}
const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema; 
    // const {name , price , detailDesc , shortDesc , quantity , factory , target} = req.body as TProductSchema ; 
    const validate =await RegisterSchema.safeParseAsync(req.body); 
    if (!validate.success)
    {
        //error
        const errorsZod  = validate.error.issues; 
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`); 
        const oldData = {
          fullName , email , password , confirmPassword
        }
        return res.render("client/auth/register.ejs", {
            errors,
            oldData
        });
           
    }
    //success
    // //handle create user
    await registerNewUsers(fullName , email , password) ; 
      return res.redirect("/login"); 
}
const getSuccessRedirectPage = async (req: Request, res: Response) => {
    const user = req.user as any;

    if (user?.Role?.name === "ADMIN") {
        res.redirect("/admin")
    } else res.redirect("/")

}


export { getLoginPage, getRegisterPage , postRegister , getSuccessRedirectPage }; 
