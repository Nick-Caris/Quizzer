// Imports
import React from "react";
import { openRoomRequest } from "../../actions/actions"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Component } from 'react'
import Translate from '../../components/Translate'


class OpenRoom extends Component {
    
    render() {
        if (this.props.roomCode === "") {
            return (
                <button className="bigbutton bg-green" onClick={() => this.props.openRoom(this.props.lang.lang)}>
                    <Translate val="openRoom"/>{ this.props.roomCode}
                </button>
            )
        } else {
            return (
                <button className="bigbutton bg-gray">
                    <Translate val="openRoom"/>
                </button>
            )
        }
    }
    
}

function mapStateToProps(state) {
    return {
        isloading: state.roomCodeResponse.isloading,
        hasErrored: state.roomCodeResponse.hasErrored,
        roomCode: state.roomCodeResponse.roomCode,
        lang: state.language
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            openRoom: openRoomRequest
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenRoom)

