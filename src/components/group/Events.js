import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../scss/groupEvents.scss";
import EventFormular from "./EventFormular";
import { getAllGroupevents } from "../../actions/index";
import  EventItems  from "./EventItems";

export const Events = (props) => {
  const [show, setHide] = useState(false);
  const id = props.data._id;

  useEffect(() => {
    props.getAllGroupevents(id);
  }, [id]);

//   useEffect(() => {
//     if (props.addGroupEvent) {
//       props.getAllGroupevents(id);
//       setHide(false);
//     }
//   }, [props.addGroupEvent]);
useEffect(() => {
  if (props.groupEventIsUpdate) {
      props.getAllGroupevents(id)
  }
  if (props.GroupEventIsDelete) {
    props.getAllGroupevents(id)
  }
}, [props.groupEventIsUpdate, props.GroupEventIsDelete])

   useEffect(() => {
      async function f() {
        if (props.addGroupEvent) {
          setTimeout(() => {
            props.getAllGroupevents(id);
            setHide(false);
          }, 3000);
        }
      }
      f();
    }, [props.addGroupEvent]);




  const onClik = (e) => {
    setHide(true);
  };
  const data = props.groupEvents.reverse();
  let event;
  event = data.map((el, index) => {
    return <EventItems playIndex={index} data={el} key={el._id}></EventItems>;
  });
  if (data.length === 0) {
    event = <span>There is no event available</span>;
  }

  let member = false;
  if ( props.info.group) {
    for (let i = 0; i <  props.info.group.length; i++) {
      if (props.data._id ===  props.info.group[i]) {
        member = true;
      }
    }
  }

  return (
    <div className="groupEvent">
      {!show && (
        <>
        {member && 
           <div className="addButton">
           <button onClick={onClik}>Create an event</button>
         </div>
        }
         
          <div className="title">
            <span>Coming events</span>
          </div>
        </>
      )}
      {show ? (
        <EventFormular data={props.data}></EventFormular>
      ) : (
        <div className="event-container">{event}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addGroupEvent: state.addGroupEvent,
    groupEvents: state.groupEvents,
    groupEventIsUpdate: state.groupEventIsUpdate,
    GroupEventIsDelete: state.GroupEventIsDelete,
    info: state.info,
  };
};

export default connect(mapStateToProps, { getAllGroupevents })(Events);
