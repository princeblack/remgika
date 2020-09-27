import React, { Component } from "react";
import { connect } from "react-redux";
import MyPlayimg from "./MyPlayimg";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import { updateEvent, myEvents, deleteEvent } from "../../actions/index";
import close from "../../img/close.svg";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      show:false,
      eventName: "",
      address: "",
      description: "",
      activeIndex: null,
      startDate: new Date(),
      endDate: new Date(),
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.handleDateStart = this.handleDateStart.bind(this);
    this.handleDateEnd = this.handleDateEnd.bind(this);
    this.showOption = this.showOption.bind(this);

  }
  componentDidMount() {
    this.setState({
      eventName: this.props.data.eventName,
      address: this.props.data.address,
      start: this.props.data.start,
      end: this.props.data.end,
      description: this.props.data.description,
    });
  }
  toggleClass(index, e) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  }
  handleDateStart(e) {
    this.setState({
      startDate: e,
    });
  }
  handleDateEnd(e) {
    this.setState({
      endDate: e,
    });
  }
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
    this.props.deleteEvent(id);
    this.setState({
      show: false,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("eventName", this.state.eventName);
    data.append("address", this.state.address);
    data.append("start", this.state.startDate);
    data.append("end", this.state.endDate);
    data.append("description", this.state.description);
    const id = this.props.data._id;
    this.props.updateEvent(data, id);
  }
   showOption (e){
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    })
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

    const newDate = new Date(this.props.data.start);
    const newEndDate = new Date(this.props.data.end);
    const dateStart = moment(newDate);
    const dateEnd = moment(newEndDate);
    const start = moment(dateStart).format("dddd, MMMM D, h:mm A");
    const end = moment(dateEnd).format("dddd, MMMM D, h:mm A");
    
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
            <p>{this.props.data.address}</p>
          </div>
          <div className="addressItem">
            <span>Start:</span>
            <p>{start}</p>
          </div>
          <div className="addressItem">
            <span>End:</span>
            <p>{end}</p>
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
          <h2>You are sure you want to remove this event ?</h2>
        </di>
        <div className="choice">
          <button onClick={this.handleClick}>Yes I am sure</button>
          <button onClick={this.showOption} className="reject">No cancel </button>
        </div>
      </div>
      }
          {/**********************************************************
           **********************************************************
           **************** UPDATE event  FORM *****************
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
                      name="eventName"
                      type="text"
                      value={this.state.eventName}
                      placeholder="Events name"
                      onChange={this.handleInputChange}
                      id="title"
                      required
                    />
                  </div>
                  <div className="row flex-revcol-left">
                    <input
                      className="input-transition"
                      name="address"
                      type="text"
                      value={this.state.address}
                      placeholder="Addresse"
                      onChange={this.handleInputChange}
                      id="street"
                      required
                    />
                  </div>
                  <div className="calender">
                    <div className="StartCalender">
                      <p className="Start">Start :</p>
                      <DatePicker
                        name="start"
                        selected={this.state.startDate}
                        onChange={(date) => this.handleDateStart(date)}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                        showYearDropdown
                        scrollableYearDropdown
                        required
                        dateFormat="MM/dd/yyyy HH:mm aa"
                        showTimeInput
                        timeInputLabel="Time:"
                        timeCaption="Time"
                      >
                        <div style={{ color: "red" }}>
                          Don't forget to check the weather!
                        </div>
                      </DatePicker>
                    </div>
                    <div className="EndCalender">
                      <p className="End">End :</p>
                      <DatePicker
                        name="end"
                        selected={this.state.endDate}
                        onChange={(date) => this.handleDateEnd(date)}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                        showYearDropdown
                        scrollableYearDropdown
                        required
                        dateFormat="MM/dd/yyyy HH:mm aa"
                        showTimeInput
                        timeInputLabel="Time:"
                        timeCaption="Time"
                      >
                        <div style={{ color: "red" }}>
                          Don't forget to check the weather!
                        </div>
                      </DatePicker>
                    </div>
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
    playIsUpdate: state.playIsUpdate,
    eventIsUpdate: state.eventIsUpdate,
    eventIsDelete: state.eventIsDelete,
  };
};
export default connect(mapStateToProps, {
  updateEvent,
  myEvents,
  deleteEvent,
})(MyEvents);
