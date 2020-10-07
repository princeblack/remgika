import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { oneArticle, updateOneArticle, saveOneArticles, deleteOneArticles } from "../../actions";
import BackNav from "../group/BackNav";
import {Link , NavLink, Redirect} from "react-router-dom"
import ItemsCarousel from "react-items-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "../../scss/articles.scss";
import TextareaAutosize from "react-autosize-textarea/lib";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import  MsgBox  from "./MsgBox";

export const Articles = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showUpdate, setShowUpdate] = useState(false);
  const [state, setstate] = useState(false);
  const [toogleMsg, setToogleMsg] = useState(false);  
  const chevronWidth = 40;

  useEffect(() => {
    if (props.match.params.id) {
      const id = props.match.params.id;
      props.oneArticle(id);
    }
  }, [props.match.params.id]);

  let image;
  if (props.oneArticleItme.imgCollection) {
    image = props.oneArticleItme.imgCollection.map((el, index) => {
      return <img src={el} key={index} alt=""></img>;
    });
  }
  
  const [files, setFiles] = useState(undefined);
  const [productName, setProductName] = useState(undefined);
  const [option, setOption] = useState("Free");
  const [city, setCity] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [location, setLocation] = useState([]);

  useEffect(() => {
     if (props.articleIsUpdate) {
        const id = props.match.params.id;
        props.oneArticle(id);
        setShowUpdate(!showUpdate);
     }
  }, [props.articleIsUpdate])

  useEffect(() => {
    if (props.articleIssave) {
       const id = props.match.params.id;
       props.oneArticle(id);
    }
 }, [props.articleIssave])
  const handleUpdate = (e) => {
    setShowUpdate(!showUpdate);
    if (props.oneArticleItme.city) {
        setProductName(props.oneArticleItme.title);
        setOption(props.oneArticleItme.prixOption);
        setCity(props.oneArticleItme.city);
        setDescription(props.oneArticleItme.description);
        setValue(props.oneArticleItme.city);
        handleSelect(props.oneArticleItme.city)
      }
  };
  
  const handlesave = (e)=>{
    const id = props.match.params.id;
    props.saveOneArticles(id)
  }
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
  const handleMsgToogle = (e)=>{
    setToogleMsg(!toogleMsg)
  }
  const handleDelete = ()=>{
    const id = props.match.params.id;
    props.deleteOneArticles(id)
  }
  const handleConfirmation = (e)=>{
      setstate(!state)
}
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
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
      })
      .catch((error) => {
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
    const data = new FormData();
    data.append("title", productName);
    data.append("prixOption", option);
    data.append("city", value);
    data.append("location", [location[0], location[1]]);
    data.append("description", `${description}`);
    if (files) {
      for (const key in Object.keys(files)) {
        const element = files[key];
        data.append("imgCollection", element);
      }
    }
    const id = props.oneArticleItme._id;
    props.updateOneArticle(data, id);
  };

  const inputRef = useRef();
  return (
    <> 
      {props.oneArticleItme.title && (
            <div className="articles-container">
            {props.articleIsDelete && (<Redirect to="/store"></Redirect>)}
          {props.match.params.name && (
            <BackNav data={props.match.params.name}></BackNav>
          )}
          <div className="container-box">
            <div className="container-2">
              <div className="image">
                <ItemsCarousel
                  enablePlaceholder
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={1}
                  gutter={12}
                  outsideChevron={false}
                  chevronWidth={chevronWidth}
                  leftChevron={"<"}
                  rightChevron={">"}
                >
                  {image}
                </ItemsCarousel>
              </div>
              <div className="info-container">
                <div className="info">
                  <h3>{props.oneArticleItme.title}</h3>
                  <h2>{props.oneArticleItme.prixOption}</h2>
                  <span className="address">{props.oneArticleItme.city}</span>
                  <span className="date">
                    Published: {props.oneArticleItme.createdAt}
                  </span>
                </div>
              </div>
              <div className="user-massage-option">
                {props.info._id === props.oneArticleItme.userId ? (
                  <>
                    <div className="upd-dele">
                      <button className="update" onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        Update
                      </button>
                      <button className="delete" onClick={handleConfirmation}>
                        <FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon>
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="save-message">
                    {props.oneArticleItme._id &&
                        (props.oneArticleItme.articlesSave.includes(
                          props.info._id
                        ) ? (
                          <>
                            <button className="save" onClick={handlesave}>
                              <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="save" onClick={handlesave}>
                              <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                              Save
                            </button>
                          </>
                        ))}
                        <button className="message" onClick={handleMsgToogle}>
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                              ></FontAwesomeIcon>
                              Message
                            </button>
                    </div>
                  </>
                )}
              </div>
              <div className="descri">
                <pre>{`${props.oneArticleItme.description}`}</pre>
              </div>
              {state && (
                  <>
                    <div className="delete-confi">
                        <h2>Do you really want to delete this article?</h2>
                        <button className="yes-confi" onClick={handleDelete}>Yes</button>
                        <button className="no-confi" onClick={handleConfirmation}>No</button>
                    </div>
                  </>
              )}
              <>
                <MsgBox data={props.oneArticleItme} toggle={toogleMsg} fun={handleMsgToogle}></MsgBox>
              </>
              {/* {toogleMsg && (
                <>
                  <div className="msg-container">
                    <div className="article-heater">
                      <img className="image" alt="" src={props.oneArticleItme.imgCollection[0]}></img>
                      <p> {props.oneArticleItme.title}</p>
                    </div>
                    <div className="msg-div">
                      <TextareaAutosize rows="5"></TextareaAutosize>
                    </div>
                    <div className="choice">
                      <button className="submit">Submit</button>
                      <button className="cancel" onClick={handleMsgToogle}>Cancel</button>
                    </div>
                  </div>
                </>
              )} */}
              {showUpdate && (
                <>
                  <div className="updatecontainer">
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
                          required
                        ></input>
                      </div>
                      <div className=" ">
                        <select
                          id="browsers"
                          className=" input-transition"
                          onChange={handleoption}
                          defaultValue={option}
                          required
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
                          value={city}
                          required
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
                          value={`${description}`}
                          required
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
                    <button className="cancel" onClick={handleUpdate}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    
    </>

  );
};

const mapStateToProps = (state) => ({
  oneArticleItme: state.oneArticleItme,
  info: state.info,
  articleIsUpdate: state.articleIsUpdate,
  articleIssave : state.articleIssave,
  articleIsDelete : state.articleIsDelete

});

export default connect(mapStateToProps, { oneArticle, updateOneArticle, saveOneArticles, deleteOneArticles })(
  Articles
);
