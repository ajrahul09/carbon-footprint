import React from 'react'

class Question extends React.Component {

    state = {
        answer: ''
    }

    changeState(id) {
      const val = this.props.answers[id] ? 
      this.props.answers[id] : '';
      this.setState({answer: val})
    }

    onChange = (e) => {
        this.setState({answer: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    submitButton() {
        if(this.props.questionId === Object.keys(this.props.questions).length) {
            return(
                <input type="submit" name="Submit"></input>
            )
        }
    }

    previousButton() {
      if(this.props.questionId !== 1) {
        return(
          <React.Fragment>
            <button onClick={this._prev}>Previous</button>
          </React.Fragment>
        );
      }
    }
  
    nextButton() {
      if(this.props.questionId < Object.keys(this.props.questions).length) {
        return(
          <React.Fragment>
            <button onClick={this._next}>Next</button>
          </React.Fragment>
        );
      }
    }
  
    _prev = () => {
        const id = this.props.questionId
        this.props.prev(id, this.state.answer)
    }

    _next = () => {
        const id = this.props.questionId
        this.props.next(id, this.state.answer)
    }

    calFootprint() {
        if(!this.props.footprint) {
            return(
                <React.Fragment>
                    <form onSubmit={this.onSubmit}> 
                        <h3>{this.props.questions[this.props.questionId]}</h3>
                        <p>Answer: <input type="text" 
                        value={this.state.answer}
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
