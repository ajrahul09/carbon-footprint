import React, {useState, useEffect} from 'react'
import PieChart from 'react-minimal-pie-chart';
import './Result.css'
import myData from '../resources/questions.json';

const Result = props => {

    const [pieChartData, setPieChartData] = useState([]);
    
    const preparePieChartData = () => {
        console.log('a');
        var arr = [];
        var ans = props.answers;
        if(ans && Object.keys(ans).length <= 0) {
            if(props.endQuestionnaire === false) {
                props.history.push('/');
            }
        }
        Object.keys(ans).map(function(key) {
            var score = 0;
            Object.keys(ans[key]).map(function(key1) {
                score += myData[key][key1].options[ans[key][key1]].score
            });
            var obj = {
                title: key,
                value: score,
                color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
            }
            arr.push(obj);
        });
        setPieChartData(arr);
    };

    useEffect(() => {
        preparePieChartData();
    }, [])
    
    return (
        <div>
            <div className="resultTitle">Results</div>
            <PieChart className="pieChart"
                data={ pieChartData }
                animate
                lengthAngle={-360}
                label={({ data, dataIndex }) =>
                    Math.round(data[dataIndex].percentage) + '%'
                }
                radius={42}
                labelPosition={112}
                labelStyle={{
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                    fill: '#121212'
                }}
            />
            <div className="resultDiv">
            {pieChartData.map(function(name, index){
                return <div key={ index }><span className="resultCat">{name.title}</span>: {name.value}</div>;
                })}
            </div>
        </div>
    )
}

export default Result
