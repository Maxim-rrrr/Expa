import mongoose from "mongoose";
import config  from "./config.js";
import { ALL_ROLES } from '../rolesList.js'
import Role from '../../models/Expa/Role.js'
import chalk from 'chalk';

class DB {
    async createRoles() {
        await mongoose.connect(config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.#createRoles()
    }

    #createRoles() {
        ALL_ROLES.forEach(async (value, index) => {
            await Role.findOne({ value }).then(async (role) => {
                if (!role) {
                    await Role.create({ value }).then(() => {
                         console.log(chalk.green(`Created role: ${value}`))
                    })
                } else {
                     console.log(chalk.yellow(`Role already created: ${value} `))
                }
    
                if (index + 1 === ALL_ROLES.length) {
                    mongoose.disconnect()
                }
            })
        })
    }
}

export default new DB()