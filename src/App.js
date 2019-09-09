import React from 'react';
import Questionnaire from './form/Questionnaire'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import myData from './resources/questions.json';

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

  questionnaire() {
    if(!this.state.endQuestionnaire) {
    return (
      <Questionnaire ref={this.questionElement}
          categoryId={this.state.categoryId}
          questionId={this.state.questionId} 
          answers={this.state.answers}
          setAnswer={this.setAnswer}
          setCategoryQuestion={this.setCategoryQuestion}
          setStartQuestionnaire={this.setStartQuestionnaire}
          footprint={this.state.footprint}
          onSubmit={this.onSubmit}/>
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

  render() {
    return (
      <Router>
        <React.Fragment>
          <h1>Carbon Footprint</h1>

          <Link to="/about">About</Link> | 
          <Link to="/footprint">{this.state.startQuestionnaire === false ? 'Start Questionnaire' : 'Resume Questionnaire'}</Link>
          
          <Route exact path="/about" render={props => (
            <React.Fragment>
              <h2>About</h2>
            </React.Fragment>
          )}/>

          <Route exact path="/footprint" render={props => (
            <React.Fragment>
              {this.questionnaire()}  
            </React.Fragment>
          )} />

          {this.printScore()}

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
