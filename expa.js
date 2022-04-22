import Expa from "./Expa/index.js";
import chalk from 'chalk';

switch (process.argv[2]) {
    case '-h':
    case 'help':
        help();
        break;
    case 'init':
        init();
        break;
    case 'db:createRoles':
        createRoles();
        break;
    default:
        console.log('Options not found');
        break;
}

function help() {
    console.log(chalk.green('node expa <command>\n'))
    console.log(chalk.cyan('Usage:\n'))
    console.log('node expa <command> -h\t\t' + chalk.blackBright('quick help on <command>'))
    console.log('node expa init\t\t\t' + chalk.blackBright('project initialization'))
    console.log('node expa db:createRoles\t' + chalk.blackBright('adding user roles to the database'))
}

function init() {
    if (process.argv[3] == '-h') {
        console.log(chalk.green('node expa init\n'))
        console.log(chalk.cyan('Project initialization.\n'))
        console.log(chalk.blackBright('1. Create a configuration folder'))
        console.log(chalk.blackBright('2. Application secret key generation'))
    } else {
        Expa.config.createConfig()
        Expa.cryptor.generateSecretKey()
    }
}

function createRoles() {
    if (process.argv[3] == '-h') {
        console.log(chalk.green('node expa db:createRoles\n'))
        console.log(chalk.cyan('Adding User Roles to the Database.\n'))
        console.log(chalk.blackBright('The list of roles can be found in ') + chalk.blue('Expa/rolesList.js'))
    } else {
        Expa.db.createRoles()
    }
}