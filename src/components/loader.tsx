import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-slate-600"></div>
    </div>
  )
}

export default Loader
