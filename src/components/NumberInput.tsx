// https://s-yadav.github.io/react-number-format/docs/numeric_format
import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import {
  NumberFormatValues,
  NumericFormat,
  OnValueChange,
} from 'react-number-format'
import Input from './Input'

type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  allowLeadingZeros?: boolean
  error?: string | boolean
  errorClassName?: string
  register?: UseFormRegisterReturn | null
  startIcon?: JSX.Element
  startIconContainerClassName?: string
  endIcon?: JSX.Element
  inputClassName?: string
  containerClassName?: string
  endIconContainerClassName?: string
  decimalScale?: number
  fixedDecimalScale?: boolean
  onChange?: OnValueChange
  value?: string | number | null
  defaultValue?: string | number | null
  allowNegative?: boolean
  isAllowed?: (values: NumberFormatValues) => boolean
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      allowLeadingZeros,
      allowNegative = true,
      decimalScale,
      errorClassName,
      fixedDecimalScale = Boolean(decimalScale),
      onChange,
      value,
      defaultValue,
      isAllowed,
      ...props
    },
    ref
  ) => {
    return (
      <NumericFormat
        {...props}
        allowNegative={allowNegative}
        isAllowed={isAllowed}
        value={value}
        errorClassName={errorClassName}
        defaultValue={defaultValue}
        onValueChange={onChange}
        customInput={Input}
        getInputRef={ref}
        allowLeadingZeros={allowLeadingZeros}
        thousandSeparator=','
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
