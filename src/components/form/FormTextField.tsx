import {FormControl, TextField} from '@mui/material'
import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    rules?: RegisterOptions<TFieldValues>
    label?: string
    type?: 'text' | 'email' | 'password'
    disabled?: boolean
    autoComplete?: 'on' | 'off' | 'new-password' | 'current-password'
    autoFocus?: boolean
    multiline?: boolean
    placeholder?: string
    rows?: number
}

export default function FormTextField<TFieldValues extends FieldValues>(
    props: Props<TFieldValues>,
) {
    const {
        name,
        control,
        rules,
        label,
        type = 'text',
        disabled = false,
        autoComplete,
        autoFocus,
        multiline,
        placeholder,
        rows,
    } = props

    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                disabled={disabled}
                render={({field: {ref, ...fieldProps}, fieldState: {error}}) => (
                    <TextField
                        {...fieldProps}
                        id={`${name}-field`}
                        multiline={multiline}
                        placeholder={placeholder}
                        rows={rows}
                        error={!!error}
                        helperText={error ? error.message : ''}
                        inputRef={ref}
                        label={label}
                        type={type}
                        autoComplete={autoComplete}
                        autoFocus={autoFocus}
                    />
                )}
            />
        </FormControl>
    )
}
