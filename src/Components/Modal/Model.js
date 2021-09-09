// import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
// import breadsReducer from "../../reducers/listreducer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Model = ({ modal, toggle, currentidx }) => {
  const hist = useHistory();
  let queryStr = useQuery();
  const { breedImages } = useSelector((state) => state.data);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="headmine">Dog Image</ModalHeader>

        <ModalBody>
          {breedImages.length > 0 && (
            <div className="mdbody">
              <img src={breedImages[currentidx]} alt="" />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <a href={breedImages[currentidx]} download="download.jpg">
            download
          </a>

          <Button
            color="secondary"
            onClick={() => {
              hist.push(`/home?breed=${queryStr.get("breed")}&modal=${false}`);
              toggle();
            }}
          >
            close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Model;
