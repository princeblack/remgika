import React from "react";
import EventsAutocomplete from "./EventsAutocomplete"
import "../../scss/MainEventsground.scss";

import { connect } from "react-redux";

const MainEvents = (props) => {  
  return (
    <div className="MainEventsground">
      <>
        <div className="serchBar">
          <EventsAutocomplete />
        </div>
      </>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    eventsList: state.eventsList,
    addEvents: state.addEvents,
  };
};
export default connect(mapStateToProps)(MainEvents);
