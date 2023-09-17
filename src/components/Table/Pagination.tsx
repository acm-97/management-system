import {useQueryParamsStore} from '@/hooks/useRowsSWR'
import React, {memo} from 'react'

type PaginationProps = {page?: number; pageSize?: number; pageCount?: number; total?: number}

function Pagination({page = 0, pageSize = 0, pageCount = 0, total = 0}: PaginationProps) {
  const updateQuery = useQueryParamsStore(state => state.updateQuery)

  const onNext = () => {
    updateQuery(`&pagination[page]=${page + 1}`)
  }
  const onPrev = () => {
    updateQuery(`&pagination[page]=${page - 1}`)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm text-gray-400">
        Mostrando de <span className="font-semibold text-white">1 </span> a
        <span className="font-semibold text-white"> {pageSize} </span> por página de un total de
        <span className="font-semibold text-white"> {total} </span> elementos
      </span>
      <div className="mt-0 inline-flex sm:mt-2">
        <button
          disabled={page <= 1}
          onClick={onPrev}
          className="flex h-8 items-center justify-center rounded-l bg-primary-main  px-3.5  hover:bg-primary-dark disabled:opacity-50 hover:disabled:bg-primary-main hover:disabled:opacity-50"
        >
          <svg
            className="mr-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Ant
        </button>
        <div className="flex h-8 items-center border  border-slate-700 bg-slate-900 px-2 sm:px-3.5">
          {page} / {pageCount}
        </div>
        <button
          disabled={page >= pageCount}
          onClick={onNext}
          className="flex h-8 items-center justify-center rounded-r border-0 bg-primary-main  px-3.5  hover:bg-primary-dark disabled:opacity-50 hover:disabled:bg-primary-main hover:disabled:opacity-50"
        >
          Sig
          <svg
            className="ml-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default memo(Pagination)
