interface ICarDetails {
    id: number
    name: string
    brand: string
    model: string
    year: number
    price: number
    fuelType: string
    mileage: number
    color: string
    transmission: string
}

interface ICars {
    cars: ICarDetails[]
}

export type {ICarDetails, ICars}
