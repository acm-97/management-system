import * as React from 'react'
import {DayPicker} from 'react-day-picker'

import {cn} from '@/utils'
import {buttonVariants} from '@/components/Button'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  className?: string
  classNames?: Record<string, any>
  showOutsideDays?: boolean
  mode?: string
}

export default function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 ', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 text-white',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({variant: 'outlined'}),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'opacity-80 rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20  hover:bg-primary-light hover:rounded-lg',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:bg-primary-light [&:has(>.day-range-start)]:bg-primary-light [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({variant: 'text'}),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 !text-gray-200',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected: '!bg-primary-light hover:!bg-primary-light focus:!bg-primary-light',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'opacity-40',
        day_disabled: ' opacity-50',
        day_range_middle: 'aria-selected:rounded-none aria-selected:!bg-primary-dark',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({...props}) => <IconChevronLeft className="h-4 w-4" />,
        IconRight: ({...props}) => <IconChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export {Calendar}
