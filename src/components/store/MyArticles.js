import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UserArticles } from "../../actions";
import BackNav from "../group/BackNav";
import MyArticleItems from "./MyArticleItems";

export const MyArticles = (props) => {
  useEffect(() => {
    if (props.info._id) {
      const id = props.info._id;
      props.UserArticles(id);
    }
  }, [props.info]);
  let artitlesArray;
  if (props.userArticle) {
    artitlesArray = props.userArticle.map((el, index) => {
      return <MyArticleItems data={el} key={el._id}></MyArticleItems>;
    });
  }
  return (
    <div>
      {props.match.params.id && (
        <BackNav data={props.match.params.id}></BackNav>
      )}
      {props.isLoggedIn ? (
        <>
          <div className="articles-box">
            <div className="articles-items">{artitlesArray}</div>
          </div>
        </>
      ) : (
        <>
          <div className="log-container">
            <p>Please you must log in to continue </p>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  isLoggedIn: state.isLoggedIn,
  userArticle: state.userArticle,
});

export default connect(mapStateToProps, { UserArticles })(MyArticles);
