import "./styles.css";
import { useQuery } from "@apollo/client";
import { getEpisodes } from "../../API/getEpisodios";
import { useState } from "react";
import formatarParaBrasil from "../../utils/fortamarData";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

export default function Episodios() {
  const [temporada, setTemporada] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const { data, loading, error } = useQuery(getEpisodes(temporada));

  function pesquisarEpisodio (ep) {
    alert(ep)
  }

  return (
    <main>
      <Header>
        <div style={{ width: "25%" }}>
          <div class="input-group mb-3">
            <input
              value={pesquisa}
              type="text"
              class="form-control"
              placeholder="Pesquisar episodio"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <span 
              class="input-group-text" 
              id="basic-addon1"
              onClick={() => pesquisarEpisodio(pesquisa)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-light"
              onClick={() => setTemporada("")}
            >
              Todos os Episódios
            </button>
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
      </Header>
      <div id="Cards" className="row mt-5 px-5">
        { loading && <div className="text-center"><Loader /></div> }
        { error && <p>Erro: {error.message}</p> }
        {data?.episodes?.results?.map((ep, index) => {
          return (
            <div className="col-xl-3">
              <Card
                episodio={`Episódio ${index + 1}`}
                nomeEpisodio={ep.name}
                quantidadePersonagens={ep.characters.length}
                dataLancamento={formatarParaBrasil(ep.air_date)}
                episodioId={ep.id}
                temporada={temporada == "S01E" ? "Temporada 1" : "Temporada 2"}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}