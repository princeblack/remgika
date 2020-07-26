import React, { Component } from 'react'
import { connect } from 'react-redux'

export const GroupNewsImag = (props) => {
    
    return (
        <>
            <img src={props.data} alt="news"></img>
        </>
    )
}



const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(GroupNewsImag)
