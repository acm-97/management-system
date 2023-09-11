import React from 'react'
import {format} from 'date-fns'

import {cn} from '@/utils'

import Button, {buttonVariants} from '@/components/Button'
import Calendar, {type CalendarProps} from './Calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components'
import {IconCalendarEvent} from '@tabler/icons-react'

export default function DatePickerField(props: any) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({variant: 'outlined'}),
          'w-[240px] justify-start text-left font-normal',
          !props?.selected && 'text-gray-500',
        )}
      >
        <IconCalendarEvent size={16} />
        {props?.selected ? format(props?.selected as Date, 'PPP') : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto border-slate-600 bg-primary-dark p-0" align="start">
        <Calendar mode="single" initialFocus {...props} />
      </PopoverContent>
    </Popover>
  )
}
