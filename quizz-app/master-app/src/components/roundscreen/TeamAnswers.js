import React from "react";
import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { getAnswers } from "../../actions/teamAnswerActions"
import Translate from "../Translate"
import AcceptReject from "../AcceptReject"

class TeamAnswers extends Component {
    render() {

        if(this.props.teamAnswers.isUpdated) {
            this.props.getAnswers(this.props.roomCode.roomCode, this.props.questions.selectedQuestion._id)
        }

        return (
            <div className="team-answers">
                 <Translate val="teamApproval" />
                <div className="team-approval-container">
                    {   
                        this.props.teamAnswers.answers.map((element) => (
                            <AcceptReject key={element._id} teamAnswers={element}>{element.answer}</AcceptReject>
                        ))
                    }
                </div>
            </div>  
        )
    }
}

function mapStateToProps(state) {
    return {
        teamAnswers: state.teamAnswers,
        roomCode: state.roomCodeResponse.roomCode,
        questions: state.questions
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAnswers: getAnswers
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAnswers)