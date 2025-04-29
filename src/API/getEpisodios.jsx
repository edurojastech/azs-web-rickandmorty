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
  
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
  return await response.json();
}
