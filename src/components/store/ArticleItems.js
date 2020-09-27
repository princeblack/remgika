import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../../scss/articleItems.scss";

export const ArticleItems = (props) => {

    return (
        <div className="items-container">
            <div className="image">
                <img src={props.data.imgCollection[0]} alt=""></img>
                <div className="itemOption">
                    <span>{props.data.prixOption}</span>
                </div>
            </div>
            <div className="info">
                <p>{props.data.title}</p>
                <span>{props.data.city}</span>
            </div>
            <div className=""></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItems)
