import {twMerge} from 'tailwind-merge'
import {clsx, type ClassValue} from 'clsx'

// @ts-expect-error
export function cn(...inputs: ClassValue) {
  return twMerge(clsx(inputs))
}
