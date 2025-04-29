import { CallFecth } from "./fetch";

export async function getEpisodesByName (name) {
  let query
  query = {
    query: `
      query {
        episodes(filter: { name: "${name}" }) {
          results {
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
      }
    `,
  };

  return  CallFecth(query).then(item => item)
}
