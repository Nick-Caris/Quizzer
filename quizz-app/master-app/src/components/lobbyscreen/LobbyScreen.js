// Imports
import React from "react";
import OpenRoom from './OpenRoom';
import RoomCode from "./RoomCode";
import LanguageToggle from "./LanguageToggle"
import TeamApproval from "./TeamApproval";
import StartQuizz from "./StartQuiz";

export const LobbyScreen = () => (
  <div>
    <OpenRoom />
    <RoomCode />
    <LanguageToggle />
    <TeamApproval />
    <StartQuizz />
  </div>
)
