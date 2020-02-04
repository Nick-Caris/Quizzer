// Imports
import React from "react";
import { Component } from "react"
import { connect } from "react-redux";
import Translate from "../Translate"

// Constants
const NR_OF_CATEGORIES_SELECTED = 3

class CategoryCounter extends Component {
    
    render() {

        const count = NR_OF_CATEGORIES_SELECTED - this.props.categories.selectedCategories.length

        return (
            <p>
                <Translate val="select" /> {count} <Translate val="categories" />
            </p>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoryCounter)