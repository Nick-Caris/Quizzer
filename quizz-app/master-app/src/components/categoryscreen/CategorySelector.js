// Imports
import React from "react";
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getCategories, toggleCategory } from "../../actions/categoryActions"
import Translate from "../Translate"

class CategorySelector extends Component {

    render() {

        if (this.props.categories.isLoading) {
            this.props.getCategories()
        }

        return (
            <div>
                <Translate val="categorySelection" />
                <div>
                    {   
                        this.props.categories.categories.map((element) => {
                            let approve = ""
                            if(this.props.categories.selectedCategories.includes(element)) {
                                approve = "approve"
                            }
                            return (
                                <span key={element} className={`accept-reject-info ${approve}`} 
                                onClick={() => toggleHandler(element, this)}>{element}</span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function toggleHandler(category, that) {
    if (that.props.categories.selectedCategories.length < 3 || 
        that.props.categories.selectedCategories.includes(category)) {
        that.props.toggleCategory(category)
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCategories: getCategories,
            toggleCategory: toggleCategory
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector)
