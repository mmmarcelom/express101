module.exports = (req, res, next) => { 
    console.log(`${req.cookies.fullname} acessou ${req.path}`)
    next()
}