import React from 'react';
import Question from './Question'
import myData from '../resources/questions.json';

class Questionnaire extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        categoryId: props.categoryId,
        questionId: props.questionId,
        answers: props.answers,
        score: 0
      }

      this.props.setStartQuestionnaire(true);
    }

    onChange = (val) => {
        const arr = {...this.state.answers}
        if(arr[this.state.categoryId] === undefined) {
          arr[this.state.categoryId] = {}
        }
        arr[this.state.categoryId][this.state.questionId] = val
        this.setState({answers: arr})
        this.props.setAnswer(arr);
        this.calScore(arr);
    }

    calScore(ans) {
      var currScore = 0;
      Object.keys(ans).map(function(key1) {
        Object.keys(ans[key1]).map(function(key) {
          currScore += myData[key1][key].options[ans[key1][key]].score
        })
      })
      this.setState({score: currScore})
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.score);
    }

    submitButton() {
      var lastCategory = Object.keys(myData)[Object.keys(myData).length - 1];
      var lastQuestion = parseInt(Object.keys(myData[lastCategory])[Object.keys(myData[lastCategory]).length - 1]);
        if(lastCategory === this.state.categoryId && lastQuestion === this.state.questionId) {
            return(
                <input type="submit" name="Submit"></input>
            )
        }
    }

    previousButton() {
      var firstCategory = Object.keys(myData)[0];
      if(!(firstCategory === this.state.categoryId && this.state.questionId === 1)) {
        return(
          <React.Fragment>
            <button type="button" onClick={this._prev}>Previous</button>
          </React.Fragment>
        );
      }
    }
  
    nextButton(categoryId) {
      var lastCategory = Object.keys(myData)[Object.keys(myData).length - 1];
      var lastQuestion = parseInt(Object.keys(myData[lastCategory])[Object.keys(myData[lastCategory]).length - 1]);
      if(!(lastCategory === this.state.categoryId && lastQuestion === this.state.questionId)) {
        return(
          <React.Fragment>
            <button type="button" onClick={this._next}>Next</button>
          </React.Fragment>
        );
      }
    }
  
    _prev = () => {
        var id = '', nextCategory = '';
        if(this.state.questionId === 1) {
          var keys = Object.keys(myData)
          var nextIndex = keys.indexOf(this.state.categoryId) - 1;
          nextCategory = keys[nextIndex];
          id = parseInt(Object.keys(myData[nextCategory])[Object.keys(myData[nextCategory]).length - 1]);;
        } else {
          id = this.state.questionId - 1;
          nextCategory = this.state.categoryId;
        }
        this.setState({questionId: id, categoryId: nextCategory})
        this.props.setCategoryQuestion(nextCategory, id);
    }

    _next = () => {
        var lastQuestion = parseInt(Object.keys(myData[this.state.categoryId])[Object.keys(myData[this.state.categoryId]).length - 1]);
        var id = '', nextCategory = '';
        if(this.state.questionId === lastQuestion) {
          var keys = Object.keys(myData)
          var nextIndex = keys.indexOf(this.state.categoryId) + 1;
          nextCategory = keys[nextIndex];
          id = 1;
        }
        else {
          id = this.state.questionId + 1
          nextCategory = this.state.categoryId
        }
        this.setState({questionId: id, categoryId: nextCategory})
        this.props.setCategoryQuestion(nextCategory, id);
    }

    printAnswer() {
      if(this.state.answers[this.state.questionId] === undefined)
        return '';
      else
        return this.state.answers[this.state.questionId]
    }

    printOptions(key) {
      const id = this.state.questionId;
      return myData[id].options[key].option;
    }

    currVal() {
      const ans = this.state.answers;
      console.log(ans);
      if(ans[this.state.categoryId] !== undefined && ans[this.state.categoryId][this.state.questionId] !== undefined) {
        return ans[this.state.categoryId][this.state.questionId]
      } else {
        return 0;
      }
    }

    calFootprint() {
        if(!this.props.footprint) {
          const [categoryId, questionId] = [this.state.categoryId, this.state.questionId];
            return(
                <React.Fragment>
                    <form onSubmit={this.onSubmit}> 

                      <div>

                            <h2>{categoryId}</h2>
                            <h4>Q. {this.state.questionId}/{parseInt(Object.keys(myData[categoryId])[Object.keys(myData[categoryId]).length - 1])}</h4>

                            <React.Fragment key={categoryId}>
                              <Question
                                questionObj={myData[categoryId][questionId]}
                                val={this.currVal()}
                                onChange={this.onChange}
                              />
                              {this.previousButton(categoryId)}
                              {this.nextButton(categoryId)}
                              {this.submitButton()}
                            </React.Fragment>
                      </div>

                        
                        {this.state.score}
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

export default Questionnaire
