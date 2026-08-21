import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const readFileJson = (filename) => {
    let pathFile = path.join(__dirname, "..", "db", filename);

    if(!fs.existsSync(pathFile)){
        throw new Error(`El archivo "${filename}" no existe.`);
    }

    let data = fs.readFileSync(pathFile, "utf-8");
    return JSON.parse(data);
}


export const writeFileJson = (filename, data) => {
    let pathFile = path.join(__dirname, "..", "db", filename);

    if(!fs.existsSync(pathFile)){
        throw new Error(`El archivo "${filename}" no existe.`);
    }
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 4), "utf-8");
    return true;
}