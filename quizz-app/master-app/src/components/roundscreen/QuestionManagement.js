// Imports
import React from "react";
import { connect } from 'react-redux'
import { Component } from 'react'
import { bindActionCreators } from "redux";
//import Translate from '../../components/Translate'
import { startQuestion, stopQuestion } from "../../actions/questionManagementActions"

class QuestionManagement extends Component {
    render() {

        const QUESTIONS_LEFT_IN_ROUND = this.props.questions.questions.length

        if(!this.props.questionManagement.isActive) {

            let disabled = false;
            if(this.props.teamAnswers.answers.some(element => element.right === null) ||
            this.props.questions.selectedQuestion === null ) {
                disabled = true
            }

            return (
                <div className="question-management">
                    <span>Questions left in round: { QUESTIONS_LEFT_IN_ROUND }</span>
                    <button className="question-management-start"
                    onClick={() => this.props.startQuestion(this.props.roomCode.roomCode, this.props.questions.selectedQuestion)}
                    disabled={disabled}>
                        Start
                    </button>
                    <button className="question-management-stop"
                    disabled>
                        Stop
                    </button>
                </div>
            )
        } else {
            return (
                <div className="question-management">
                    <span>Questions left in round: { QUESTIONS_LEFT_IN_ROUND }</span>
                    <button className="question-management-start"
                    disabled>
                        Start
                    </button>
                    <button className="question-management-stop"
                    onClick={() => this.props.stopQuestion(this.props.roomCode.roomCode, this.props.questions.selectedQuestion)}>
                        Stop
                    </button>
                </div>
            )
        }

        
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        roomCode: state.roomCodeResponse,
        questionManagement: state.questionManagement,
        teamAnswers: state.teamAnswers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            startQuestion: startQuestion,
            stopQuestion: stopQuestion
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionManagement)