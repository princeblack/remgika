import React from "react";
import { connect } from "react-redux";
import { fetchPlayground } from "../actions";
import Play from "./Play";
import "../scss/Playground.scss";
// import { Link, NavLink, withRouter } from "react-router-dom";
import PlacesAutocomplete from './PlacesAutocomplete';
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchPlayground();

    this.setState({
      children: [],
      activeItemIndex: 0
    });

    setTimeout(() => {
      this.setState({
        children: this.createChildren(20)
      });
    }, 100);
  }
  handleClick(e) {
    e.preventDefault();
  }
  createChildren = n =>
    range(n).map(i => (
      <div key={i} style={{ height: 200, background: "#333" }}>
        {i}
      </div>
    ));
  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  render() {
    const chevronWidth = 40;
    const playgroundList = this.props.playground.map((el, index) => {
      return <Play data={el} key={index}></Play>;
    });
    const { activeItemIndex, children } = this.state;
    const addPlay = this.props.addPlay

    return (
      <div className="playground">
        <>
          <div className="serchBar">
            {/* <input
               type="file" id="myFile" name="filename"
              ></input> */}
            {/* <input
              type="search"
              placeholder=" Look for playground in your city"
            ></input> */}
            <PlacesAutocomplete/>

          </div>
          <div className="categorie">
            <h1>Playground</h1>
            <hr></hr>
          </div>
          <div className="carouselDiv">
            <ItemsCarousel
              enablePlaceholder
              requestToChangeActive={this.changeActiveItem}
              activeItemIndex={activeItemIndex}
              numberOfCards={1}
              gutter={12}
              leftChevron={<button></button>}
              rightChevron={<button></button>}
              outsideChevron
              chevronWidth={chevronWidth}
            >
              {playgroundList}
            </ItemsCarousel>
          </div>
         
        </>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playground: state.playground,
    addPlay: state.addPlay
  };
};
export default connect(mapStateToProps, { fetchPlayground })(Playground);
