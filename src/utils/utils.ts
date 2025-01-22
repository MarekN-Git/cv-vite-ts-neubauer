import {TBasicSelectOption} from '../components/common/BasicSelect.tsx'
import {TFormSelectOption} from '../components/form/FormSelectField.tsx'

export function getSelectOptions(data: string[]): TBasicSelectOption | TFormSelectOption {
    return data.map((item) => ({label: item, value: item}))
}
