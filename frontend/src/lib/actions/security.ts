

import { action, query, redirect } from "@solidjs/router";
import { delay } from "../utils";


export const login = action(async (form:FormData) => {
    "use server";
    
    const email = form.get('email');
    const password = form.get('password');
    const rememberMe = form.get('rememberMe');
    
    if(!email || !password) {
        throw {
            code:400,
            message:"Please provide necessary fields"
        }
    }

    throw redirect("/dashboard")

    //TODO: implement login authentication
})

export const logout = action(async () => {
    "use server";
    //TODO: implement logout authentication
})

export const validateCredentials = query(async () => {
    "use server";
    //TODO: implement authentication validation 
},"validateCredentials")