// Imports
import React from "react";
import EnterCode from "./enterCode";
import TeamOverview from "./teamOverview";
import RoundView from "./roundView";
import QuestionView from "./questionView";
import AnswerView from "./answerView";

export const Dashboard = () => (
  <div className="grid-container">
    <EnterCode />
    <TeamOverview />
    <RoundView />
    <QuestionView />
    <AnswerView />
  </div>
);
