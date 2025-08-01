import React from "react";

export default function ImageModal({ imageUrl, onClose,name }) {

    // console.log("The image url come",imageUrl)
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={imageUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "70vh" }}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
