import { CallFecth } from "./fetch";

export async function getEpisodesFavoritos ({ ids }) {
  let query
  const idsFormatted = ids.map((id) => Number(id)).join(",");
  query = {
    query: `
      query {
        episodesByIds(ids: [${idsFormatted}]) {
          id
          name
          episode
          air_date
          characters {
            id
            name
            image
          }
        }
      }
    `,
  };

  return  CallFecth(query).then(item => item)
}
