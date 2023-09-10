import React, {memo, type ReactElement, type ReactNode} from 'react'
import {
  BaseDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Base'
import {cn} from '@/utils'
import Button, {buttonVariants, type ButtonVariantsProps} from '../Button'

type DialgProps = ButtonVariantsProps & {
  trigger?: string | ReactElement<any>
  title?: string | ReactElement<any>
  description?: string | ReactElement<any>
  children?: ReactNode
  footer?: string | ReactElement<any>
  startIcon?: ReactElement<any>
  endIcon?: ReactElement<any>
  open?: boolean
  className?: string
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onOpenChange?: (open: boolean) => void
}

function Dialg({
  trigger,
  title,
  description,
  children,
  footer,
  variant,
  color,
  disabled,
  startIcon,
  endIcon,
  open,
  className,
  onOpenChange,
  onSave,
  onCancel,
  ...props
}: DialgProps) {
  return (
    <BaseDialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger
          className={cn(buttonVariants({variant, color, disabled}), className)}
          disabled={disabled ?? false}
          {...props}
        >
          {startIcon && startIcon}
          {trigger}
          {endIcon && endIcon}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <div className="mt-8 flex justify-end gap-4">
          {onSave && <Button onClick={onSave}>Guardar</Button>}
          {onCancel && (
            <Button color="inherit" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </BaseDialog>
  )
}

export default memo(Dialg)
