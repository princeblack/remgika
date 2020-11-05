import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { connect } from "react-redux"; 
import { fetcheventsList } from "../../actions";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { NavLink } from "react-router-dom";
import camera from "../../img/camera.svg";
import "../../scss/Playground.scss";
import Events from "./Events";
import ItemsCarousel from "react-items-carousel";
import axios from "axios";
import Post from "./Post"
import Pagination from "./Pagination";

const EventsAutocomplete = (props) => {
  const [userId] = useState(0);
  const [location, setLocation] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [postsPerPage] = useState(12);

  const url = "https://node-server.remgika.com";

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* la géolocalisation est disponible */
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
    }else{
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, [navigator.geolocation]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let cancel;
      const res = axios({
        method: "GET",
        url: `${url}/events`,
        withCredentials: true,
        params: { skip: currentPage, city: location },
        headers: {
          "Content-Type": "application/json",
        },

        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then((res) => {
          setPosts(res.data.event);
          setTotal(res.data.count)
          setLoading(false);
          
        })
        .catch((e) => {
        });
    };
    if (location.length > 0) {
      fetchPosts();
    }
  }, [location, currentPage]);

  const {
    ready,
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
    handelCharacters(e.target.value);
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
      .then(({ lat, lng }) => {
        setLocation([lng, lat]);
      })
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
  const [getEvents, setgetEvents] = useState();
  const handelCharacters = async (character) => {
    let filterCharacter;
    filterCharacter = await props.eventsList.filter((play) => {
      return play.street.toLowerCase().indexOf(character.toLowerCase()) !== -1;
    });
    setgetEvents(filterCharacter);
  };
 

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;  

  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []); 
  
  let cardNumber = 1;

  const currentPosts = posts;

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  return (
    <>
      <div ref={ref} className="MainEvents-autocomplte">
        <div className="inpute-auto">
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            type="text"
            name="search"
            placeholder="Events in your city"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
        <div className="camera-flex">
          <NavLink to="/addEvents">
            <img src={camera} alt="camera"></img>
          </NavLink>
          <span>Add Events</span>
        </div>
      </div>
      <div className="categorie">
        <h1>Events</h1>
        <hr></hr>
      </div>
          <div className="event-table">
            <Post post={currentPosts} loading={loading} />
        </div>
        <Pagination postsPerPage={postsPerPage} totalPost={total}  paginate={paginate} currentPage={currentPage}/>
      
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    eventsList: state.eventsList,
    addEvents: state.addEvents,
    info: state.info,
    eventCount :  state.eventCount
  };
};
export default connect(mapStateToProps, { fetcheventsList})(
  EventsAutocomplete
);
