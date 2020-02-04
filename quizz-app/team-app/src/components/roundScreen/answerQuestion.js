// Imports
import React, {Component} from "react";
import {connect} from 'react-redux';
import {answerQuestionRequest} from "../../actions/roundActions";
import Translate from "../Translate";
import {withRouter} from "react-router";


class AnswerQuestion extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      'teamName': this.props.waitRoom.teamName,
      'questionId': this.props.waitRoom.questionId,
      'answer': this.refs.answer.value
    };
    if(this.refs.answer.value !== "") {
      this.props.sendAnswer(data, this.props.waitRoom.roomCode);
    }
  };

  render() {

    if(this.props.question.stop) {
      this.props.history.push('/end')
    }

    if (this.props.question.status === 'SUCCESS' && !this.props.waitRoom.stopped && !this.props.question.ended && !this.props.question.stop) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="answer" ref="answer" placeholder="answer..." required/>
            <input className="bg-orange" type="submit" value="Submit" />
          </form>
        </div>
      );
    } else if (this.props.question.ended) {
      return (
        <Translate val='question has ended' />
      )
    } else if (this.props.question.ended) {
      return (
        <Translate val='quiz has ended' />
      )
    } else {
      return (
        <div>
          <Translate val="question has not yet started or has stopped." />
        </div>
      );
    }
  }

}


function mapStateToProps(state) {
  return {
    waitRoom: state.waitRoomResponse,
    state: state.waitRoomResponse,
    question: state.questionResponse,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendAnswer: (data, roomCode) => dispatch(answerQuestionRequest(data, roomCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnswerQuestion));
