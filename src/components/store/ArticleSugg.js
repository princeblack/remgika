import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTag, faUserTag } from "@fortawesome/free-solid-svg-icons";

export const ArticleSugg = (props) => {

    return (
        <p>
           <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> {props.data.title}
        </p>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSugg)
