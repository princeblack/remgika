import React, { Component } from "react";
import link from "../../img/link.svg";
import unlink from "../../img/unlink.svg";
import map from "../../img/map.svg";
import close from "../../img/close.svg";
import ItemsCarousel from "react-items-carousel";
import EventsImage from "./EventsImage";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressInfo from "./AddressInfo";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import moment from "moment";
import { NavLink } from "react-router-dom";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      lng: null,
      lat: null,
      userlng: null,
      userlat: null,
      distanceResults: null,
      activeIndex: null,
    };
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handlePlace = this.handlePlace.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {});
    this.handlePlace();
  }
  toggleClass(index, e) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  }
  handlePlace() {
    let userlongitude, userlatitude;
    navigator.geolocation.getCurrentPosition(function (position) {
      userlongitude = position.coords.latitude;
      userlatitude = position.coords.longitude;
    });
    getGeocode({
      address: this.props.data.address,
    })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        if (lat !== null) {
          this.setState({
            lat: lat,
            lng: lng,
            userlng: userlongitude,
            userlat: userlatitude,
          });
        }
      })
      .catch((error) => {});
  }
  changeActiveItem(activeItemIndex) {
    this.setState({ activeItemIndex });
  }
  // RENDER
  render() {
    const chevronWidth = 40;
    const activeItemIndex = this.state.activeItemIndex;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <EventsImage data={el} key={index}></EventsImage>;
    });
    const mapStyles = {
      position: "relative",
      width: "100%",
      height: "100%",
    };
    const index = this.props.eventsIndex;
    const newDate = new Date(this.props.data.start);
    const newEndDate = new Date(this.props.data.end);
    const dateStart = moment(newDate);
    const dateEnd = moment(newEndDate);
    const start = moment(dateStart).format("dddd, MMMM D, h:mm A");
    const end = moment(dateEnd).format("dddd, MMMM D, h:mm A");
    return (
      this.props.data && (
        <>
          <div className="events-item">
            <div className="image">
              <ItemsCarousel
                enablePlaceholder
                requestToChangeActive={this.changeActiveItem}
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
              <div className="dictanceInfo">
                <AddressInfo
                  google={this.props.google}
                  data={this.state}
                ></AddressInfo>
              </div>
            </div>
            <div className="title">
              <h3>{this.props.data.eventName}</h3>
            </div>
            <div className="timeItem">
              <div className="start">
                <span>Start:</span>
                <p>{start}</p>
              </div>
              <div className="end">
                <span>End:</span>
                <p>{end}</p>
              </div>
            </div>
            <div className="visite">
            <NavLink to={`/eventPage/${this.props.data._id}`}>
              Visit
            </NavLink>
          </div>
          </div>
        </>
      )
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(Events);
