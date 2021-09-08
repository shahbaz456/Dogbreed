import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
// import Card from "../Cards/Card";
export default function Homepage() {
  return (
    <div className="texxt">
      <h1>Select the dog breed</h1>
      <Link activeClassName="selected" exact to="/home">
        <button className="go-to">--Go to Homepage--</button>
      </Link>
    </div>
  );
}
