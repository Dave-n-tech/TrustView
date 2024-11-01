import React from 'react'

export const SubmitReview = () => {
  return (
    <div className='container bg-slate-500 p-3 mx-auto mt-4 h-screen'>
      <h1 className='text-xl font-bold text-center'>SUBMIT REVIEW</h1>
      <form>
        <input type="text" placeholder='Title' />
      </form>
    </div>
  )
}
