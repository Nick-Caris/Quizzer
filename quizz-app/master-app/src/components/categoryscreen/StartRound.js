// Imports
import React from "react";
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Translate from "../Translate"


class StartRound extends Component {
    render() {

        if(this.props.categories.selectedCategories.length < 3) {
            return (
                <button >
                    <Translate val="startRound" />
                </button>
            )
        } else {
            return (
                <Link to="/game">
                    <button className="bg-orange">
                        <Translate val="startRound" />
                    </button>
                </Link>   
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}
     
export default connect(mapStateToProps)(StartRound)