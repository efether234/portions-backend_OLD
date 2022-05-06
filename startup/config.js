module.exports = () => {
    if (!process.env.JWTPRIVATEKEY) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
    }
}