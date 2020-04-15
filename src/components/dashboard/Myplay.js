import React, { Component } from "react";
import { connect } from "react-redux";
import MyPlayimg from "./MyPlayimg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import { deletePlay, myPlayground, updatePlay } from "../../actions/index";
import close from "../../img/close.svg";
class Myplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      title: "",
      street: "",
      postalCode: "",
      city: "",
      description: "",
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleUpdateForm = this.handleToggleUpdateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.playIsDelete !== this.props.playIsDelete) {
      this.props.myPlayground();
    }
    if (prevProps.playIsUpdate !== this.props.playIsUpdate) {
            this.props.myPlayground();
                this.props.updatePlay("");

    }
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
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    for (var key in this.state) {
      data.append(key, this.state[key]);
    }
    data.delete("activeItemIndex", this.state.activeItemIndex);
    data.delete("setActiveItemIndex", this.state.setActiveItemIndex);
    const id = this.props.data._id;
    this.props.updatePlay(data, id);
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
            <button className="updatePlay" onClick={this.handleToggleUpdateForm}>
              Update
            </button>
          </div>
          <div className={`update-form`}>
            <div className="close-item">
              <img
                src={close}
                alt="close"
                className="close"
                onClick={this.handleToggleUpdateForm}
              ></img>
            </div>
            {/**********************************************************
             **********************************************************
             **************** UPDATE PLAYGROUND  FORM *****************
             **********************************************************
             ********************************************************** */}
            <div className="addPlaygroung-form">
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
