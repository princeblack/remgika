import React, { Component } from "react";
import { connect } from "react-redux";
import MyPlayimg from "./MyPlayimg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import { deletePlay,myPlayground } from "../actions/index";
class Myplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.playIsDelete !== this.props.playIsDelete) {
      this.props.myPlayground()
    }
  }
  createChildren = (n) =>
    range(n).map((i) => (
      <div key={i} style={{ height: 200, background: "#333" }}>
        {i}
      </div>
    ));
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
  handleClick() {
    const id = this.props.data._id;
    this.props.deletePlay(id);
  }
  render() {
    const chevronWidth = 40;
    const activeItemIndex = this.state.activeItemIndex;
    let image;
    if (this.props.data.imgCollection !== undefined) {
      image = this.props.data.imgCollection.map((el, index) => {
        return <MyPlayimg data={el} key={index}></MyPlayimg>;
      });
    }
    // if (this.props.playIsDelete) {
    //   setTimeout(() => {
    //     window.location.reload(false);
    //   }, 1);
    // }
    return (
      <>
        <div className="playgroud-item">
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
          <div className="title">
            <h4>{this.props.data.title}</h4>
          </div>
          <div className="addressItem">
            <span>Place:</span>
            <p>{this.props.data.street}</p>
          </div>
          <div className="description">
            <p>{this.props.data.description}</p>
            <button onClick={this.handleClick}> Delete</button>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    info: state.info,
    personalPlayground: state.personalPlayground,
    playIsDelete: state.playIsDelete,
  };
};
export default connect(mapStateToProps, { deletePlay, myPlayground })(Myplay);
