import "./style.css";
import { Link } from "react-router-dom";
import IconCard from "../../assets/icons/iconCard";

export default function Card({
  episodio,
  nomeEpisodio,
  temporada,
  dataLancamento,
  quantidadePersonagens,
  rotaEpisodio = "https://google.com",
}) {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-0 shadow p-3 mb-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div className="icon">
              <IconCard />
            </div>
            <div className="ms-2 c-details">
              <h6 className="mb-0">{episodio}</h6>
            </div>
          </div>
          <div className="badge">
            {" "}
            <span>{temporada}</span>{" "}
          </div>
        </div>
        <div
          className="d-flex justify-content-between flex-column pt-2"
          style={{ height: "90%" }}
        >
          <h3 className="heading">{nomeEpisodio}</h3>
          <div className="d-flex flex-column gap-2">
            <span className="text1">
              Quantidade Personagens: <span className="text2">{quantidadePersonagens}</span>
            </span>{" "}
            <span className="text1">
              Lançamento: <span className="text2">{dataLancamento}</span>
            </span>{" "}
          </div>
          <Link to={rotaEpisodio} target="_blank" className="btn btn-dark btn-sm">
            Ver detalhes do episodio
          </Link>
        </div>
      </div>
    </div>
  );
}
