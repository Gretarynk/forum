import jwt from "jsonwebtoken";

 export const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"authorization failed no token provided"});
    }
    // console.log('token',token)
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"authorization failed Invalid token "})
        }
    //  console.log('decoded token', decoded)
        req.body.userId=decoded.userId;
        console.log('user id',req.body.userId)
        // req.user = decoded;
        //  console.log('requested user',req.user)
        return next();
    });
}
