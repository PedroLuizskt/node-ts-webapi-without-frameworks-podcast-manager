#Podcast Menager

### Descrição
Um app ao estilo netflix, aonde possa centralizar diferentes episódios podcasts separados por categoria

### Domínio

Podcasts feitos em vídeo

### Features
-Listas os pdcasts em sessões de categorias
- [saúde, fitness, mentalidade, humor]
- Filtrar episódio por nome de podcast

## Como

####Feature:
- Listar os episódios podcastes em sessões de categorias

### Como vou implementar

Vou retornar em uma api rest (json) o nome podcast, nome do episódio, imagem de copa, link

```js
{
    podcastName: "Flow"
    episode: "CBUM - Flow 319",
    videoId: ,
    cover:,
    link:,
    category: ["saude", "bodybuilder"]
}
```