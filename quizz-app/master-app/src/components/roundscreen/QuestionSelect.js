// Imports
import React from "react";
import { connect } from 'react-redux'
import { Component } from 'react'
import { bindActionCreators } from "redux";
import Translate from '../../components/Translate'
import { getQuestions, toggleQuestion } from '../../actions/selectQuestionActions'


class QuestionSelect extends Component {
    render() {

        if(this.props.questions.isLoading) {
            this.props.getQuestions(this.props.categories)
        }

        return (
            <div className="question-select">
                <span>Questions:</span>
                {
                    this.props.questions.questions.map((element) => {
                        let approve = ""
                        if(this.props.questions.selectedQuestion === element) {
                            approve = "approve"
                        }

                        return (
                            <div key={element._id} className={`accept-reject-info ${approve}`} 
                            onClick={() => this.props.toggleQuestion(element)} >
                                <span>
                                    {element.question} 
                                </span>
                                <span>
                                    <Translate val="category"/> {element.category}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
} 

function mapStateToProps(state) {
    return {
        questions: state.questions,
        categories: state.categories.selectedCategories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getQuestions: getQuestions,
            toggleQuestion: toggleQuestion
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSelect)