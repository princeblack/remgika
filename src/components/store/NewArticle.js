// import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { connect } from "react-redux";
import BackNav from "../group/BackNav";
import "../../scss/newArticle.scss";
import { newArticle } from "../../actions";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
export const NewArticle = (props) => {
  const [files, setFiles] = useState(undefined);
  const [productName, setProductName] = useState(undefined);
  const [option, setOption] = useState("Free");
  const [city, setCity] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [location, setLocation] = useState([]);
  const handleName = (e) => {
    setProductName(`${e.target.value}`);
  };
  const handleoption = (e) => {
    setOption(e.target.value.toLowerCase());
  };
  const handlecity = (e) => {
    setCity(e.target.value);
    // Update the keyword of the input element
    setValue(e.target.value);
  };
  const handledescription = (e) => {
    setDescription(`${e.target.value}`);
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // location: { lat: () => 43.6532, lng: () => -79.3832 },
      // radius: 100 * 1000,
      /* Define search scope here */
    },
    debounce: 200,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    setCity(description);
    clearSuggestions();
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLocation([lng, lat]);
        console.log([lng, lat], "get info");
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
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
  const handleFiles = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    if (image.hasChildNodes()) {
      for (let index = 0; index < image.childNodes.length; index++) {
        if (image.hasChildNodes()) {
          image.removeChild(image.childNodes[index]);
          index--;
        }
      }
    }
    if (image.childNodes.length === 0) {
      for (let index = 0; index < e.target.files.length; index++) {
        var output = document.createElement("Img");
        output.src = URL.createObjectURL(e.target.files[index]);
        image.appendChild(output);
      }
    }
    setFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      productName !== undefined &&
      city !== undefined &&
      description !== undefined &&
      files !== undefined
    ) {
      const data = new FormData();

      data.append("title", productName);
      data.append("prixOption", option);
      data.append("city", value);
      data.append("location", [location[0], location[1]]);
      data.append("description", `${description}`);
      for (const key in Object.keys(files)) {
        const element = files[key];
        data.append("imgCollection", element);
      }
      props.newArticle(data);
    }
  };
  useEffect(() => {
    if (props.articleIsAdd) {
      setProductName("");
      setCity("");
      setFiles("");
      setDescription("");
      setValue("");
      const image = document.getElementById("image");
      if (image.hasChildNodes()) {
        for (let index = 0; index < image.childNodes.length; index++) {
          if (image.hasChildNodes()) {
            image.removeChild(image.childNodes[index]);
            index--;
          }
        }
      }
    }
  }, [props.articleIsAdd]);

  const inputRef = useRef();
  return (
    <div className="article-box">
      {props.match.params.id && 
            <BackNav data={props.match.params.id}></BackNav>
      }
      {props.isLoggedIn ? (
        <form>
          <div>
            <FontAwesomeIcon
              className="image-upload"
              icon={faImage}
              onClick={() => {
                inputRef.current.click();
              }}
            ></FontAwesomeIcon>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              multiple
              onChange={handleFiles}
            ></input>
            <div id="image"></div>
          </div>
          <div>
            <input
              className=" input-transition"
              placeholder="Product Name"
              onChange={handleName}
              value={productName}
            ></input>
          </div>
          <div className=" ">
            <select
              id="browsers"
              className=" input-transition"
              onChange={handleoption}
              value={option}
            >
              <option>Free</option>
              <option>Exchange</option>
              <option value="Looking">Looking for</option>
            </select>
          </div>
          <div className="city">
            <input
              className=" input-transition"
              placeholder="City"
              onChange={handlecity}
              disabled={!ready}
              value={value}
            ></input>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
          </div>
          <div className="">
            <TextareaAutosize
              className=" input-transition"
              placeholder="Product Description"
              rows="5"
              onChange={handledescription}
              value={description}
            ></TextareaAutosize>
          </div>
          <div className="">
            <input
              type="submit"
              className="login-submit"
              onClick={handleSubmit}
            ></input>
          </div>
        </form>
      ) : (
        <div className="log-container">
          <p>Please you must log in to continue </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articleIsAdd: state.articleIsAdd,
  allArticles: state.allArticles,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { newArticle })(NewArticle);
