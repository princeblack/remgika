import React, { Component } from "react";
import link from "../../img/link.svg";
import unlink from "../../img/unlink.svg";
import map from "../../img/map.svg";
import ItemsCarousel from "react-items-carousel";
import EventsImage from "./EventsImage";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

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
      count: 0,
    };
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handlePlace = this.handlePlace.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {});
    this.handlePlace();
  }
  componentDidUpdate(prevProps, prevState) {
    this.handleDistance();
    if (prevProps.google !== this.props.google) {
      this.handlePlace();
      this.handleDistance();
    }
  }
  toggleSidebar = (e) => {
    const mapBar = document.querySelector(".mapBar");
    mapBar.classList.toggle("map-show");
  };
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

  //  handle the distance google maps Api function
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
        travelMode: travelMode,
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
        count: 1,
      });
    }
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
      width: "90%",
      height: "100%",
    };
    return (
      <div className="events-item">
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
        <div>
          <h3>{this.props.data.title}</h3>
        </div>
        <div className="addressItem">
          <div className="address">
            <span>Place:</span>
            <p>{this.props.data.address}</p>
          </div>
          <div className="TimeItem">
            <div className="start">
              <span>Start:</span>
              <p>{this.props.data.start}</p>
            </div>
            <div className="end">
              <span>End:</span>
              <p>{this.props.data.end}</p>
            </div>
          </div>
          <div className="addressDistance">
            {this.state.distanceResults !== null &&
              this.state.distanceResults.length > 0 && (
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
          <img src={map} alt="map" onClick={this.toggleSidebar}></img>
        </div>
        {this.state.lng !== null && (
          <div className="mapBar">
            <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={{
                lat: this.state.lat,
                lng: this.state.lng,
              }}
            >
              <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
            </Map>
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// export default connect(mapStateToProps)(Events);
export default GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(Events);
