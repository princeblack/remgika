import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import close from "../../img/close.svg";
import EventImage from "./EventImage";
import { updateGroupevents, getAllGroupevents, deleteGroupEvent } from "../../actions/index";

const EventItems = (props) => {
  const [eventName, setEventName] = useState();
  const [address, setAddress] = useState();
  const [started, setStarted] = useState();
  const [ended, setEnded] = useState();
  const [description, setDescription] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    setAddress(props.data.address);
    setDescription(props.data.description);
    setEnded(props.data.end);
    setEventName(props.data.eventName);
    setStarted(props.data.start);
  }, [props.data]);

  const imgCollection = props.data.imgCollection;
  let image;
  image = imgCollection.map((el, index) => {
    return <EventImage data={el} key={index}></EventImage>;
  });

  const data = props.data;
  const index = props.playIndex;
  const newDate = new Date(data.start);
  const newEndDate = new Date(data.end);
  const dateStart = moment(newDate);
  const dateEnd = moment(newEndDate);
  const start = moment(dateStart).format("dddd, MMMM D, h:mm A");
  const end = moment(dateEnd).format("dddd, MMMM D, h:mm A");

  const toggle = () => {
    setToggling(true);
  };

  const toggleClass = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (props.groupEventIsUpdate) {
      setTimeout(() => {
        toggleClass(index)
      }, 2000);
    }
 }, [props.groupEventIsUpdate])

  const handleDateStart = (e) => {
    setStarted(e);
  };
  const handleDateEnd = (e) => {
    setEnded(e);
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleEventName = (e) => {
    e.preventDefault();
    setEventName(e.target.value);
  };
  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  const handlDelete = () => {
    const id = props.data._id;
    props.deleteGroupEvent(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("eventName", eventName);
    data.append("address", address);
    data.append("start", started);
    data.append("end", ended);
    data.append("description", description);
    const id = props.data._id;    
    props.updateGroupevents(data, id);
  };
  
  return (
    <div className="event-item">
      {image}
      <div className="eventTitle">
        <h4>{data.eventName}</h4>
      </div>
      {!toggling && <p className="more" onClick={toggle}> {toggling ? "Less" : "Read more"}</p>}
      {toggling && (
        <>
          <div className="addressItem">
            <span>Place:</span>
            <p>{data.address}</p>
          </div>
          <div className="addressItem">
            <span>Start:</span>
            <p>{start}</p>
          </div>
          <div className="addressItem">
            <span>End:</span>
            <p>{end}</p>
          </div>
          <div className="description">
            <p>{data.description}</p>
            <button onClick={handlDelete}> Delete</button>
            <button className="updatePlay" onClick={() => toggleClass(index)}>
              Update
            </button>
          </div>
        </>
      )}

      {/**********************************************************
       **********************************************************
       ***************** UPDATE Events  FORM ********************
       **********************************************************
       ***********************************************************/}
      <Collapse isOpened={activeIndex === index}>
        <div
          className={classNames("update-form", {
            show: activeIndex === index,
            hide: activeIndex !== index,
          })}
        >
          <div className="close-item">
            <img
              src={close}
              alt="close"
              className="close"
              onClick={() => toggleClass(this, index)}
            ></img>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="row flex-revcol-left">
                <input
                  className="input-transition"
                  name="eventName"
                  type="text"
                  value={eventName}
                  placeholder="Events name"
                  onChange={handleEventName}
                  id="title"
                  required
                />
              </div>
              <div className="row flex-revcol-left">
                <input
                  className="input-transition"
                  name="address"
                  type="text"
                  value={address}
                  placeholder="Addresse"
                  onChange={handleAddress}
                  id="street"
                  required
                />
              </div>
              <div className="calender">
                <div className="StartCalender">
                  <p className="Start">Start :</p>
                  <DatePicker
                    name="start"
                    selected={newDate}
                    onChange={(date) => handleDateStart(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    showYearDropdown
                    scrollableYearDropdown
                    required
                    dateFormat="MM/dd/yyyy HH:mm aa"
                    showTimeInput
                    timeInputLabel="Time:"
                    timeCaption="Time"
                  >
                    <div style={{ color: "red" }}>
                      Don't forget to check the weather!
                    </div>
                  </DatePicker>
                </div>
                <div className="EndCalender">
                  <p className="End">End :</p>
                  <DatePicker
                    name="end"
                    selected={newEndDate}
                    onChange={(date) => handleDateEnd(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    showYearDropdown
                    scrollableYearDropdown
                    required
                    dateFormat="MM/dd/yyyy HH:mm aa"
                    showTimeInput
                    timeInputLabel="Time:"
                    timeCaption="Time"
                  >
                    <div style={{ color: "red" }}>
                      Don't forget to check the weather!
                    </div>
                  </DatePicker>
                </div>
              </div>
              <div className="row flex-revcol-left">
                <textarea
                  className="input-transition"
                  name="description"
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={handleInputChange}
                  id="description"
                  required
                  maxLength={150}
                  cols="40"
                  rows="10"
                />
              </div>
              <button className="addPlay-submit" type="Submit"  value="Submit" > Update </button>
            </form>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groupEventIsUpdate: state.groupEventIsUpdate,
    GroupEventIsDelete: state.GroupEventIsDelete
  };
};

export default connect(mapStateToProps, { updateGroupevents, getAllGroupevents,deleteGroupEvent })(EventItems);
