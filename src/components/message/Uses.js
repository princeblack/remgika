import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {  refre } from "../../actions";

const Uses = (props) => {
  const handleClick = (e)=>{
   props.refre(props.data.user[0],)
   props.toggle(props.data.user[0]._id)
  }
  return (
    <>
      
      {props.info._id &&  props.data.user[0]._id && (
        // <NavLink to={`Chat/${props.data.user[0]._id}/Messager`}>
        <div className="user-box" id={`${props.data.user[0]._id}`} onClick={handleClick}>
          <img src={props.data.user[0].imgCollection} alt="user"></img>
          <div className={`info`} id={props.data.count > 0 && "newMessage"}>
            <p>
              {props.data.user[0].firstName +
                " " +
                props.data.user[0].lastName +
                " "}
              { props.data.count > 0&& ( 
                <span> ({props.data.count})</span>
              )}

            </p>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  allMsg: state.allMsg,
  countMsg: state.countMsg,
});

export default connect(mapStateToProps, {refre})(
  Uses
);

