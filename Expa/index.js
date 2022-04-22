import Config from './modules/config.js'
import Cryptor from './modules/cryptor.js';
import logger from './modules/logger.js'
import DB from './modules/db.js'

class Expa {
    config = Config;
    cryptor = Cryptor;
    logger = logger;
    db = DB;
}

export default new Expa()