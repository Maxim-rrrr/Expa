import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import config from "config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + '/../../'


class Config {
    startConf = {
        "port": 4000,
        "url_main_page": "localhost:4000",
        "mongoUrl": "",
        "nameInEmail": "",
        "emailSendMessage": "",
        "passSendMessage": "",
    
        "logger_console": true,
        "logger_file": true,
        "logger_mongoDB": false
    }

    createConfig() {
        fs.mkdir(__dirname + '/config', err => {
            if(err) {
                console.log(chalk.yellow('Сonfig folder already created.'))
            } else {
                fs.writeFileSync(`${__dirname}/config/default.json`, JSON.stringify(this.startConf, null, '\t'))
                fs.writeFileSync(`${__dirname}/config/product.json`, JSON.stringify(this.startConf, null, '\t'))
                console.log(chalk.green("Config created successfully."));
            }
        });
    }

    get(key) {
        return config.get(key)
    }
}

export default new Config()