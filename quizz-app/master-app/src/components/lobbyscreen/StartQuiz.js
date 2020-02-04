// Imports
import React from "react";
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Translate from '../../components/Translate'

class StartQuizz extends Component {

    render() {

        if (this.props.roomCode.roomCode === undefined || 
            this.props.teams.teams.some(element => element.approved !== 1)) {
            return (
                <button className="bigbutton bg-grey" disabled>
                    <Translate val="startQuiz" />
                </button>
            )
        } else {
            return (
                <Link to="/category">
                <button className="bigbutton bg-orange">
                    <Translate val="startQuiz" />
                </button>
                </Link>
            )
        }
    }

}
    
function mapStateToProps(state) {
    return {
        roomCode: state.roomCodeResponse.roomCode,
        teams:  state.teams
    }
}

export default connect(mapStateToProps)(StartQuizz)

