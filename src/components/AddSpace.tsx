import React, {memo} from 'react'
import {FormFieldControl, TextField} from '@/components'
import * as z from 'zod'
import Button from './Button'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import useSpacesSWR from '@/hooks/useSpaceSWR'
const SpaceSchema = z.object({
  title: z
    .string()
    .min(1, 'Debe contener al menos dos letras.')
    .refine(
      value => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
      'El nombre solo puede contener letras.',
    ),
})

function AddSpace() {
  const {createSpace} = useSpacesSWR()
  const {
    control,
    handleSubmit,
    formState: {isValidating, isLoading},
  } = useForm<z.infer<typeof SpaceSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SpaceSchema),
  })

  const onSubmit: SubmitHandler<typeof SpaceSchema> = data => {
    createSpace({payload: data})
  }

  return (
    <div className="flex items-center">
      <FormFieldControl
        control={control}
        Component={TextField}
        name="title"
        label={'Space name'}
        className={{
          wrapper: 'rounded-r-none !border-r-0',
          input: 'rounded-r-none !border-r-0',
          label: '!border-r-0 after:rounded-tr-none',
        }}
      />
      <Button
        disabled={isValidating || isLoading}
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="h-[2.6rem] rounded-l-none"
      >
        Crear
      </Button>
    </div>
  )
}

export default memo(AddSpace)
