import React from 'react'

export default function GetMacros(props) {
    const { macro } = props;

    return (
        <>
            <p className="macro-details">{macro.foodName}</p>
            <p className="macro-details">{macro.weight}g</p>
            <p className="macro-details">{macro.calories} calories</p>
            <p className="macro-details">{macro.protein}g</p>
            <p className="macro-details">{macro.fats}g</p>
            <p className="macro-details">{macro.carbs}g</p>
        </>
    )
}
