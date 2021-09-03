import React from 'react'
import './Question.css'

const Question = props => {

    const onChange = (e) => {
        props.onChange(e.target.value);
    }
    
    return (
        <div className="questionDiv">
            <div className="questionTitle">{props.questionObj.question}</div>
            {Object.keys(props.questionObj.options).map(key => (
                <div className="questionOptionDiv" key={key}>
                    <input type="radio" value={key} onChange={onChange} name={"question"} checked={key === props.val} />{' '}
                    <span className="questionOption">{props.questionObj.options[key].option}</span> 
                </div>
            ))}
        </div>
    )
}

export default Question
