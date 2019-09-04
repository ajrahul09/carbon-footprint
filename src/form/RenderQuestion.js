import React from 'react'
import myData from '../resources/questions.json';

class RenderQuestion extends React.Component {
    render() {
        return (
            <React.Fragment>
                {Object.keys(myData).map(key => (
                    <p>{key}</p>
                ))}
            </React.Fragment>
        )
    }
}

export default RenderQuestion
