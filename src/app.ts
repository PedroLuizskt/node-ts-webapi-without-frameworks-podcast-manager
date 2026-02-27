import * as http from "http";
import { getListEpisodes, getFilterEpisodes } from "./controllers/podcasts-controller";
import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";

export const app = async (
    request: http.IncomingMessage,
    response: http.ServerResponse
) => {
    // Implementação de CORS (Segurança e Integração com Front-end)
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
    }

    const [baseUrl, queryString] = request.url?.split("?") ?? ["", ""];

    // Roteamento centralizado
    if (request.method === HttpMethod.GET && baseUrl === Routes.LIST) {
        await getListEpisodes(request, response);
        return;
    }

    if (request.method === HttpMethod.GET && baseUrl === Routes.EPISODE) {
        await getFilterEpisodes(request, response);
        return;
    }

    // Tratamento de Rota Não Encontrada (Fallback 404)
    response.writeHead(404, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ message: "Rota não encontrada na API do PodManager." }));
    response.end();
};