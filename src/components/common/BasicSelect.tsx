import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material'

export type TBasicSelectOption = {label: string; value: string | number}[]

interface Props {
    label: string
    menuItems: TBasicSelectOption
    value: string | undefined
    onChange: (value: string) => void
    selectInfo?: string
}

export default function BasicSelect({label, menuItems, value, onChange, selectInfo}: Props) {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={value || ''} label={label} onChange={(e) => onChange(e.target.value)}>
                {menuItems.length !== 0 && (
                    <MenuItem value={''}>
                        <em>None</em>
                    </MenuItem>
                )}
                {menuItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                {menuItems.length === 0 && <MenuItem disabled>No options available.</MenuItem>}
            </Select>
            {selectInfo && (
                <FormHelperText sx={{color: 'warning.main', fontStyle: 'italic'}}>
                    {selectInfo}
                </FormHelperText>
            )}
        </FormControl>
    )
}
