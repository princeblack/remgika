import React from "react";
import { connect } from "react-redux";
import { fetchPlayground } from "../../actions";
import "../../scss/Playground.scss";
import PlacesAutocomplete from "./PlacesAutocomplete";


class Playground extends React.Component {

  componentDidMount() {
    this.props.fetchPlayground();
  }


  render() {    
    return (
      <div className="playground">
        <>
          <div className="serchBar">
            <PlacesAutocomplete />
          </div>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playground: state.playground,
    addPlay: state.addPlay,
  };
};
export default connect(mapStateToProps, { fetchPlayground })(Playground);
