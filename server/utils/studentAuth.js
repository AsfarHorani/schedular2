
const jwt= require('jsonwebtoken');


module.exports=(req,res,next)=>{

    const authHeader = req.get('Authorization');
    console.log(authHeader)
    if(!authHeader){
    const error = new Error('Not authenticated')
    error.statusCode = 401;
    throw error
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.STUDENT_AUTH_SIGNATURE);
      } catch (err) {
        err.statusCode = 401;
        throw err;
      }
      if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
      }
  req.adminId = decodedToken.adminId
next()

}