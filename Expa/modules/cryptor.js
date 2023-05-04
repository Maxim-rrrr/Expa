import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + "/../../";

class Cryptor {
    generateSecretKey() {
        const key = crypto.randomBytes(16).toString("hex");
        const algorithm = "aes256";

        fs.readdir(__dirname + "/Expa", function (err, items) {
            if (!items.find((i) => i === "key.json")) {
                fs.writeFileSync(
                    `${__dirname}/Expa/key.json`,
                    JSON.stringify({
                        key,
                        algorithm
                    })
                );
                console.log(chalk.green("Key created successfully."));
            } else {
                console.log(chalk.yellow("The key is already there."));
            }
        });
    }

    getSecretKey() {
        const cipherData = fs.readFileSync(`${__dirname}/Expa/key.json`)
        const { key, algorithm } = JSON.parse(cipherData)
        return key
    }

    encrypt(string) {
        const cipherData = fs.readFileSync(`${__dirname}/Expa/key.json`)
        const { key, algorithm } = JSON.parse(cipherData)

        const iv = crypto.randomBytes(8).toString("hex");
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(string, "utf8", "hex");
        encrypted += cipher.final("hex");

        return {
            string: encrypted,
            iv
        };
    }

    decrypt({ string, iv }) {
        const cipherData = fs.readFileSync(`${__dirname}/Expa/key.json`)
        const { key, algorithm } = JSON.parse(cipherData)

        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(string, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    }

    async scryptHash(string, salt) {
        // Выбираем соль. Если соль есть - используем ее(нужно для сопоставления уже имеющихся данных), если нет - генерируем сами и возвращаем
        const saltInUse = salt || crypto.randomBytes(16).toString('hex')
        // Создаем хеш. Первый параметр scrypt - данные, второй - соль, третий - выходная длина хеша
        const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32)
        // Хеш переделываем в строку
        return `${(hashBuffer).toString('hex')}:${saltInUse}`
    }

    async scryptVerify(testString, hashAndSalt) {
        const [, salt] = hashAndSalt.split(':')
        return await scryptHash(testString, salt) === hashAndSalt
    }
}

export default new Cryptor();
