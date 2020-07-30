import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import LoginHeader from "../login-signUp/LoginHeader";
import { postGroupEvent } from "../../actions/index";
import done from "../../img/done.svg";
import blackCalender from "../../img/black-events.svg";
import { Redirect } from "react-router-dom";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EventFormular = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [imgCollection, setimgCollection] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [redirect, setRedirect] = useState(false);
    // useEffect(() => {
    //   async function f() {
    //     if (props.addGroupEvent) {
    //       setTimeout(() => {
    //         setRedirect(true);
    //         props.myEvents();
    //       }, 3000);
    //     }
    //   }
    //   f();
    // }, [props.addGroupEvent]);
    const maxSelectFile = (event) => {
      let files = event.target.files; // create file object
      if (files.length > 1) {
        event.target.value = null; // discard selected file
        return false;
      }
      return true;
    };
  
    const {
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: "string",
      debounce: 300,
    });
  
    const ref = useRef();
    useOnclickOutside(ref, () => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect = ({ description }) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter as "false"
      setValue(description, false);
      // handelCharacters(description);
      clearSuggestions();
  
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {})
        .catch((error) => {});
    };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
        return (
          <li key={id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    const checkMimeType = (event) => {
      //getting file object
      let files = event.target.files;
      //define message container
      let err = "";
      // list allow mime type
      const types = ["image/png", "image/jpeg", "image/gif"];
      // loop access array
      for (var x = 0; x < files.length; x++) {
        // compare file type find doesn't matach
        // eslint-disable-next-line no-loop-func
        if (types.every((type) => files[x].type !== type)) {
          // create error message and assign to container
          err += files[x].type + " is not a supported format\n";
        }
      }
      if (err !== "") {
        // if message not same old that mean has error
        event.target.value = null; // discard selected file
        return false;
      }
      return true;
    };
  
    const handlefiles = (event) => {
      if (maxSelectFile(event) && checkMimeType(event)) {
        // if return true allow to setState
        setimgCollection(event);
      }
    };
    
    const onSubmit = (e) => {
      const id = props.data._id
      const data = new FormData();
      for (const key of Object.keys(e.imgCollection)) {
        data.append("imgCollection", e.imgCollection[key]);
      }
      data.append("start", startDate);
      data.append("end", endDate);
      data.append("groupId", id)
  
      for (var key in e) {
        data.append(key, e[key]);
      }
      props.postGroupEvent(data);
    };
  
    const isLoggedIn = props.isLoggedIn;
    const addGroupEvent = props.addGroupEvent;
    const fileNum = imgCollection.length;
    
    return (
      <>
        {/* {redirect && <Redirect to="/events"></Redirect>} */}
        {isLoggedIn && (
          <>
            <div className="addPlaygroung-form">
              <div id="addPlay-img">
                <img src={blackCalender} alt="game"></img>
              </div>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="row flex-revcol-left fileNum">
                  <input
                    type="file"
                    name="imgCollection"
                    id="myImage"
                    onChange={handlefiles}
                    ref={register({ required: true })}
                  />
                  {errors.imgCollection && <p>Images is required</p>}
                  {imgCollection.length > 0 && <p> {fileNum} Files </p>}
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    name="eventName"
                    type="text"
                    placeholder="Events name"
                    id="title"
                    ref={register({ required: true })}
                    maxLength={60}
                  />
                  {errors.title && <p>Title is required</p>}
                </div>
                <div className="row flex-revcol-left">
                  <input
                    className="input-transition"
                    autoComplete="off"
                    name="address"
                    type="text"
                    value={value}
                    placeholder="Addresse"
                    id="street"
                    ref={register({ required: true })}
                    onChange={handleInput}
                  />
                  {status === "OK" && <ul>{renderSuggestions()}</ul>}
                  {errors.street && <p>Addresse name is required</p>}
                </div>
                <div className="calender">
                  <div className="StartCalender">
                    <p className="Start">Start :</p>
                    <DatePicker
                      name="start"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
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
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
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
                    placeholder="Description"
                    id="description"
                    maxLength={300}
                    cols="30"
                    rows="5"
                    ref={register({ required: true })}
                  />
                  {errors.description && <p>description is required</p>}
                </div>
                <input className="addPlay-submit" type="submit" value="Submit" />
              </form>
              {addGroupEvent && (
                <div className="addPlaygound-accept" id="accept">
                  <p> The events is added successfully</p>
                  <img src={done} alt="done"></img>
                </div>
              )}
              <div></div>
            </div>
          </>
        )}
      </>
    );
}


const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.isLoggedIn,
      addGroupEvent: state.addGroupEvent,
      info: state.info,
    };
  };


export default connect(mapStateToProps,{postGroupEvent})(EventFormular)
