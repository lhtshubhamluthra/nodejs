const jwt=require('jsonwebtoken')
const jwtKey='keyToPass'


module.exports=(credentials=[])=>{
return (req,res,next)=>{

    

    let token=req.headers['authorization']
    if(!token)
    {
                return res.send('...Acces Denied...');
    }
    else
    {       

            //slicing token from bearer
            let tokenOnly=token.slice(7);
            //verifying token
            jwt.verify(tokenOnly,jwtKey,(err,result)=>{

                if(err)
                {
                    return res.send(err);
                }
                //checking user role
                else
                {
                   if(credentials.includes(result.data[0].role))
                   {
                            next();
                   }
                   else
                   {
                        return res.status(401).send('Error:..Access Denied...')
                   }
                }
            })
    }

}
}