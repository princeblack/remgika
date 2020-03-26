import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { NavLink} from "react-router-dom";
import camera from "../img/camera.svg";

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: "string",
    debounce: 300
  });
  const ref = useRef();
  useOnclickOutside(ref, () => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch(error => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="play-autocomplte">
      <div className="inpute-auto">
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          type="text"
          name="search"
          placeholder="Playground in your city"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
      <div className="camera-flex">
        <NavLink to="/addplayground">
          <img src={camera} alt="camera"></img>
        </NavLink>
        <span>Add Playground</span>
      </div>
    </div>
  );
};

export default PlacesAutocomplete;
