import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, LinearScale, BarElement, CategoryScale} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale , BarElement, Tooltip, Legend, );

const barChartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      label: 'Nutrition',
      data: [0,0,0],
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
      borderRadius: 8,
    }],
};


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        }
    }
};


const BarChartComponent = ( {Protein, Carbs, Fats}) => {
    
    barChartData.datasets[0].data[0] = Protein;
    barChartData.datasets[0].data[1] = Carbs;
    barChartData.datasets[0].data[2] = Fats;


    return (
        <Bar data={barChartData} options={options} />
    )
    
};

export { BarChartComponent };