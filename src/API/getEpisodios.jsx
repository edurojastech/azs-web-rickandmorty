import { CallFecth } from "./fetch";

export const getEpisodes = async (season = "", name = "") => {
  let query = {
    query : `
      query {
        episodes(filter: { episode: "${season}", name: "${name}" }) {
          results {
            id
            name
            episode
            air_date
            characters {
              id
              name
            }
          }
        }
      }
    `
  }
  return  CallFecth(query).then(item => item)
}