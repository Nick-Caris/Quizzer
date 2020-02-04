// Imports
import React from "react";
import { connect } from 'react-redux'
import { Component } from 'react'

class RoomCode extends Component {
    
    render() {

        if (this.props.hasErrored) {
            // TODO: show some html 
            return null
        }

        if (this.props.RoomCode === "") {
            return null
        } else {
            return (
                <div className="info-box">
                    <p className="room-code-text">Room Code:</p>
                    <p className="room-code-code">{ this.props.RoomCode.roomCode }</p>
                </div>
            )
        }
    } 

}


function mapStateToProps(state) {
    return {
        isloading: state.roomCodeResponse.isLoading,
        hasErrored: state.roomCodeResponse.hasErrored,
        RoomCode: state.roomCodeResponse.roomCode
    }
}

export default connect(mapStateToProps)(RoomCode)