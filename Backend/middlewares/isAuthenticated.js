import jwt from "jsonwebtoken";
const isAuthenticated = (req , res, next)=>{
    try{
         const token = req.cookies.token; 
         if(!token){
            return res.status(401).json({
            message: "Authentication failed user not authenticated",
             success: false,
            })
           
         }

         const decoded = jwt.verify(token, process.env.SECRET_KEY);
         if(!decoded){
            return res.status(401).json({
            message: "Authentication failed invalid token",
            success: false,
           })
         };

         req.id = decoded.userId;
        next();
    }
    

    catch(err){
        return res.status(401).json({
        message: "Authentication failed",
        success: false,
      });
    }
}

export default isAuthenticated;