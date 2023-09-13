import React, {memo} from 'react'
import {Controller} from 'react-hook-form'

const FormFieldControl = ({control, name, Component, ...props}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({fieldState, field: {ref, ...rest}}) => (
        <Component
          // fullWidth
          // inputRef={ref}
          {...rest}
          {...props}
          error={Boolean(fieldState.invalid)}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  )
}

export default memo(FormFieldControl)
