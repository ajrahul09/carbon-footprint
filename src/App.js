import React, { useState, useContext } from 'react';
import Questionnaire from './form/Questionnaire'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import myData from './resources/questions.json';
import Result from './result/Result'
import QuestionContext from './store/question-context';

const App = () => {

  const [categoryId, setCategoryId] = useState(Object.keys(myData)[0]);
  const [questionId, setQuestionId] = useState(parseInt(Object.keys(myData[categoryId])[0]))

  const quesCtx = useContext(QuestionContext)
  const quesState = quesCtx.questionnaireState

  const setCategoryQuestion = (categoryId, questionId) => {
    setCategoryId(categoryId)
    setQuestionId(questionId)
  }

  const questionnaire = props => {
    if (!quesState.endQuestionnaire) {
      return (
        <React.Fragment>
          <Questionnaire {...props} 
            categoryId={categoryId}
            questionId={questionId}
            answers={quesState.answers}
            setAnswer={quesCtx.updateAnswer}
            setCategoryQuestion={setCategoryQuestion}
            setStartQuestionnaire={quesCtx.updateStartQuestionnaire}
            // footprint={this.state.footprint}
            onSubmit={quesCtx.handleOnSubmit}
          />
        </React.Fragment>
      )
    }
  }

  const printScore = () => {
    if (quesState.endQuestionnaire) {
      return (
        <div>{quesState.score}</div>
      )
    }
  }

  const retakeQuestionnaire = () => {
    const categoryId = Object.keys(myData)[0];
    const questionId = parseInt(Object.keys(myData[categoryId])[0])

    quesCtx.resetQuestionnaire()
  }

  const printQuestionnaire = () => {
    if (quesState.endQuestionnaire === true) {
      return (
        <React.Fragment>
          <button><Link className="link" to="/results">See results</Link></button>
          <button onClick={retakeQuestionnaire}>Retake Questionnaire</button>
        </React.Fragment>
      )
    } else if (quesState.startQuestionnaire === false) {
      return <button><Link className="link" to="/questionnaire">Start Questionnaire</Link></button>
    } else {
      return <button><Link className="link" to="/questionnaire">Resume Questionnaire</Link></button>
    }
  }

  return (
    <Router>
      <React.Fragment>

        <div className="bodyContainer">
          <div className="logoContainer">
            <Link to="/" className="logo"></Link>
          </div>
          <div className="mainContainer">
            <Route exact path="/" render={props => (
              <React.Fragment>
                <div className="homePagePanel">
                  <div className="footprintHeading">How big is your environment footprint?<br />
                    <span className="footprintDesc">The planet is in crisis - from climate change to the pollution in our oceans and devastation of our forests.
                      It's up to all of us to fix it.
                      Take your first step with our environmental footprint calculator.</span>
                    <br />
                    {printQuestionnaire()}
                  </div>
                </div>
              </React.Fragment>
            )} />
            <Route exact path="/questionnaire" render={props => (
              <div className="questionContainer">
                <div className="questionPanel">
                  {questionnaire(props)}
                </div>
                <div className="imagePanel"></div>
              </div>
            )} />
            <Route exact path="/results" render={props => (
              <div className="resultsContainer">
                <Result {...props}
                  score={quesState.score}
                  answers={quesState.answers}
                  endQuestionnaire={quesCtx.endQuestionnaire}
                />
              </div>
            )} />
          </div>
        </div>

      </React.Fragment>
    </Router>
  );
}

export default App;
