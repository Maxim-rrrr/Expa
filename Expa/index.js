import fs from 'fs'

import Config from './modules/config.js'
import Cryptor from './modules/cryptor.js';
import logger from './modules/logger.js'
import DB from './modules/db.js'
import Auth from './modules/Auth/index.js';

class Expa {
    config = Config;
    cryptor = Cryptor;
    logger = logger;
    db = DB;
    auth = Auth
}

export default new Expa()