import React from 'react';

export default function Data(props) {
    const { fitnessData } = props;

    return (
        <>
            <p className="macro-details">{fitnessData.exerciseName}</p>
            <p className="macro-details">{fitnessData.sets}</p>
            <p className="macro-details">{fitnessData.caloriesBurned}</p>
        </>
    );
}