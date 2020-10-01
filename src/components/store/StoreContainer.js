import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../scss/store.scss";
import { faSearch, faTag, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { ArticleCityAndTitle, matchTitle } from "../../actions";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ArticleItems from "./ArticleItems";

export const StoreContainer = (props) => {
  const [city, setCity] = useState();
  const [location, setLocation] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState("Free");
  const [distance, setDistance] = useState(5);
  const [word, setWord] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* la géolocalisation est disponible */
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
    } else {
      /* la géolocalisation n'est pas disponible */
      navigator.geolocation.getCurrentPosition(function (position) {});
    }
  }, []);
  useEffect(() => {
    props.ArticleCityAndTitle([location], title, option, distance);
  }, []);

  useEffect(() => {
    if (props.info.location) {
      setLocation([
        props.info.location.coordinates[0],
        props.info.location.coordinates[1],
      ]);

      props.ArticleCityAndTitle([location], title, option, distance);
    }
  }, [props.info]);
  useEffect(() => {
    if (word.length >= 5) {
      props.matchTitle(word);
    }
    if (word.length === 4) {
      props.matchTitle(word);
    }
  }, [word]);
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    setWord(e.target.value);
    const items = document.getElementById("all-titles").style.display="block"

  };
  const handlecity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    // Update the keyword of the input element
    setValue(e.target.value);
  };
  const handleOption = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };
  const handleDistance = (e) => {
    e.preventDefault();
    setDistance(e.target.value);
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 200,
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

  const handleSeacrh = (e) => {
    e.preventDefault();
    props.ArticleCityAndTitle([location], title, option, distance);
  };
  let artitlesArray;
  if (props.allArticles) {
    artitlesArray = props.allArticles.map((el, index) => {
      return <ArticleItems data={el} key={el._id}></ArticleItems>;
    });
  }
  const handleChoise = (e)=>{
    e.preventDefault();
    setTitle(e.target.dataset.user);
    setWord(e.target.dataset.user);
    const items = document.getElementById("all-titles").style.display="none"
  }

  const clear = (e)=>{
    const items = document.getElementById("all-titles").style.display="none";
    const ref =(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
    ref()
  }

  let titleSugg;
  if (props.allMatch) {
    titleSugg = props.allMatch.map((el, index) => {
      return <p  onClick={handleChoise}  data-user={el.title} value={el.title}  key={el._id}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> {el.title}</p>;
    });
  }  
  const active = { color: "#6bc477" };
  return (
    <div className="container" onClick={clear} >
      <div className="store-article">
        <div className="new-article">
          <NavLink activeStyle={active} to="/store/newArticle/store">
            <FontAwesomeIcon icon={faTag}></FontAwesomeIcon>
            <span>Create an ad</span>
          </NavLink>
        </div>
        <div className="my-article">
          <NavLink activeStyle={active} to="/MyArticles/store">
            <FontAwesomeIcon icon={faUserTag}></FontAwesomeIcon>
            <span>My articles</span>
          </NavLink>
        </div>
      </div>
      <div className="store-items-container">
        <div className="search-container">
          <div className="search-and-city">
            <div className="search">
              <input
                onChange={handleTitle}
                value={title}
                placeholder="What are you looking for ?"
              ></input>
              <div id="all-titles">{titleSugg}</div>
            </div>

            <select onChange={handleOption}>
              <option>Free</option>
              <option>exchange</option>
              <option>looking for</option>
            </select>
          </div>
          <div className="city-box">
            <div className="city">
              <input
                placeholder="City or Address"
                onChange={handlecity}
                value={city}
              ></input>
              {/* We can use the "status" to decide whether we should display the dropdown or not */}
              {status === "OK" && <ul>{renderSuggestions()}</ul>}
            </div>
            <select onChange={handleDistance}>
              <option value={5}>+ 5 km </option>
              <option value={10}>+ 10 km </option>
              <option value={20}>+ 20 km </option>
              <option value={30}>+ 30 km </option>
              <option value={50}>+ 50 km </option>
              <option value={100}>+ 100 km </option>
              <option value={200}>+ 200 km </option>
            </select>
          </div>
          <div className="search-button" onClick={handleSeacrh}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
        </div>
        <div className="articles-box">
          <div className="articles-items">{props.allArticles && artitlesArray}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allArticles: state.allArticles,
  info: state.info,
  allMatch: state.allMatch,
});

export default connect(mapStateToProps, { ArticleCityAndTitle, matchTitle })(
  StoreContainer
);
