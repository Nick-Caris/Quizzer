// Imports
import React, {Component} from "react";
import {connect} from "react-redux";
import {getAnsweredQuestionRequest} from "../../actions/getAnsweredQuestionsAction";
import Translate from "../Translate";

class AnswerView extends Component {


  render() {
    if (this.props.quiz && this.props.questionResponse.isUpdated) {
      this.props.getQuestions(this.props.quiz.roomCode, this.props.questionResponse.questionId)
    }

    if (this.props.questionResponse.answers !== undefined && this.props.questionResponse.questionEnded) {
      console.log('QUESTION ANSWERED: ', this.props.questionResponse.answers);
      return (
        <div className="answer-view">
          {
            this.props.questionResponse.answers.map((answer) => (
              <p key={answer._id}>{answer.teamName} - {answer.answer} {String(answer.right)}</p>
            //  DO WITH CSS ADD RIGHT
            ))
          }
        </div>
      );
    } else if (this.props.questionResponse.answers !== undefined && !this.props.questionResponse.questionEnded) {
      return (
        <div className="answer-view">
          {
            this.props.questionResponse.answers.map((answer) => (
              <p key={answer._id}>{answer.teamName} - <Translate val="answered" /></p>
            ))
          }
        </div>
      );
    } else {
      return (
        <div className="answer-view">
          <Translate val="no answers yet" />
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    isLoading: state.dashboardQuizResponse.isloading,
    hasErrored: state.dashboardQuizResponse.hasErrored,
    quizResponse: state.dashboardQuizResponse,
    quiz: state.dashboardQuizResponse.quiz,
    questionResponse: state.answerQuestionResponse,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (roomCode, questionId) => dispatch(getAnsweredQuestionRequest(roomCode, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerView);
