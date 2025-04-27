import { useQuery } from "@apollo/client";
import { getEpisodesBySeason } from "../../API/getEpisodios";
import { useState } from "react";
import Card from "../../components/Card";
import "./styles/index.css";
import formatarParaBrasil from "../../utils/fortamarData";

export default function TodosEpisodios() {
  const [temporada, setTemporada] = useState("S01E");
  const { data, loading, error } = useQuery(getEpisodesBySeason(temporada));
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <>
      <header className="text-center py-5 mb-4" style={{ backgroundColor: '#22223a'}}>
        <div className="container">
          <h1 className="fw-light text-white mb-3">The Rick and Morty</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <button
              className="btn btn-light"
              onClick={() => setTemporada("S01E")}
            >
              Temporada 1
            </button>
            <button
              className="btn btn-light"
              onClick={() => setTemporada("S02E")}
            >
              Temporada 2
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          {data.episodes.results.map((ep, index) => {
            return (
              <Card
                episodio={`Episódio ${index + 1}`}
                nomeEpisodio={ep.name}
                quantidadePersonagens={ep.characters.length}
                dataLancamento={formatarParaBrasil(ep.air_date)}
                temporada={temporada == "S01E" ? "Temporada 1" : "Temporada 2"}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}