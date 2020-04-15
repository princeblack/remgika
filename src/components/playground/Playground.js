import React from "react";
import { connect } from "react-redux";
import { fetchPlayground } from "../../actions";
import "../../scss/Playground.scss";
import PlacesAutocomplete from "./PlacesAutocomplete";


class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  componentDidMount() {
    this.props.fetchPlayground();
  }
  toggleSidebar = (e) => {
    const mapBar = document.querySelector(".mapBar");
    mapBar.classList.toggle("map-show");
  };
  

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
