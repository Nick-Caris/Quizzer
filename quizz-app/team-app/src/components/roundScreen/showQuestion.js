// Imports
import React, {Component} from "react";
import {connect} from 'react-redux';
import {getQuestionRequest} from "../../actions/roundActions";
import Translate from "../Translate";

class ShowQuestion extends Component {


  render() {

    if (this.props.question.isUpdated) {
      this.props.getQuestion(this.props.waitRoom.questionId);
    }

    if (this.props.question.status === 'SUCCESS' && !this.props.waitRoom.stopped) {
      return (
        <div key='Show question div'>
          <p key='Show question p'><Translate val="question" />: {this.props.question.question.question}</p>
        </div>
      );
    } else {
      return (
        <div key='Show question div'>
          <p key='Show question p'><Translate val="wait for question" /></p>
        </div>
      );
    }
  }

}


function mapStateToProps(state) {
  return {
    waitRoom: state.waitRoomResponse,
    question: state.questionResponse,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: (questionId) => dispatch(getQuestionRequest(questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion);
