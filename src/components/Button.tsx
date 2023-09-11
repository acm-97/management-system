import {cn} from '@/utils'
import React, {memo, type ReactElement, type ReactNode} from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'flex cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-bold uppercase',
  ],
  {
    variants: {
      variant: {
        contained: 'rounded-md',
        text: 'border-none !bg-transparent hover:!bg-transparent',
        outlined: 'border-2 border-slate-700 !bg-transparent hover:!bg-transparent',
      },
      color: {
        primary: ['bg-primary-main hover:bg-primary-dark'],
        error: ['bg-error-main hover:bg-error-dark'],
        inherit: ['bg-gray-300 text-slate-900 hover:bg-gray-400 '],
      },
      disabled: {true: 'bg-gray-400 text-gray-500 hover:bg-gray-400', false: ''},
    },
    compoundVariants: [
      {
        variant: ['contained'],
        color: ['primary', 'error', 'inherit'],
      },
      {
        variant: ['outlined'],
        color: ['primary', 'error', 'inherit'],
      },
      {
        variant: ['text'],
        color: ['primary'],
        className: 'text-primary-light p-0',
      },
      {
        variant: ['text'],
        color: ['error'],
        className: 'text-error-main p-0',
      },
      {
        variant: ['text'],
        color: ['inherit'],
        className: 'p-0 text-slate-900',
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'contained',
      disabled: false,
    },
  },
)

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>

type ButtonProps = ButtonVariantsProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    startIcon?: ReactElement<any>
    endIcon?: ReactElement<any>
  }

function Button({
  className,
  children,
  color,
  disabled,
  variant,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({color, disabled, variant}), className)}
      disabled={disabled ?? false}
      {...props}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </button>
  )
}

export default memo(Button)
