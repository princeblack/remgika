import React, { useState, useEffect } from "react";
import EventsAutocomplete from "./EventsAutocomplete"
import "../../scss/MainEventsground.scss";

const MainEvents = () => {
  const [startDate, setStartDate] = useState(new Date());
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

export default MainEvents;
