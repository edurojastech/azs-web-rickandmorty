/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import { getEpisodes } from "../../API/getEpisodios";
import { getEpisodesFavoritos } from "../../API/getEpisodiosFavoritos";
import { useState, useEffect } from "react";
import formatarParaBrasil from "../../utils/fortamarData";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from 'react-toastify';

export default function Episodios() {
  const [temporada, setTemporada] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [listIds, setListIds] = useState([]);
  const [episodiosData, setEpisodiosData] = useState([]);
  const [typeData, setTypeData] = useState("episodes");
  const [loading, setLoading] = useState(true);

  function listarFavoritos() {
    if(listIds.length > 0) {
      setTypeData("")
      setLoading(true)
      getEpisodesFavoritos({ ids: listIds })
      .then((data) => {
        setEpisodiosData(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err))
    } else {
      const notify = () => toast("Nenhum favorito selecionado!")
      notify()
    }
  }

  function favoritar(id) {
    setListIds((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((item) => item !== id); // remove
      } else {
        return [...prevList, id]; // adiciona
      }
    });
  }

  function listarTodos() {
    setLoading(true);
    setTypeData("episodes");
    getEpisodes(temporada)
      .then((data) => {
        setEpisodiosData(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    listarTodos();
  }, [temporada]);

  return (
    <main>
      <Header>
        <div style={{ width: "25%" }}>
          <div className="input-group mb-3">
            <input
              value={pesquisa}
              type="text"
              className="form-control"
              placeholder="Pesquisar episodio"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <span className="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-light"
              onClick={() => {
                setTemporada("");
                listarTodos();
              }}
            >
              Todos os Episódios
            </button>
            <button className="btn btn-light" onClick={listarFavoritos}>
              Favoritos
            </button>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-2">
            <button
              className="btn btn-light"
              onClick={() => {
                setTemporada("S01E");
                setTypeData("episodes");
              }}
            >
              Temporada 1
            </button>
            <button
              className="btn btn-light"
              onClick={() => {
                setTemporada("S02E");
                setTypeData("episodes");
              }}
            >
              Temporada 2
            </button>
          </div>
        </div>
      </Header>
      <div id="Cards" className="row mt-5 px-5">
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          (typeData === "episodes"
            ? episodiosData?.episodes?.results
            : episodiosData?.episodesByIds
          )?.map((ep, index) => {
            return (
              <div className="col-xl-3" key={ep?.id}>
                <Card
                  favorito={listIds?.includes(ep.id)}
                  episodio={`Episódio ${index + 1}`}
                  nomeEpisodio={ep.name}
                  quantidadePersonagens={ep?.characters.length}
                  dataLancamento={formatarParaBrasil(ep?.air_date)}
                  episodioId={ep?.id}
                  temporada={
                    temporada === "S01E"
                      ? "Temporada 1"
                      : temporada === "S02E"
                      ? "Temporada 2"
                      : ""
                  }
                  favoritar={() => favoritar(ep?.id)}
                />
              </div>
            );
          })
        )}
      </div>

      <ToastContainer />
    </main>
  );
}
