import React from 'react'
import myData from '../resources/questions.json';

class Question extends React.Component {

    state = {
        questionId: 1,
        questions: myData,
        answers: {},
        currentAnswer: '',
        score: ''
    }

    changeState(id) {
      const val = this.props.answers[id] ? 
      this.props.answers[id] : '';
      this.setState({answer: val})
    }

    onChange = (e) => {
        this.setState({currentAnswer: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    submitButton() {
        if(this.state.questionId === Object.keys(this.state.questions).length) {
            return(
                <input type="submit" name="Submit"></input>
            )
        }
    }

    previousButton() {
      if(this.state.questionId !== 1) {
        return(
          <React.Fragment>
            <button onClick={this._prev}>Previous</button>
          </React.Fragment>
        );
      }
    }
  
    nextButton() {
      if(this.state.questionId < Object.keys(this.props.questions).length) {
        return(
          <React.Fragment>
            <button onClick={this._next}>Next</button>
          </React.Fragment>
        );
      }
    }
  
    _prev = () => {
        const id = this.state.questionId - 1
        this.setState({questionId: id})
        // this.props.prev(id, this.state.answer)
    }

    _next = () => {
        const id = this.state.questionId + 1
        this.setState({questionId: id})
        // this.props.next(id, this.state.answer)
    }

    calFootprint() {
        if(!this.props.footprint) {
            return(
                <React.Fragment>
                    <form onSubmit={this.onSubmit}> 
                        <h3>{this.state.questions[this.state.questionId].question}</h3>
                        <p>Answer: <input type="text" 
                        value={this.state.currentAnswer}
                        onChange={this.onChange}/></p>

                        {this.previousButton()}
                        {this.nextButton()}
                        {this.submitButton()}
                    </form>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div>
                {this.calFootprint()}
            </div>
        )
    }
}

export default Question
