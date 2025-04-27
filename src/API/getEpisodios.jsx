import { gql } from "@apollo/client";

// Função para criar a consulta dinamicamente
export const getEpisodesBySeason = (season) => gql`
  query {
    episodes(filter: { episode: "${season}" }) {
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
