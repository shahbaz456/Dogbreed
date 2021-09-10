import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import Model from "../Modal/Model";
import { useLocation, useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { BsHeartFill } from "react-icons/all";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
// import Favourite from "../Favourite/Favourite";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const [search, setsearch] = useState("");
  useLocation();
  let queryStr = useQuery();
  const loc = useLocation();
  const hist = useHistory();
  console.log("loc :: ", loc);
  // console.log("useParams :: ", qParam);
  console.log("hist :: ", hist);

  const [currentidx, setcurrentidx] = useState(queryStr.get("index"));
  const dispatch = useDispatch();
  const { breeds, breedImages, filterbreeds, favImage } = useSelector(
    (state) => state.data
  );
  const [selectbreed, setselectbreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [isRun, setisRun] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleClick = async (search) => {
    setloading(true);
    await fetch(`https://dog.ceo/api/breeds/list/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log("show data of ", data);
        dispatch({ type: "LIST_BREEDS", payload: Object.keys(data.message) });
        setloading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const getImage = async (breed) => {
    setIsLoading(true);
    await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((response) => response.json())
      .then((data) => {
        console.log("show data of ", data);

        dispatch({ type: "GET_BREED_IMAGES", payload: data.message });
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(
    () => {
      handleClick();

      if (queryStr.get("modal") === "true") {
        setModal(true);
      }
      // }
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      const getData = async () => {
        if (queryStr.get("breed")) {
          setsearch(queryStr.get("breed"));
          setselectbreed(queryStr.get("breed"));
          await getImage(queryStr.get("breed"));
          console.log("BREED :: ", queryStr.get("breed"));
        }
        if (queryStr.get("modal") === "true") {
          setModal(true);
        }
      };
      getData();
    },
    // eslint-disable-next-line
    [queryStr.get("breed")]
  );

  useEffect(
    () => {
      if (!isRun && queryStr.get("breed") && breeds.length > 0) {
        setisRun(true);
        dispatch({ type: "FILTER_BREEDS", payload: queryStr.get("breed") });
      }
    },
    // eslint-disable-next-line
    [breeds]
  );
  const breakPoints = [{ width: 800, itemsToScroll: 3, itemsToShow: 8 }];

  return (
    <div>
      <div className="bread">
        <h1 className="fontt">Dog breed</h1>

        <div className="search-field">
          <div className="input-group mb-0">
            <input
              type="search"
              value={search}
              placeholder="Search Breed..."
              aria-label="Search"
              className="form-control"
              onChange={(e) => {
                setsearch(e.target.value);
                dispatch({ type: "FILTER_BREEDS", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <Link to="/favourite">
          <div className=" fav">
            <button className="fav-btn">Favourites</button>
          </div>
        </Link>
      </div>

      <div className="list-item">
        {loading && (
          <div className="spin">
            <Spinner />
          </div>
        )}
        {breeds.length > 0 && (
          <div className="butn">
            <Carousel breakPoints={breakPoints} pagination={false}>
              {filterbreeds.length > 0 &&
                filterbreeds.map((element, index) => (
                  <button
                    button
                    className={
                      selectbreed === element
                        ? "all-btn active-button"
                        : "all-btn"
                    }
                    // className="all-btn active-button"
                    onClick={() => {
                      hist.push(`/home?breed=${element}`);
                      setselectbreed(element);

                      setsearch(element);
                      getImage(element);
                    }}
                  >
                    {element}
                  </button>
                ))}
            </Carousel>
          </div>
        )}
      </div>

      <div className="outer">
        <div className="imagess">
          {isLoading && (
            <div className="onspin">
              <Spinner />
            </div>
          )}
          {breedImages.length > 0 &&
            breedImages.map((item, index) => {
              return (
                <div className="single-image">
                  <Card className="card-div">
                    <img
                      src={item}
                      alt=""
                      onClick={() => {
                        hist.push(
                          `/home?breed=${selectbreed}&modal=${true}&idx=${index}`
                        );
                        setcurrentidx(index);
                        toggle();
                      }}
                    />
                    <button
                      className="heart"
                      onClick={() => {
                        if (favImage.includes(item)) {
                          dispatch({ type: "UNLIKE_IMAGE", payload: item });
                        } else {
                          dispatch({ type: "LIKE_IMAGE", payload: item });
                        }
                      }}
                    >
                      <BsHeartFill
                        className={
                          favImage.includes(item)
                            ? "like-Hert inactive-button"
                            : "like-Hert"
                        }
                      />
                    </button>
                  </Card>
                </div>
              );
            })}

          <Model
            toggle={toggle}
            modal={modal}
            currentidx={queryStr.get("idx") || currentidx}
          />
        </div>
      </div>
    </div>
  );
}
