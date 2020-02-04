import React from "react";
import QuestionSelect from "./QuestionSelect";
import QuestionSelected from "./QuestionSelected";
import TeamAnswers from "./TeamAnswers";
import QuizManagement from "./QuizManagement";
import QuestionManagement from "./QuestionManagement";


export const RoundScreen = () => (
    <div className="grid-wrapper">
        <QuestionSelect className="question-select" />
        <QuestionManagement className="question-management"/>
        <QuestionSelected className="question-selected"/>
        <TeamAnswers className="team-answers"/>
        <QuizManagement className="quiz-management"/>
    </div>
)