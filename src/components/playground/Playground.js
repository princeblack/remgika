import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import "../../scss/Playground.scss";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { fetchPlayground } from "../../actions";

const Playground = (props) => {
  useEffect(() => {
    // props.fetchPlayground();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const scroll = document;
    };
  }, []);

  
  const isBrowser = typeof window !== `undefined`;

  function getScrollPosition({ element, useWindow }) {
    if (!isBrowser) return { x: 0, y: 0 };

    const target = element ? element.current : document.body;
    const position = target.getBoundingClientRect();

    return useWindow
      ? { x: window.scrollX, y: window.scrollY }
      : { x: position.left, y: position.top };
  }

  return (
    <div className="playground">
      <div className="serchBar">
        <PlacesAutocomplete />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playground: state.playground,
    addPlay: state.addPlay,
  };
};
export default connect(mapStateToProps, { fetchPlayground })(Playground);
