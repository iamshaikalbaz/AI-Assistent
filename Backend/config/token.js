import JWT from "jsonwebtoken"

const genToken = async (userId) => {
    try{
        const token = JWT.sign({userId},process.env.JWT_Secret,{expiresIn: "10d"})
        return token
    }
    catch(error){
        console.log(error)
    }
}

export default genToken