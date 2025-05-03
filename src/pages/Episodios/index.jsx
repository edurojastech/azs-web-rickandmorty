/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import { getEpisodes } from "../../API/getEpisodios";
import { getEpisodesFavoritos } from "../../API/getEpisodiosFavoritos"
import { getEpisodesByName } from "../../API/getEpisodioByName";
import { useState, useEffect } from "react";
import formatarParaBrasil from "../../utils/fortamarData";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import IconSearch from "../../assets/icons/iconSearch";

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
    setTypeData("episodes")
    getEpisodes(temporada)
    .then((data) => {
      setEpisodiosData(data.data);
      setLoading(false);
    })
    .catch((err) => console.error(err));
  }

  function pesquisarNome () {
    if(pesquisa != '') {
      setLoading(true);
      getEpisodesByName(pesquisa)
      .then((data) => {
        setEpisodiosData(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    }
    
  }

  useEffect(() => {
    listarTodos();
  }, [temporada]);

  return (
    <main>
      <Header>
        <div className="inputButtons">
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
            <IconSearch pesquisar={() => {
              pesquisarNome()
            }} 
            />
          </div>

          <div className="d-flex buttons">
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
          <div className="d-flex buttons">
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
      
      <div id="Cards" className="row mt-5">
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