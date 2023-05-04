import Router from 'express'
import { check } from "express-validator"

import Expa from '../Expa/index.js'

const router = new Router()

// Expa Auth //
router.post('/auth/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 6 символов").isLength({min:6})
], Expa.controller.registration)

router.post('/auth/login', Expa.auth.controller.login)
router.post('/auth/is-admin', Expa.auth.middlewares.roleMiddleware(["ADMIN"]), async (req, res) => { res.send(true) })
router.post('/auth/is-auth', Expa.auth.middlewares.roleMiddleware(["USER"]), async (req, res) => { res.send(true) })
///


export default router