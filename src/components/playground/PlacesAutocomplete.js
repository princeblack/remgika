import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import { fetchPlayground, fetcheventsList , commentAdd,fetchComment} from '../../actions';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { NavLink } from 'react-router-dom';
import camera from '../../img/camera.svg';
import '../../scss/Playground.scss';
import Play from './Play';
import ItemsCarousel from 'react-items-carousel';
import { GoogleApiWrapper } from 'google-maps-react';

const Test = (props) => {
  useEffect(() => {
    props.fetchPlayground();
    props.fetcheventsList();
    

  }, []);
 
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: 'string',
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

  const [getPlay, setgetPlay] = useState();
  const handelCharacters = async (character) => {
    let filterCharacter;
    filterCharacter = await props.playground.filter((play) => {
      return play.street.toLowerCase().indexOf(character.toLowerCase()) !== -1;
    });
    setgetPlay(filterCharacter);
  };
  let playgroundList;
  playgroundList = props.playground.map((el, index) => {
    return <Play 
      commentFunc={props.commentAdd} user={props.info} playIndex={index} data={el} key={index}
      fetchCommentFunc ={props.fetchComment}
      ></Play>;
  });
  if (getPlay !== undefined) {
    playgroundList = getPlay.map((el, index) => {
      return (
        <Play  
        commentFunc={props.commentAdd} user={props.info} playIndex={index} data={el} key={index}
        fetchCommentFunc ={props.fetchComment}
        ></Play>
      );
    });
  }
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
  if (size >= 500) {
    cardNumber= 2
  }
  if (size >= 850) {
    cardNumber= 3
  }
  if (size >= 990) {
    cardNumber= 4
  }
  if (size >= 1200) {
    cardNumber= 5
  }
  
  return (
    <>
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
          {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </div>
        <div className="camera-flex">
          <NavLink to="/addplayground">
            <img src={camera} alt="camera"></img>
          </NavLink>
          <span>Add Playground</span>
        </div>
      </div>
      <div className="categorie">
        <h1>Playgrounds</h1>
        <hr></hr>
      </div>
      <div className="carouselDiv">
        <ItemsCarousel
          enablePlaceholder
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={cardNumber}
          gutter={12}
          leftChevron={<button></button>}
          rightChevron={<button></button>}
          outsideChevron
          disableSwipe
          chevronWidth={chevronWidth}
        >
          {playgroundList}
        </ItemsCarousel>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    playground: state.playground,
    addPlay: state.addPlay,
    eventsList: state.eventsList,
    info: state.info
  };
};
GoogleApiWrapper({
  // apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
});
export default connect(mapStateToProps, {commentAdd, fetchComment, fetchPlayground, fetcheventsList, GoogleApiWrapper })(Test);
