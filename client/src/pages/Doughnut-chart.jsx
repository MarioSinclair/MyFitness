import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components globally
ChartJS.register(Tooltip, Legend, ArcElement);

const doughnutChartData = {
    labels: ['Daily Goal', 'Calories Consumed Today', 'Calories Burned Today'],
    datasets: [{
        label: 'Calories',
        data: [0, 0, 0],
        backgroundColor: [
            'rgba(0, 255, 0)',
            'rgba(98, 0, 255)',
            'rgba(255, 98, 0)',
        ],
        hoverBackgroundColor: [
            'rgba(0, 155, 0)',
            'rgba(46, 0, 126)',
            'rgba(132, 50, 0)',
        ],
        borderWidth: 0,
        spacing: 10,  
        hoverOffset: 20,
        borderRadius: 4,
        
    }]
};

const options = {
    responsive: true,
    cutout: '80%', 
    plugins: {
        legend: {
            display: false,
        },
    },
   
};


const DoughnutChartComponent = ({CalorieGoal, TotalCalories, CaloriesBurned}) => {

    doughnutChartData.datasets[0].data[0] = CalorieGoal;
    doughnutChartData.datasets[0].data[1] = TotalCalories;
    doughnutChartData.datasets[0].data[2] = CaloriesBurned;

    console.log(CalorieGoal, TotalCalories, CaloriesBurned);

    return (
        <Doughnut data={doughnutChartData} options={options}/>
    );
};

export {DoughnutChartComponent};
