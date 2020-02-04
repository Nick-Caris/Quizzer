import React from "react";
import { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { acceptTeamRequest, rejectTeamRequest } from "../actions/teamApprovalActions"
import { acceptTeamAnswerRequest, rejectTeamAnswerRequest } from "../actions/teamAnswerActions"

export class AcceptReject extends Component {

    render() {
        if (this.props.team) {
            // Conditional rendering, 
            //if a team is approved give it a light green background
            let approve = ""
            if (this.props.team.approved === 1) {
                approve = "approve"
            }

            return (
                <div className="accept-reject">
                    <span className={`accept-reject-info ${approve}`}>{this.props.children}</span>
                    <button className="accept" onClick={() => {this.props.teamApprove(this.props.team._id, this.props.roomCode.roomCode)}}>V</button>
                    <button className="reject" onClick={() => {this.props.teamDisapprove(this.props.team._id, this.props.roomCode.roomCode)}}>X</button>
                </div>
            )
        } else {

            // Conditional rendering, 
            //if a team is approved give it a light green background
            let approve = ""
            if (this.props.teamAnswers.right === 1) {
                approve = "approve"
            } else if (this.props.teamAnswers.right === 0) {
                approve = "reject"
            }

            return (
                <div className="accept-reject">
                    <span className={`accept-reject-info ${approve}`}>{this.props.children}</span>
                    <button className="accept" onClick={() => {this.props.acceptTeamAnswer(this.props.roomCode.roomCode, this.props.teamAnswers, this.props.teamAnswers.teamName)}}>V</button>
                    <button className="reject" onClick={() => {this.props.rejectTeamAnswer(this.props.roomCode.roomCode, this.props.teamAnswers, this.props.teamAnswers.teamName)}}>X</button>
                </div>
            )
        }
        
    }

}

function mapStateToProps(state) {
    return {
        roomCode: state.roomCodeResponse.roomCode
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            teamApprove: acceptTeamRequest,
            teamDisapprove: rejectTeamRequest,
            acceptTeamAnswer: acceptTeamAnswerRequest,
            rejectTeamAnswer: rejectTeamAnswerRequest
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptReject)
