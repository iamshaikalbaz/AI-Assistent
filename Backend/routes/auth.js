import express from 'express'
import { logOut, signUp, Login } from '../controllers/auth.js'

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",Login)
authRouter.get("/logout", logOut)

export default authRouter  