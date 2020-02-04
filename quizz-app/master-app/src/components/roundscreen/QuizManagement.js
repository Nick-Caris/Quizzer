import React from "react";
import { Component } from "react";
import Translate from "../Translate"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { nextRoundRequest, endQuizRequest } from "../../actions/quizManagmentActions"
import {withRouter} from "react-router";


class QuizManagement extends Component {
    render() {

        const QUESTIONS_LEFT = this.props.questions.questions.length

        const nextRoundCallback = () => this.props.history.push('/category');
        const endQuizCallback = () => this.props.history.push('/end');

        if(QUESTIONS_LEFT > 0 || this.props.teamAnswers.answers.some(element => element.right === null)) {
            return (
                <div className="quiz-managment">
                    <button disabled>
                        <Translate val="endGame"/>
                    </button>
                    <button disabled> 
                        <Translate val="nextRound"/>
                    </button>
                </div> 
            )
        } else {
            return (
                <div className="quiz-managment">
                    <button className="bg-orange"
                    onClick={() => this.props.endQuiz(this.props.roomCode.roomCode.roomCode, endQuizCallback)}>
                        <Translate val="endGame"/>
                    </button>
                    <button className="bg-orange"
                    onClick={() => this.props.nextRound(this.props.roomCode.roomCode.roomCode, nextRoundCallback)}> 
                        <Translate val="nextRound"/>
                    </button>
                </div> 
            )
        }
        
    }
} 

function mapStateToProps(state) {
    return {
        questions: state.questions,
        teamAnswers: state.teamAnswers,
        roomCode: state.roomCodeResponse
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            nextRound: nextRoundRequest,
            endQuiz: endQuizRequest
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuizManagement))