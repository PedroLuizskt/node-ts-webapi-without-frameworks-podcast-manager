import { PodcastTransferModel } from "../models/Podcast-Transfer-Model";
import { repositoryPodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (
    podcastName: string | undefined
):Promise<PodcastTransferModel> => {

    let responseFormat: PodcastTransferModel = {
        statusCode: 200,
        body: [],
    };
    
    // Tratamento para garantir que caracteres especiais ou espaços não quebrem a busca
    const rawQueryString = podcastName?.split("?p=")[1] || "";
    const queryString = decodeURIComponent(rawQueryString);
    
    const data = await repositoryPodcast(queryString);

    responseFormat.statusCode = data.length !== 0 ? StatusCode.OK : StatusCode.NoContent;
    responseFormat.body = data; 

    return responseFormat;
};