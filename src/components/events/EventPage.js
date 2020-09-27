import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOneEvents, handleEventParticipation } from "../../actions";
import { EventsImage } from "./EventsImage";
import ItemsCarousel from "react-items-carousel";
import "../../scss/eventPage.scss";
import moment from "moment";
import done from "../../img/done.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Header from "../login-signUp/LoginHeader";

export const EventPage = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [userlng, setUserlng] = useState(null);
  const [userlat, setUserlat] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const chevronWidth = 40;

  useEffect(() => {
    const id = props.match.params.id;
    props.fetchOneEvents(id);
  }, [props.match.params.id]);



  let image;
  if (props.getOneEvent._id) {
    image = props.getOneEvent.imgCollection.map((el, index) => {
      return <EventsImage data={el} key={index}></EventsImage>;
    });
  }

  const newDate = new Date(props.getOneEvent.start);
  const newEndDate = new Date(props.getOneEvent.end);
  const dateStart = moment(newDate);
  const dateEnd = moment(newEndDate);
  const start = moment(dateStart).format("dddd, MMMM D, h:mm A");
  const end = moment(dateEnd).format("dddd, MMMM D, h:mm A");
  const startTime = moment(newDate).format("ddd ,h:mm A");
  const endTime = moment(dateEnd).format(" ddd ,h:mm A");

  const handleParticipation = () => {
    const id = props.getOneEvent._id;
    props.handleEventParticipation(id);
  };

  useEffect(() => {
    if (props.joinEvent) {
      const id = props.match.params.id;
      props.fetchOneEvents(id);
    }
  }, [props.joinEvent]);

  const userId = props.info._id;
  useEffect(() => {
    // if (props.getOneEvent._id === props.match.params.id) {
    //   const handlePlace = () => {
    //     let userlongitude, userlatitude;
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       userlongitude = position.coords.latitude;
    //       userlatitude = position.coords.longitude;
    //     });
    //     if (props.getOneEvent.address) {
    //       getGeocode({
    //         address: props.getOneEvent.address,
    //       })
    //         .then((results) => getLatLng(results[0]))
    //         .then(({ lat, lng }) => {
    //           if (lat !== null) {
    //             setLng(lng);
    //             setLat(lat);
    //             setUserlng(userlongitude);
    //             setUserlat(userlatitude);
    //           }
    //         })
    //         .catch((error) => {});
    //     }
    //   };
    //   handlePlace();
    // }
  }, [props]);
  const handleMapToggle = (e)=>{
    e.preventDefault()
    if (props.getOneEvent._id === props.match.params.id) {
      const handlePlace = () => {
        let userlongitude, userlatitude;
        navigator.geolocation.getCurrentPosition(function (position) {
          userlongitude = position.coords.latitude;
          userlatitude = position.coords.longitude;
        });
        if (props.getOneEvent.address) {
          getGeocode({
            address: props.getOneEvent.address,
          })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
              if (lat !== null) {
                setLng(lng);
                setLat(lat);
                setUserlng(userlongitude);
                setUserlat(userlatitude);
              }
            })
            .catch((error) => {});
        }
      };
      handlePlace();
    }
    setShowMap(!showMap)
  }

  const mapStyles = {
    position: "relative",
    width: "90%",
    height: "80%",
  };
  return (
    <>
      <Header></Header>
      {props.getOneEvent._id && (
        <div className="event-container">
          <div className="info-container">
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
              <div className="date">
                <div className="start">
                  <p>{start}</p>
                </div>
              </div>
              <div className="title">
                <p>{props.getOneEvent.eventName}</p>
              </div>
            </div>
          </div>
          <div className="participate-container">
            <div className="participete" onClick={handleParticipation}>
              {props.getOneEvent.participants.includes(userId) ? (
                <>
                  <img src={done} alt="i participe"></img>
                  <p>I participate</p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>

                  <p>participate</p>
                </>
              )}
            </div>
            <div className="user-participete">
              <div className="nombre">
                <span>{props.getOneEvent.participantsNumber} </span>
              </div>
              <div className="user">
                <p>Participant </p>
              </div>
            </div>
          </div>
          <div className="detail-container">
            <div className="address" onClick={handleMapToggle}>
              <FontAwesomeIcon icon={faMapMarked}></FontAwesomeIcon>
              <p> {props.getOneEvent.address} </p>
            </div>
            {showMap && (
                <div className="map-container">
                  {lat !== null && (
                    <Map
                      className="map"
                      google={props.google}
                      zoom={14}
                      // style={mapStyles}
                      initialCenter={{
                        lat: lat,
                        lng: lng,
                      }}
                    >
                      <Marker position={{ lat: lat, lng: lng }} />
                    </Map>
                  )}
                </div>
              )}
            <div className="time">
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              <p>
                {startTime} to {endTime}
              </p>
            </div>
            <div className="detail">
              <p> {props.getOneEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  getOneEvent: state.getOneEvent,
  info: state.info,
  joinEvent: state.joinEvent,
});
const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(EventPage);

export default connect(mapStateToProps, {
  fetchOneEvents,
  handleEventParticipation,
})(WrappedContainer);
