import cryptor from "../cryptor.js"

class AuthMiddlewares {
    authMiddleware(req, res, next) {
        const secret = cryptor.getSecretKey()

        if (req.method === "OPTIONS") {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const decodedData = jwt.verify(token, secret)
            req.user = decodedData
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    };

    roleMiddleware(roles) {
        return function (req, res, next) {
            const secret = cryptor.getSecretKey()

            if (req.method === "OPTIONS") {
                next()
            }
    
            try {
                const token = req.headers.authorization
                if (!token) {
                    return res.status(403).json({message: "Пользователь не авторизован"})
                }
                const {roles: userRoles} = jwt.verify(token, secret)
                let hasRole = false
                userRoles.forEach(role => {
                    if (roles.includes(role)) {
                        hasRole = true
                    }
                })
                if (!hasRole) {
                    return res.status(403).json({message: "У вас нет доступа"})
                }
                next();
            } catch (e) {
                console.log(e)
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
        }
    }
}

export default new AuthMiddlewares()