import React from 'react'
import myData from '../resources/questions.json';
import './Question.css'

class Question extends React.Component {
    
    printOptions(key) {
        const id = this.state.questionId;
        return myData[id].options[key].option;
    }

    onChange = (e) => {
        this.props.onChange(e.target.value);
    }
    
    render() {
        const thisObj = this;
        const questionObj = this.props.questionObj;
        return (
            <div className="questionDiv">
                <div className="questionTitle">{questionObj.question}</div>
                {Object.keys(questionObj.options).map(key => (
                    <div className="questionOptionDiv" key={key}>
                        <input type="radio" value={key} onChange={thisObj.onChange} name={"question"} checked={key === this.props.val} />{' '}
                        <span className="questionOption">{questionObj.options[key].option}</span> 
                    </div>
                ))}
            </div>
        )
    }
}

export default Question
