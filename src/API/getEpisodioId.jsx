import { gql } from "@apollo/client";

export const getEpisodesById = (id) => gql`
  query {
    episode(id: ${id}) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image,
        status,
        type
      }
    }
  }
`