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

  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
  return await response.json();
}
