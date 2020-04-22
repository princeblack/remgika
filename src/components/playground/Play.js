import React, { Component } from 'react';
import link from '../../img/link.svg';
import unlink from '../../img/unlink.svg';
import map from '../../img/map.svg';
import close from "../../img/close.svg";
import ItemsCarousel from 'react-items-carousel';
import PlayImage from './PlayImage';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import AddressInfo from './AddressInfo';
import { Collapse } from "react-collapse";
import classNames from "classnames";



class Play extends Component {
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
      address: this.props.data.street + " " + this.props.data.postalCode,
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
      return <PlayImage data={el} key={index}></PlayImage>;
    });

    const mapStyles = {
      position: "relative",
      width: "100%",
      height: "100%",
    };
    const index = this.props.playIndex;
    return (
      <div className="playgroud-item">
        <div className="userVote">
          <img src={link} alt="like"></img>
          <img src={unlink} alt="unlike"></img>
        </div>
        <div className="image">
          <ItemsCarousel
            enablePlaceholder
            requestToChangeActive={this.changeActiveItem}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            gutter={12}
            outsideChevron={false}
            chevronWidth={chevronWidth}
          >
            {image}
          </ItemsCarousel>
          <div className="info">
            <p className="address">{this.props.data.street}</p>
          </div>
          <div className="dictanceInfo">
            <AddressInfo
              google={this.props.google}
              data={this.state}
            ></AddressInfo>
          </div>
        </div>
        <div>
          <h3>{this.props.data.title}</h3>
        </div>
        <div className="description">
          <p>{this.props.data.description}</p>
        </div>
        <div className="mapLogo">
          <img
            src={map}
            alt="map"
            onClick={this.toggleClass.bind(this, index)}
          ></img>
          <span>Click here to see the map</span>
        </div>
        {this.state.lng !== null && (
          <Collapse isOpened={this.state.activeIndex === index}>
            <div
              className={classNames("map", {
                show: this.state.activeIndex === index,
                hide: this.state.activeIndex !== index,
              })}
            >
              <div className="close-container">
                <img
                  className="close"
                  src={close}
                  alt="close"
                  onClick={this.toggleClass.bind(this, index)}
                ></img>
              </div>
              <Map
                className="map"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                  lat: this.state.lat,
                  lng: this.state.lng,
                }}
              >
                <Marker
                  position={{ lat: this.state.lat, lng: this.state.lng }}
                />
              </Map>
            </div>
          </Collapse>
        )}
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI',
})(Play);
