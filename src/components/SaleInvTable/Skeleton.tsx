import React, {memo} from 'react'

// type SkeletonProps = {}

function Skeleton() {
  return (
    <div className="flex w-full">
      {[0, 1].map((_, id) => (
        <div
          key={id}
          role="status"
          className="w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
        >
          <div className="flex w-full flex-col">
            <div className="mb-2.5 h-2.5 w-full  rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-full  rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {[0, 1, 2, 3, 4, 5].map((_, id) => (
            <>
              <div className="flex items-center justify-evenly pt-4">
                <div>
                  <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div>
                  <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  )
}

export default memo(Skeleton)
