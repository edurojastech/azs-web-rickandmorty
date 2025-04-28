import './styles.css'
import { useQuery } from "@apollo/client";
import { getEpisodesBySeason } from "../../API/getEpisodios";
import { useState } from "react";
import formatarParaBrasil from '../../utils/fortamarData';
import Card from '../../components/Card'
import Header from '../../components/Header';

export default function Intro () {
  const [temporada, setTemporada] = useState("S01E");
  const { data, loading, error } = useQuery(getEpisodesBySeason(temporada));
  if (loading) return <p className='text-center text-white'>Carregando...</p>
  if (error) return <p>Erro: {error.message}</p>

  return (
    <main>
      <Header>
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
      </Header>
      <div id='Cards' className='row mt-5 px-5'>
        {
          data.episodes.results.map((ep, index) => {
            return (
              <div className='col-xl-3'>
                <Card
                  episodio={`Episódio ${index + 1}`}
                  nomeEpisodio={ep.name}
                  quantidadePersonagens={ep.characters.length}
                  dataLancamento={formatarParaBrasil(ep.air_date)}
                  episodioId={ep.id}
                  temporada={temporada == "S01E" ? "Temporada 1" : "Temporada 2"}
                />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}