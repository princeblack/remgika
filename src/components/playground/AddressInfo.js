import React, { Component } from 'react';

class AddressInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: null,
      duration: null,
    };
    this.handleDistance = this.handleDistance.bind(this);
  }

  handleDistance() {
    //  google maps distance INIT
    const { google } = this.props;
    const travelMode = 'WALKING';
    const origins = new google.maps.LatLng(this.props.data.userlng, this.props.data.userlat);
    const destination = new google.maps.LatLng(this.props.data.lat, this.props.data.lng);
    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origins],
        destinations: [destination],
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === 'OK') {
          var origins = response.originAddresses;
          if (response.rows[0].elements[0].distance) {
            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];                
                var distance = element.distance;
                var duration = element.duration
                if (distance) {
                  var resultsDistance = distance.text;
                  var resultsDuration = duration.text;
                  if (!this.state.distance) this.setState({
                     distance: resultsDistance ,
                     duration: resultsDuration
                    });
                }
              }
            }
          }
        }
      }
    );
  }

  render() {
    this.handleDistance();
    return (
      <div className="address-info">
        {this.state.distance !== null && (
          <div className="addressDistance">
            <span>Distance:</span>
            <p>{this.state.distance}</p>
          </div>
        )}
        {this.state.duration !== null && (
          <div className="addressDuration">
            <span>Walking:</span>
            <p>{this.state.duration}</p>
          </div>
        )}
      </div>
    );
  }
}

export default AddressInfo;
