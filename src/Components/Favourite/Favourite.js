import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "reactstrap";
import { BsHeartFill } from "react-icons/all";

export default function Favourite() {
  const favImage = useSelector((state) => state.data.favImage);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="bread">
        <h1 className="fontt">Dog breed</h1>

        <div className="search-field">
          <div className="input-group mb-0">
            <input
              type="search"
              //   value={search}
              placeholder="Search Favourite Breeds..."
              aria-label="Search"
              className="form-control"
              onChange={(e) => {
                // setsearch(e.target.value);
                // dispatch({ type: "FILTER_BREEDS", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <Link to="/home">
          <div className=" fav">
            <button className="fav-btn">Homepage</button>
          </div>
        </Link>
      </div>
      <div className="outer">
        <div className="imagess">
          {favImage.map((item) => {
            return (
              <div className="single-image">
                <Card className="card-div">
                  <img src={item} alt="" />
                  <button
                    className="heart"
                    onClick={() =>
                      dispatch({ type: "UNLIKE_IMAGE", payload: item })
                    }
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
        </div>
      </div>
    </div>
  );
}
