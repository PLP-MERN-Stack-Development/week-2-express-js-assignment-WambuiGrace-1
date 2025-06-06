function authenticate(req, res, next) {
    const apiKey = req.headers['api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({message: 'Unauthorised'});
    }
    next();
}

module.exports = authenticate;