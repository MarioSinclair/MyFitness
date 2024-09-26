
export default function validation(values) {
    let errors = {};

    const numericValues = {
        sets: Number(values.sets),
        caloriesBurned: Number(values.caloriesBurned),

    };

    if (!numericValues.sets || isNaN(numericValues.sets)) {
        errors.sets = 'Sets must be a number';
    } else if (!numericValues.caloriesBurned || isNaN(numericValues.caloriesBurned)) {
        errors.caloriesBurned = 'Calories must be a number';
    }

    return errors;
}