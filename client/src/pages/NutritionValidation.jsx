
export default function validation(values) {
    let errors = {};

    const numericValues = {
        weight: Number(values.weight),
        calories: Number(values.calories),
        protein: Number(values.protein),
        fats: Number(values.fats),
        carbs: Number(values.carbs),
    };

    if (!numericValues.weight || isNaN(numericValues.weight)) {
        errors.weight = 'Weight must be a number';
    } else if (!numericValues.calories || isNaN(numericValues.calories)) {
        errors.calories = 'Calories must be a number';
    } else if (!numericValues.protein || isNaN(numericValues.protein)) {
        errors.protein = 'Protein must be a number';
    } else if (!numericValues.fats || isNaN(numericValues.fats)) {
        errors.fats = 'Fats must be a number';
    } else if (!numericValues.carbs || isNaN(numericValues.carbs)) {
        errors.carbs = 'Carbs must be a number';
    }

    return errors;
}