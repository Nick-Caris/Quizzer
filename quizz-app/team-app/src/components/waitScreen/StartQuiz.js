// Imports
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import Translate from "../Translate";

class StartQuizz extends Component {

  render() {
    if (this.props.status.status === 'the Quiz has started you will can now join the quiz.') {
      return (
        <Link to="/round">
          <button className="bigbutton bg-orange">
            <Translate val="start quiz" />
          </button>
        </Link>
      )
    } else {
      return (
        <button className="bigbutton bg-grey" disabled>
          <Translate val="start quiz" />
        </button>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    status: state.waitRoomResponse
  }
}

export default connect(mapStateToProps)(StartQuizz)

