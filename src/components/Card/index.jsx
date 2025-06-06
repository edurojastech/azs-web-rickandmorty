import "./style.css";
import { Link } from "react-router-dom";
import IconCard from "../../assets/icons/iconCard";
import IconFavoriteOff from "../../assets/favoriteOff.svg";
import IconFavoriteOn from "../../assets/favoriteOn.svg";


export default function Card({
  episodio,
  nomeEpisodio,
  favorito = false,
  dataLancamento,
  quantidadePersonagens,
  episodioId = 'teste',
  favoritar
}) {
  
  return (
    <div className="card border-0 shadow p-3 mb-2">
        <div className="d-flex justify-content-between" id="card-header">
          <div className="d-flex flex-row align-items-center" id="card-icon">
            <div className="icon">
              <IconCard />
            </div>
            <div className="ms-2 c-details">
              <h6 className="mb-0">{episodio}</h6>
            </div>
          </div>
          <div className="d-flex pt-1">
            <img
              src={favorito ? IconFavoriteOn : IconFavoriteOff}
              alt="favorito"
              width={28}
              height={28}
              style={{ cursor: "pointer" }}
              onClick={favoritar}
            />
          </div>
        </div>
        <div
          className="d-flex justify-content-between flex-column pt-2"
          style={{ height: "90%" }}
        >
          <h3 className="heading">{nomeEpisodio}</h3>
          <div className="d-flex flex-column gap-2">
            <span className="text1">
              Quantidade Personagens:{" "}
              <span className="text2">{quantidadePersonagens}</span>
            </span>{" "}
            <span className="text1">
              Lançamento: <span className="text2">{dataLancamento}</span>
            </span>{" "}
          </div>
          <Link
            to={`/episodio/${episodioId}`}
            className="btn btn-dark btn-sm"
          >
            Ver detalhes do episodio
          </Link>
        </div>
      </div>
  );
}
