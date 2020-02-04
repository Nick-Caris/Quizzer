// Imports
import React, {Component} from "react";
import Translate from "../Translate";
import {connect} from "react-redux";
import {getAnsweredQuestionRequest} from "../../actions/getAnsweredQuestionsAction";
import getQuestionViewReducer from "../../reducers/get-question-view-reducer";
import {getQuestionViewRequest} from "../../actions/getQuestionViewAction";

class QuestionView extends Component {


  render() {

    let numberOfQuestions = 0;

    if (this.props.answerResponse.isUpdated) {
      this.props.getQuestion( this.props.answerResponse.questionId)
    }
    console.log('QUESTIONVIEW : ', this.props.answerResponse);


    if (this.props.answerResponse.hasLoaded) {
      return (
        <div className="question-view">
          <span><Translate val="category number" />{this.props.quiz.round}</span>
          <br />
          <span><Translate val="category" />{this.props.answerView.category}</span>
          <br />
          <span><Translate val="question" />{this.props.answerView.question}</span>
        </div>
      );
    } else {
      return (
        <div className="question-view">
          <span><Translate val="category" />0</span>
          <br />
          <span><Translate val="question" />0</span>
        </div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.dashboardQuizResponse.quiz,
    quizResponse: state.dashboardQuizResponse,
    answerView: state.dashboardViewQuestionResponse.question,
    answerResponse: state.dashboardViewQuestionResponse,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: (questionId) => dispatch(getQuestionViewRequest(questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
