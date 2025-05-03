import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEpisodesById } from "../../API/getEpisodioId";
import "./style.css";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

export default function Episodio() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(getEpisodesById(id));
  return (
    <>
      <Header />
      { loading && <div className="text-center"><Loader /></div> }
      {error && <p>Erro: {error.message}</p>}
      {!loading && (
        <div className="container-fluid pb-5 text-white px-5 paddingCustom">
          <div className="d-flex gap-2 align-content-center my-3" id="titleCapitulo">
            <Link
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#fff",
              }}
              to={"/"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-arrow-bar-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </Link>
            <h2>
              Titulo: <small>{data?.episode?.name}</small>
            </h2>
          </div>
          <hr />
          <div className="row px-3">
            <div className="col-md-9">
              <h3 className="my-3">Detalhes do Episódio</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
                Sed dui lorem, adipiscing in adipiscing et, interdum nec metus.
                Mauris ultricies, justo eu convallis placerat, felis enim.
              </p>
            </div>
          </div>

          <h3 className="my-4 mx-3">Personagens</h3>
          <div className="row">
            {data?.episode?.characters?.map((item) => {
              console.log(item);
              return (
                <div className="col-lg-3 col-sm-6 mb-4">
                  <div className="card" style={{ height: "90%" }}>
                    <img className="card-img-top" src={item.image} alt="" />
                    <div className="card-body">
                      <h4 className="card-title">
                        {item.name} {item.type ? `- ${item.type}` : ""}
                      </h4>
                      <p>
                        <b>Status: </b>
                        {item.status == "Alive" ? "Vivo" : "Morto"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
