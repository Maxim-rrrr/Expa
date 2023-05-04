import AuthController from './AuthController.js'
import AuthMiddlewares from './AuthMiddlewares.js'

class Auth {
    controller = AuthController
    middlewares = AuthMiddlewares
}

export default new Auth()
