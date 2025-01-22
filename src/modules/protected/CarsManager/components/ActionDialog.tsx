import {IActionState} from '../hooks/useAction.ts'
import CarRemoveConfirm from './CarRemoveConfirm.tsx'
import CarModifyForm from './CarModifyForm.tsx'

interface Props {
    actionState: IActionState | undefined
    clearAction: () => void
}

export default function ActionDialog({actionState, clearAction}: Props) {
    if (actionState) {
        switch (actionState.action) {
            case 'CREATE':
                return (
                    <CarModifyForm
                        car={actionState.car}
                        onClose={clearAction}
                        action={actionState.action}
                    />
                )
            case 'UPDATE':
                return (
                    <CarModifyForm
                        car={actionState.car}
                        onClose={clearAction}
                        action={actionState.action}
                    />
                )
            case 'DELETE':
                return (
                    actionState.car && (
                        <CarRemoveConfirm car={actionState.car} onClose={clearAction} />
                    )
                )
            default:
                return null
        }
    }
}
