import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";
import game from "../img/game.png";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PlayImage from "./PlayImage";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
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
    const { activeItemIndex, children } = this.state;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });

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
            <span>Distance:</span>
            <p>15km </p>
          </div>
        </div>
        {/*  */}
        <div className="description">
          <p>{this.props.data.description}</p>
        </div>
      </div>
    );
  }
}
