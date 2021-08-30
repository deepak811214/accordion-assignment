import React from "react";
import ReactDOM from "react-dom";

function Modal({ open, dataset, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <button className="close" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <div className="modal-key">
            <div className="modal-item">Id</div>
            <div className="modal-item">Category</div>
            <div className="modal-item">Metric Name</div>
            <div className="modal-item">Metric Start</div>
            <div className="modal-item">Metric Target</div>
            <div className="modal-item">Parent Objective Id</div>
            <div className="modal-item">Archived</div>
          </div>
          <div className="modal-value">
            <div className="modal-item">{dataset.id || "-"}</div>
            <div className="modal-item">{dataset.category || "-"}</div>
            <div className="modal-item">{dataset.metric_name || "-"}</div>
            <div className="modal-item">{dataset.metric_start || "-"}</div>
            <div className="modal-item">{dataset.metric_target || "-"}</div>
            <div className="modal-item">
              {dataset.parent_objective_id || "-"}
            </div>
            <div className="modal-item">{dataset.archived || "-"}</div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
