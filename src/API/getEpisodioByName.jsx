import { gql } from "@apollo/client";

export const getEpisodesByName = (name) => gql`
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
`



