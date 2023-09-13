import {cn} from '@/utils'
import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

export const inputVariants = cva(
  [
    'peer h-full w-full rounded-[7px] border !border-t-transparent bg-transparent  px-3 py-3.5 font-sans text-base font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:!border-gray-200 autofill:!bg-transparent focus:border-2 focus:!border-primary-light focus:!border-t-transparent focus:outline-0  disabled:!border-gray-500 disabled:!border-t-transparent  disabled:text-gray-400 disabled:placeholder-shown:!border-gray-500',
  ],
  {
    variants: {
      error: {
        true: ' !border-pink-500 !border-t-transparent placeholder-shown:!border-pink-500 focus:!border-pink-500 focus:!border-t-transparent',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export const labelVariants = cva(
  [
    "before:content[' '] after:content[' '] pointer-events-none absolute -top-2 left-0 flex h-full w-full select-none text-[12px] font-normal leading-tight transition-all before:pointer-events-none before:mr-1 before:mt-[8px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[8px] after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-primary-light peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-disabled:font-semibold peer-disabled:text-gray-500 peer-disabled:before:border-gray-500 peer-disabled:after:border-gray-500",
    'peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.95] peer-focus:text-primary-light peer-focus:before:border-primary-light peer-focus:after:border-primary-light peer-disabled:peer-placeholder-shown:font-semibold peer-disabled:peer-placeholder-shown:text-gray-500',
  ],
  {
    variants: {
      error: {
        true: '!text-pink-500 before:border-pink-500 after:border-pink-500 peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500 ',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export type InputVariantsProps = VariantProps<typeof inputVariants>
export type LabelVariantsProps = VariantProps<typeof labelVariants>

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantsProps,
    LabelVariantsProps {
  helperText?: string
  label?: string
  className?: {wrapper?: string; input?: string; label?: string}
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, error, helperText, label, ...props}, ref) => {
    return props?.type === 'color' ? (
      <input
        className="h-8 w-8 rounded-md border border-solid bg-transparent p-0.5 hover:cursor-pointer"
        {...props}
      />
    ) : (
      <div className={cn('relative h-10 w-full min-w-[200px]', className?.wrapper, {'mb-2.5': error})}>
        <input
          className={cn(inputVariants({error}), className?.input)}
          ref={ref}
          {...props}
          placeholder=" "
          autoComplete="off"
        />
        {label && <label className={cn(labelVariants({error}), className?.label)}>{label}</label>}
        {error && (
          <span className="absolute -bottom-6 left-3 text-sm text-pink-500">{helperText}</span>
        )}
      </div>
    )
  },
)
TextField.displayName = 'TextField'

export default TextField
