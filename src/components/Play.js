import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";
import map from "../img/map.svg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PlayImage from "./PlayImage";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
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
      count: 0
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handlePlace = this.handlePlace.bind(this);
  }
  componentDidMount() {
    this.handlePlace();
  }
  componentDidUpdate(prevProps, prevState) {
    this.handleDistance();
    if (prevProps.google !== this.props.google) {
      this.handlePlace();
      this.handleDistance();
    }
  }
  handlePlace() {
    let userlongitude, userlatitude;
    navigator.geolocation.getCurrentPosition(function(position) {
      userlongitude = position.coords.latitude;
      userlatitude = position.coords.longitude;
    });
    getGeocode({
      address: this.props.data.street + " " + this.props.data.postalCode
    })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat: lat,
          lng: lng,
          userlng: userlongitude,
          userlat: userlatitude
        });
      })
      .catch(error => {
        // console.log("😱 Error: ", error);
      });
  }
  handleDistance() {
    //  google maps distance INIT
    const { google } = this.props;
    const travelMode = "WALKING";
    let theDistance = [];
    const origins = new google.maps.LatLng(
      this.state.userlng,
      this.state.userlat
    );
    const destination = new google.maps.LatLng(this.state.lat, this.state.lng);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origins],
        destinations: [destination],
        travelMode: travelMode
      },
      callback
    );

    // geting the result in the CALLBACK function
    async function callback(response, status) {
      if (status === "OK") {
        var origins = response.originAddresses;
        if (response.rows[0].elements[0].distance) {
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance;
              if (distance) {
                var resultsDistance = distance.text;
                theDistance.push(resultsDistance);
              }
            }
          }
        }
      }
    }
    if (this.state.distanceResults !== theDistance && this.state.count === 0) {
      this.setState({
        distanceResults: theDistance,
        count: 1
      });
    }
  }
  createChildren(n) {
    range(n).map(i => (
      <div key={i} style={{ height: 200, background: "#333" }}>
        {i}
      </div>
    ));
  }
  changeActiveItem(activeItemIndex) {
    this.setState({ activeItemIndex });
  }
  handleResults(e) {
    console.log("test");
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
      width: "90%",
      height: "100%"
    };
    return (
      <div className="playgroud-item">
        <div className="userVote">
          <img src={link} alt="like"></img>
          <img src={unlink} alt="unlike"></img>
        </div>
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
        <div className="addressItem">
          <div className="address">
            <span>Place:</span>
            <p>{this.props.data.street}</p>
          </div>
          <div className="addressDistance">
            {this.state.distanceResults !== null && (
              <>
                <span>Distance:</span>
                <p>{this.state.distanceResults}</p>
              </>
            )}
          </div>
        </div>
        <div className="description">
          <p>{this.props.data.description}</p>
        </div>
        <div className="mapLogo">
          <img src={map} alt="map"></img>
        </div>
        {this.state.lng !== null && (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
          >
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
          </Map>
        )}
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI"
})(Play);
