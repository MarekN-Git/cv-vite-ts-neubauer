import {RegisterOptions} from 'react-hook-form'
import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'

type TCarFormRules = {
    [key in keyof Partial<ICarDetails>]: RegisterOptions<ICarDetails>
}

export const carFormRules: TCarFormRules = {
    brand: {
        required: 'Brand is required!',
    },
    model: {
        required: 'Model is required!',
    },
    year: {
        required: 'Year is required!',
        pattern: {
            value: /^\d+$/,
            message: 'Allows only numbers without commas or dots.',
        },
    },
    mileage: {
        required: 'Mileage is required!',
        pattern: {
            value: /^\d+$/,
            message: 'Allows only numbers without commas or dots.',
        },
    },
    price: {
        required: 'Price is required!',
        pattern: {
            value: /^\d+$/,
            message: 'Allows only numbers without commas or dots.',
        },
    },
    fuelType: {
        required: 'Fuel Type is required!',
    },
    transmission: {
        required: 'Transmission is required!',
    },
}
