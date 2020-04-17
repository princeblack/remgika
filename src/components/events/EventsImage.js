import React, { Component } from 'react'
import { connect } from 'react-redux'

export class EventsImage extends Component {
    render() {
        return (
          <>
            <img src={this.props.data} alt="playground"></img>
          </>
        );
    }
}





export default connect( )(EventsImage)
