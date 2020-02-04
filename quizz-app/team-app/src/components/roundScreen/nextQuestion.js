// Imports
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import Translate from "../Translate";

class StartQuizz extends Component {

  render() {
    if (this.props.status.status === 'Your team has been accepted.') {
      return (
        <Link to="/round">
          <button className="bigbutton bg-grey">
            <Translate val="next question" />
          </button>
        </Link>
      )
    } else {
      return (
        <button className="bigbutton bg-grey" disabled>
          <Translate val="next question" />
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

