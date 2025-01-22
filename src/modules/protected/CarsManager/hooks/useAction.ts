import {useCallback, useState} from 'react'
import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'

type TActionKeys = 'CREATE' | 'UPDATE' | 'DELETE'

interface IActionState {
    car: ICarDetails | undefined
    action: TActionKeys
}

export default function useAction() {
    const [state, setState] = useState<IActionState | undefined>(undefined)

    const callAction = useCallback(
        (car: ICarDetails | undefined, action: TActionKeys) => {
            setState({car: car, action: action})
        },
        [state],
    )

    const clearAction = useCallback(() => {
        setState(undefined)
    }, [state])

    return {
        actionState: state,
        callAction,
        clearAction,
    }
}

export type {TActionKeys, IActionState}
