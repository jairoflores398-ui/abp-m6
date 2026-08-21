import express from "express";
import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";

import userRoutes from "./routes/users.routes.js";
import viewsRoutes from "./routes/views.routes.js";



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicPath = path.join(projectRoot, "public");
const logsPath = path.join(projectRoot, "logs", "log.txt");

const app = express();

//INICIO CONFIGURACIÓN DE HANDLEBARS COMO MOTOR DE PLANTILLA 
const hbs = create({
	partialsDir: [
		path.join(__dirname, "views/partials/"),
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//FIN CONFIGURACIÓN DE HANDLEBARS COMO MOTOR DE PLANTILLA 

//MIDDLEWARES GLOBALES
app.use(express.json()); //req.body
app.use(express.urlencoded({extended:true})); //req.body
app.use(express.static(publicPath));

//MIDDLEWARE REGISTRO DE LOGS

app.use((req, res, next) => {
	const now = new Date();
	const date = now.toLocaleDateString("es-CL");
	const time = now.toLocaleTimeString("es-CL");
	const logLine = `${date} ${time} - ${req.method} ${req.originalUrl}\n`;

	fs.appendFile(logsPath, logLine, (error) => {
		if (error) {
			console.error("No se pudo registrar la visita:", error.message);
		}
	});

	console.log(req.method, req.originalUrl);
	next();
});	

//ESTABLECER LAS RUTAS DE LAS VISTAS
app.use("/", viewsRoutes);

//ESTABLECER LAS RUTAS DE LA API
app.use(["/api/users", "/api/usuarios"], userRoutes);

export default app;
