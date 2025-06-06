export async function CallFecth (query) {
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  })
  return await response.json();
}