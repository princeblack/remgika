import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOneEvents } from "../../actions";
import { EventsImage } from "./EventsImage";
import ItemsCarousel from "react-items-carousel";
import "../../scss/eventPage.scss"
export const EventPage = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  useEffect(() => {
    const id = props.match.params.id;
    props.fetchOneEvents(id);
  }, [props.match.params.id]);
  let image;
  if (props.getOneEvent._id) {
    image = props.getOneEvent.imgCollection.map((el, index) => {
      return <EventsImage data={el} key={index}></EventsImage>;
    });
  }
  return (
    <>
      {props.getOneEvent._id && (
        <div className="event-container">
          <div className="info-container">
            <div className="image">
              <ItemsCarousel
                enablePlaceholder
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={1}
                gutter={12}
                outsideChevron={false}
                chevronWidth={chevronWidth}
                leftChevron={"<"}
                rightChevron={">"}
              >
                {image}
              </ItemsCarousel>
            </div>
          </div>
          <div className="participate-container"></div>
          <div className="detail-container"></div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  getOneEvent: state.getOneEvent,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { fetchOneEvents })(EventPage);
