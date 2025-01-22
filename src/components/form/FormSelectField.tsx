import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material'
import React from 'react'

export type TFormSelectOption = {
    label: string
    value: string | number
}[]

interface Props<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    rules?: RegisterOptions<TFieldValues>
    label: string
    menuItems: TFormSelectOption
    disabled?: boolean
    selectInfo?: string
    onChange?: () => void
}

export default function FormSelectField<TFieldValues extends FieldValues>({
    name,
    control,
    rules,
    label,
    menuItems,
    disabled,
    selectInfo,
    onChange,
}: Props<TFieldValues>) {
    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                disabled={disabled}
                render={({field, fieldState: {error}}) => (
                    <React.Fragment>
                        <InputLabel id={`${name}-label`} error={!!error}>
                            {label}
                        </InputLabel>
                        <Select
                            labelId={`${name}-label`}
                            id={`${name}-select`}
                            {...field}
                            value={menuItems.length === 0 ? '' : field.value}
                            label={label}
                            error={!!error}
                            onChange={(event) => {
                                field.onChange(event)
                                onChange && onChange()
                            }}
                            renderValue={() =>
                                menuItems.map((item): string =>
                                    item.value === field.value ? item.label : '',
                                )
                            }>
                            {menuItems.length !== 0 && (
                                <MenuItem value={''}>
                                    <em>None</em>
                                </MenuItem>
                            )}
                            {menuItems?.map(({value, label}) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                            {menuItems.length === 0 && (
                                <MenuItem disabled>No options available.</MenuItem>
                            )}
                        </Select>
                        {selectInfo && (
                            <FormHelperText sx={{color: 'warning.main', fontStyle: 'italic'}}>
                                {selectInfo}
                            </FormHelperText>
                        )}
                        {error && <FormHelperText error={true}>{error.message}</FormHelperText>}
                    </React.Fragment>
                )}
            />
        </FormControl>
    )
}
