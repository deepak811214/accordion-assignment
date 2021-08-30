import React, { useState, useEffect } from "react";
import Accordion from "../components/Accordion";
import { actions as fetchActions } from "./okrsDuck";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../styles/home.css";

function Home(props) {
  const [parent, setParent] = useState([]);
  const [childObjectives, setchildObjectives] = useState([]);
  const [value, setValue] = useState("");
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    if (props.okrsData.data.length > 0) {
      formatData(props.okrsData.data);
    } else {
      props.actions.fetchActions.getData();
    }
    console.log(11111111);
  }, [props.okrsData.data]);

  /*
    Filter Parent Objectives based on categories
  */
  const handleChange = (e) => {
    setValue(e.target.value);
    let targetValue = e.target.value.toLowerCase();
    let filteredOkr = repo.filter((ele) =>
      ele.category.toLowerCase().includes(targetValue)
    );
    setParent(filteredOkr);
  };

  /*
  Fromat and store json data into two array based on Parent Objectives or Child Objectives
  This will happen for the first time only.
  */
  const formatData = (okrsData) => {
    let parentObjectives = [];
    okrsData.length &&
      okrsData.forEach((item) => {
        if (!item.parent_objective_id) {
          parentObjectives.push(item);
          childObjectives[item.id] = [];
        } else {
          if (!childObjectives[item.parent_objective_id]) {
            childObjectives[item.parent_objective_id] = [];
          }
          childObjectives[item.parent_objective_id].push(item);
        }
      });
    setchildObjectives(childObjectives);
    setParent(parentObjectives);
    setRepo(parentObjectives);
  };

  return (
    <>
      <div className="filter">
        <input
          type="text"
          value={value}
          placeholder="Filter"
          onChange={(e) => handleChange(e)}
        />
        <div>{value ? "Total " + parent.length + " Categories" : ""}</div>
      </div>
      {props.okrsData.loading ? (
        "Loading.........."
      ) : (
        <ol className="accordion">
          {parent.length > 0 &&
            parent.map(({ title, id }) => (
              <Accordion
                key={id}
                id={id}
                content={childObjectives[id]}
                title={title}
              />
            ))}
        </ol>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    okrsData: state.okrsReducer,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchActions: bindActionCreators(fetchActions, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
