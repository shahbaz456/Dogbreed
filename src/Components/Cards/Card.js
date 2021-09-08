import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

import Model from "../Modal/Model";
import { useLocation, useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const [search, setsearch] = useState("");
  useLocation();
  let queryStr = useQuery();
  let ref = useRef();

  const loc = useLocation();
  const hist = useHistory();
  console.log("loc :: ", loc);
  // console.log("useParams :: ", qParam);
  console.log("hist :: ", hist);

  const [currentidx, setcurrentidx] = useState(queryStr.get("index"));
  const dispatch = useDispatch();
  const { breads, breadImages } = useSelector((state) => state.data);
  const [selectbreed, setselectbreed] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleClick = async (search) => {
    await fetch(`https://dog.ceo/api/breeds/list/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log("show data of ", data);
        dispatch({ type: "LIST_BREADS", payload: Object.keys(data.message) });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const getImage = async (breed) => {
    await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((response) => response.json())
      .then((data) => {
        console.log("show data of ", data);

        dispatch({ type: "GET_BREAD_IMAGES", payload: data.message });
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
        if (!!queryStr.get("breed")) {
          await getImage(queryStr.get("breed"));
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

  const breakPoints = [{ width: 800, itemsToScroll: 3, itemsToShow: 7 }];

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
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="list-item">
        {breads.length > 0 && (
          <div className="butn">
            <Carousel breakPoints={breakPoints} pagination={false}>
              {breads
                .filter((item) =>
                  item.toLowerCase().includes(search.toLowerCase())
                )
                .map((element, index) => (
                  <button
                    button
                    className="all-btn"
                    onClick={() => {
                      hist.push(`/home?breed=${element}`);
                      setselectbreed(element);
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
          {breadImages.length > 0 &&
            breadImages.map((item, index) => {
              return (
                <div className="single-image">
                  <img
                    src={item}
                    alt=""
                    onClick={() => {
                      hist.push(
                        `/home?modal=${true}&breed=${selectbreed}&idx=${index}`
                      );
                      setcurrentidx(index);
                      toggle();
                    }}
                  />
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
