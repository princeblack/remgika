import React, { Component } from "react";
import { connect } from "react-redux";
import MyPlayimg from "./MyPlayimg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import { deletePlay, myPlayground, updatePlay } from "../../actions/index";
import close from "../../img/close.svg";
import { Collapse } from "react-collapse";
import classNames from "classnames";
class Myplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      show:false,
      title: "",
      street: "",
      postalCode: "",
      city: "",
      description: "",
      activeIndex: null,
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleUpdateForm = this.handleToggleUpdateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.showOption = this.showOption.bind(this);

  }
  componentDidMount() {
    this.setState({
      title: this.props.data.title,
      street: this.props.data.street,
      postalCode: this.props.data.postalCode,
      city: this.props.data.city,
      description: this.props.data.description,
    });
  }
  toggleClass(index, e) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  }
  handleToggleUpdateForm = (e) => {
    const updateForm = document.querySelector(".update-form");
    updateForm.classList.toggle("updateForm-show");
  };
  createChildren = (n) =>
    range(n).map((i) => (
      <div key={i} style={{ height: 200, background: "#333" }}>
        {i}
      </div>
    ));
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleClick() {
    const id = this.props.data._id;
    this.props.deletePlay(id);
    this.setState({
      show: false,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    for (var key in this.state) {
      data.append(key, this.state[key]);
    }
    data.delete("activeItemIndex", this.state.activeItemIndex);
    data.delete("setActiveItemIndex", this.state.setActiveItemIndex);
     data.delete("activeIndex", this.state.activeIndex);
    const id = this.props.data._id;
    this.props.updatePlay(data, id);
  }
  showOption (e){
    e.preventDefault();
    if (this.state.show) {
      this.setState({
        show: false,
      })
    } else {
      this.setState({
        show: !this.state.show,
      })
    }
    
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
    const index = this.props.playIndex;
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
            <button onClick={this.showOption}> Delete</button>
            <button
              className="updatePlay"
              onClick={this.toggleClass.bind(this, index)}
            >
              Update
            </button>
          </div>
          {this.state.show && 
      <div className="option">
        <di className="text">
          <h2>You are sure you want to remove this playground ?</h2>
        </di>
        <div className="choice">
          <button onClick={this.handleClick}>Yes I am sure</button>
          <button onClick={this.showOption} className="reject">No cancel </button>
        </div>
      </div>
      }
          {/**********************************************************
           **********************************************************
           **************** UPDATE PLAYGROUND  FORM *****************
           **********************************************************
           ********************************************************** */}
          <Collapse isOpened={this.state.activeIndex === index}>
            <div
              className={classNames("update-form", {
                show: this.state.activeIndex === index,
                hide: this.state.activeIndex !== index,
              })}
            >
              <div className="close-item">
                <img
                  src={close}
                  alt="close"
                  className="close"
                  onClick={this.toggleClass.bind(this, index)}
                ></img>
              </div>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="title"
                      type="text"
                      value={this.state.title}
                      placeholder="title or place name"
                      onChange={this.handleInputChange}
                      id="title"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="street"
                      type="text"
                      value={this.state.street}
                      placeholder=" Addresse"
                      onChange={this.handleInputChange}
                      id="street"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <textarea
                      className="input-transition"
                      name="description"
                      type="text"
                      placeholder="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      id="description"
                      required
                      maxLength={150}
                      cols="30"
                      rows="5"
                    />
                  </div>
                  <input
                    className="addPlay-submit"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </Collapse>
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
    playIsUpdate: state.playIsUpdate
  };
};
export default connect(mapStateToProps, {
  deletePlay,
  myPlayground,
  updatePlay,
})(Myplay);
