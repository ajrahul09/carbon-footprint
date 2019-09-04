import React from 'react';
import Question from './form/Question'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.questionElement = React.createRef();
  }

  state = {
    footprint: false,
    questionId: 1,
    questions: {
      '1': 'What is your commute distance?',
      '2': 'Do you take a shared cab or drive?'
    },
    answers: {}
  }

  onSubmit = (e) => {
    console.log('Hey from app.js');
    this.setState({
      footprint: true,
      questionId: this.state.questionId,
      questions: this.state.questions,
      answers: this.state.answers
    })
  }

  onClick = (id, answer) => {
    this.setState({questionId: this.state.questionId,
      questions: this.state.questions,
      answers: {[id]: answer}
    })
  }

  prev = (id, answer) => {
    this.setState({questionId: this.state.questionId - 1,
      questions: this.state.questions,
      answers: {...this.state.answers, [id]: answer}
    })
    this.questionElement.current.changeState(id - 1)
  }

  next = (id, answer) => {
    this.setState({questionId: this.state.questionId + 1,
      questions: this.state.questions,
      answers: {...this.state.answers, [id]: answer}
    })
    this.questionElement.current.changeState(id + 1)
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <h1>Carbon Footprint</h1>

          <Link to="/about">About</Link> | <Link to="/footprint">Footprint</Link>
          
          <Route exact path="/about" render={props => (
            <React.Fragment>
              <h2>About</h2>
            </React.Fragment>
          )}/>

          <Route exact path="/footprint" render={props => (
            <React.Fragment>
              <Question ref={this.questionElement}
                questionId={this.state.questionId} 
                questions={this.state.questions}
                answers={this.state.answers}
                footprint={this.state.footprint}
                onClick={this.onClick} 
                next={this.next}
                prev={this.prev}
                onSubmit={this.onSubmit}/>
              </React.Fragment>
          )} />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
