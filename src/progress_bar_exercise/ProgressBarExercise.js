import React from "react";
import Exercise from "../exercise/Exercise";
import ProgressBarSolution from "./ProgressBarSolution/ProgressBarSolution";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<ProgressBarSolution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;
