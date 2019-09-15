import React from 'react';
import Questionnaire from './form/Questionnaire'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import myData from './resources/questions.json';
import Result from './result/Result'

class App extends React.Component {

  constructor(props) {
    super(props);
    const categoryId = Object.keys(myData)[0];
    const questionId = parseInt(Object.keys(myData[categoryId])[0])
    
    this.state = {
      startQuestionnaire: false,
      endQuestionnaire: false,
      categoryId: categoryId,
      questionId: questionId,
      answers: {},
      score: 0
    }
  }

  onSubmit = (val) => {
    this.setState({
      score: val,
      endQuestionnaire: true,
    })
  }

  setAnswer = (val) => {
    this.setState({answers: val})
  }

  setCategoryQuestion = (categoryId, questionId) => {
    this.setState({categoryId: categoryId, questionId: questionId})
  }

  setStartQuestionnaire = (val) => {
    this.setState({startQuestionnaire: val})
  }

  questionnaire(props) {
    if(!this.state.endQuestionnaire) {
    return (
        <React.Fragment>
          <Questionnaire {...props} ref={this.questionElement}
            categoryId={this.state.categoryId}
            questionId={this.state.questionId} 
            answers={this.state.answers}
            setAnswer={this.setAnswer}
            setCategoryQuestion={this.setCategoryQuestion}
            setStartQuestionnaire={this.setStartQuestionnaire}
            footprint={this.state.footprint}
            onSubmit={this.onSubmit} 
          />
        </React.Fragment>
      )
    }
  }

  printScore() {
    if(this.state.endQuestionnaire) {
      return (
        <div>{this.state.score}</div>
      )
    }
  }

  retakeQuestionnaire = () => {
    const categoryId = Object.keys(myData)[0];
    const questionId = parseInt(Object.keys(myData[categoryId])[0])
    this.setState({
      score: 0,
      startQuestionnaire: false,
      endQuestionnaire: false,
      answers: {},
      categoryId: categoryId,
      questionId: questionId
    })
  }

  printQuestionnaire() {
    if(this.state.endQuestionnaire === true) {
      return (
        <React.Fragment>
          <button><Link className="link" to="/results">See results</Link></button>
          <button onClick={this.retakeQuestionnaire}>Retake Questionnaire</button>
        </React.Fragment>
      )
    } else if(this.state.startQuestionnaire === false) {
      return <button><Link className="link" to="/questionnaire">Start Questionnaire</Link></button>
    } else {
      return <button><Link className="link" to="/questionnaire">Resume Questionnaire</Link></button>
    }
  }

  render() {
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
                  <div className="footprintHeading">How big is your environment footprint?<br/>
                  <span className="footprintDesc">The planet is in crisis - from climate change to the pollution in our oceans and devastation of our forests. 
                    It's up to all of us to fix it. 
                    Take your first step with our environmental footprint calculator.</span>
                  <br/>
                  {this.printQuestionnaire()}
                  </div>
                </div>
                </React.Fragment>
              )}/>
              <Route exact path="/questionnaire" render={props => (
                <div className="questionContainer">
                  <div className="questionPanel">
                    {this.questionnaire(props)}
                  </div> 
                  <div className="imagePanel"></div>
                </div>
              )}/>
              <Route exact path="/results" render={props => (
                <div className="resultsContainer">
                  <Result {...props}
                  score={this.state.score}
                  answers={this.state.answers}
                  endQuestionnaire={this.state.endQuestionnaire}
                  />
                </div>
              )}/>
            </div>
          </div>

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
