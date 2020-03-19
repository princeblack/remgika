import React, { Component } from 'react'
import { connect } from "react-redux";

 class Myplay extends Component {
    render() {
        console.log(this.props.data);
        
        return (
          <>
            <div className="playgroud-item">
              {/* <div className="userVote">
                <img src={link} alt="like"></img>
                <img src={unlink} alt="unlike"></img>
              </div>
              <img src={game} alt="playground"></img> */}
              <div className="addressItem">
                <div className="address">
                  <span>Place:</span>
                  <p>{this.props.data.street}</p>
                </div>
                <div className="addressDistance">
                  <span>Distance:</span>
                  <p>15km </p>
                </div>
              </div>
              {/*  */}
              <div className="description">
                <p>{this.props.data.description}</p>
              </div>
            </div>
          </>
        );
    }
}
const mapStateToProps = state => {
  debugger;
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    personalPlayground: state.personalPlayground
  };
};
export default connect(mapStateToProps)(Myplay);
