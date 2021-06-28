module.exports = (req,res,next)=>{
    const userSession =req.session.logged 
    if (userSession){
        console.log('gonza gato')
        res.redirect ('/')
    }
    next()
}    