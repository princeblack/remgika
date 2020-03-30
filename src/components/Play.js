import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";
import map from "../img/map.svg";
import close from "../img/close.svg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PlayImage from "./PlayImage";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
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
      userlat: null
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handlePlace = this.handlePlace.bind(this);
    // this.initMap = this.initMap.bind(this);
  }
  componentDidMount() {
    this.handlePlace();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.handlePlace();
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
  // RENDER
  render() {
    const chevronWidth = 40;
    const { activeItemIndex, children } = this.state;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });
    const mapStyles = {
      position: "relative",
      width: "90%",
      height: "100%"
    };
    // console.log(this.props);
    // const origins = `${this.state.userlat},${this.state.userlng}`;
    // const destination = `${this.state.lat},${this.state.lng}`;
    // let DistanceRes;
    const { google } = this.props;
    const travelMode = "WALKING";
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
        travelMode: "BICYCLING"
      },
      callback
    );

    var results = [];

    async function callback(response, status) {
      if (status === "OK") {
        if (response.rows[0].elements[0].distance) {
          // results = response.rows[0].elements[0].distance.text;
          // console.log(results , 'inside 3 ');
        }
        // console.log(results, "inside 2 ");
      }
      // console.log(results, "inside 1 ");

      if (status == "OK") {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        if (response.rows[0].elements[0].distance) {
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance;
              var duration = element.duration;
              var from = origins[i];
              var to = destinations[j];
              results.push(distance);
            }
          }
        }
      }
    }
    console.log(results);

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
            {results && (
              <>
                <span>Distance:</span>
                {/* <p>{results}</p> */}
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
            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
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
