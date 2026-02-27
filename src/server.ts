import * as http from "http";
import { app } from "./app";

const port = process.env.PORT || 3333;

// O server agora apenas inicializa e delega as requisições para o app.ts
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`🚀 Servidor PodManager iniciado na porta ${port}`);
});