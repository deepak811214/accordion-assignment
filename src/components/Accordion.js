import React, { useState } from "react";
import Modal from "./Modal";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const handleClick = (e) => {
    console.log(e);
    setData(e.target.dataset);
    setIsOpen(true);
  };

  return (
    <li className="accordion-item">
      <div
        className={`accordion-title ${
          props.content.length ? (isActive ? "arrow-down" : "arrow-left") : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{props.title}</div>
      </div>
      {isActive && (
        <ol className="accordion-content" onClick={(e) => handleClick(e)}>
          {props.content.length > 0 &&
            props.content.map((item) => (
              <li
                key={item.id}
                className="accordion-key"
                data-id={item.id}
                data-category={item.category}
                data-metric_name={item.metric_name}
                data-metric_start={item.metric_start}
                data-metric_target={item.metric_target}
                data-parent_objective_id={item.parent_objective_id}
                data-archived={item.archived}
              >
                {item.title}
              </li>
            ))}
        </ol>
      )}
      <Modal open={isOpen} dataset={data} onClose={() => setIsOpen(false)} />
    </li>
  );
};

export default Accordion;
