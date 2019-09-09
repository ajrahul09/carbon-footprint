import React from 'react'
import myData from '../resources/questions.json';

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
            <React.Fragment>
                <h3>{questionObj.question}</h3>
                {Object.keys(questionObj.options).map(key => (
                    <div key={key}>
                        <input type="radio" value={key} onChange={thisObj.onChange} name={"question"} checked={key === this.props.val} />{' '}
                        <span>{questionObj.options[key].option}</span> 
                    </div>
                ))}
            </React.Fragment>
        )
    }
}

export default Question
