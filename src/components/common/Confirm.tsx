import React from 'react'

const Confirm = (props : { handleConfirm : (value : boolean) => void, title : string }) => {


  return (
    <div className=' flex flex-col items-center size-max p-20 rounded-xl bg-blue-400/70 backdrop-blur-lg text-white font-bold  shadow-2xl'>
        <p className='text-2xl'>{props.title}</p>
        <p className='text-2xl'>Ingin kembali ke halaman utama ?</p>
        <div className='flex gap-10 mt-10'>
            <button onClick={() => props.handleConfirm(false)} className='w-40  text-xl py-2 rounded bg-red-500 hover:bg-red-600 active:bg-red-700'>Tidak</button>
            <button onClick={() => props.handleConfirm(true)} className='w-40  text-xl py-2 rounded bg-green-500 hover:bg-green-600 active:bg-green-700'>Ya</button>
        </div>
    </div>
  )
}

export default Confirm