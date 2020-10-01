import React, { Component } from "react";
import { connect } from "react-redux";
import "../../scss/articleItems.scss";
import { NavLink } from "react-router-dom";

export const ArticleItems = (props) => {
  return (
    <>
      {props.data && (
        <NavLink to={`/Articles/${props.data._id}/store`}>
          <div className="items-container">
            <div className="image">
              <img src={props.data.imgCollection[0]} alt=""></img>
              <div className="itemOption">
                <span>{props.data.prixOption}</span>
              </div>
            </div>
            <div className="info">
              <p>{props.data.title}</p>
              <span>{props.data.city}</span>
            </div>
          </div>
        </NavLink>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItems);
