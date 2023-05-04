import User from '../../../models/Expa/User.js';
import Role from '../../../models/Expa/Role.js';
import { USER } from '../../rolesList.js';
import cryptor from '../cryptor.js'


class authService {
    async registration(username, password) {
        const hashPassword = cryptor.scryptHash(password);

        const userRole = await Role.findOne({value: USER})
        const user = new User({login: username, password: hashPassword, roles: [userRole.value]})
        
        await user.save()

        return user
    }
}

export default new authService()