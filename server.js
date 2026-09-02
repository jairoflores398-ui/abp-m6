import "dotenv/config";
import yargs from 'yargs';
import app from "./src/app.js";
import { connectDatabase } from "./src/db/database.js";

const argv = yargs(process.argv.slice(2))
    .option('p', {
        alias: 'port',
        demandOption: true,
        default: Number(process.env.PORT) || 3000,
        describe: 'Define el puerto del servidor node',
        type: 'number'
    })
    .parse();

const PORT = argv.port;

const startServer = async () => {
    const isDbConnected = await connectDatabase();

    app.listen(PORT, () => {
        console.log("Servidor iniciado en http://localhost:" + PORT);
        console.log(`Estado de BD: ${isDbConnected ? "conectada" : "error de conexión"}`);
    });
};

startServer();