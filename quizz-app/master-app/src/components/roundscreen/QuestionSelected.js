import React from "react";
import { Component } from "react"
import { connect } from 'react-redux'

class QuestionSelected extends Component {
    
    render() {

        return (
            <div className="question-selected">
                <p>
                    {
                        this.props.questionManagement.question.question
                    }
                </p>
                <p>
                    {
                        this.props.questionManagement.question.answer
                    }
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questionManagement: state.questionManagement
    }
}
    
export default connect(mapStateToProps)(QuestionSelected)