import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { handleLogin, myPlayground } from "../../actions";
import { playground } from "../../actions/index";
import done from "../../img/done.svg";
import game from "../../img/game.png";
import { Redirect } from "react-router-dom";
import LoginHeader from "../login-signUp/LoginHeader";
import "../../scss/AddplayAndEvents.scss";
import { useForm } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const AddPlaygroung = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [imgCollection, setimgCollection] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {    
    async function f() {
      if (props.addplay) {
        setTimeout(() => {
          setRedirect(true);
          props.myPlayground();
        }, 3000);
      }
    }
    f();
  }, [props.addplay]);

  const maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 3) {
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
    //  e.preventDefault();
    const data = new FormData();
    for (const key of Object.keys(e.imgCollection)) {
      data.append("imgCollection", e.imgCollection[key]);
    }
    for (var key in e) {
      data.append(key, e[key]);
    }
    props.playground(data);
  };

  const isLoggedIn = props.isLoggedIn;
  const addPlay = props.addplay;
  const fileNum = imgCollection.length;
  return (
    <>
      {isLoggedIn ? (
        <>
          {redirect && <Redirect to="/playground"></Redirect>}
          <LoginHeader />
          <div className="addPlaygroung-form">
            <div id="addPlay-img">
              <img src={game} alt="game"></img>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="row flex-revcol-left fileNum">
                <input
                  type="file"
                  name="imgCollection"
                  id="myImage"
                  onChange={handlefiles}
                  multiple
                  ref={register({ required: true })}
                />
                {errors.imgCollection && <p>Images is required</p>}
                {imgCollection.length > 0 && <p> {fileNum} Files </p>}
              </div>
              <div className="row flex-revcol-left">
                <input
                  className="input-transition"
                  name="title"
                  type="text"
                  placeholder="Title or place name"
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
                  name="street"
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
              <div className="row flex-revcol-left">
                <textarea
                  className="input-transition"
                  name="description"
                  type="text"
                  placeholder="Description"
                  id="description"
                  maxLength={200}
                  cols="30"
                  rows="5"
                  ref={register({ required: true })}
                />
                {errors.description && <p>description is required</p>}
              </div>
              <input className="addPlay-submit" type="submit" value="Submit" />
            </form>
            {addPlay && (
              <div className="addPlaygound-accept" id="accept">
                <p> the playground is add successfuly</p>
                <img src={done} alt="done"></img>
              </div>
            )}
            <div></div>
          </div>
        </>
      ) : (
        <div>
          <p>please you need to be logged to Add a playground</p>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    addplay: state.addplay,
    info: state.info,
  };
};
export default connect(mapStateToProps, {
  playground,
  handleLogin,
  myPlayground,
})(AddPlaygroung);
