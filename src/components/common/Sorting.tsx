"use client"

import useDataKaryawan from '@/zustand/useDataKaryawan'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

const sortingOption = [
 { value : 'namaAsc', title : 'Nama A - Z', orderBy : 'nama' },
 { value : 'namaDsc', title : 'Nama Z - A', orderBy : 'nama' },
 { value : 'gajiAsc', title : 'Gaji terendah', orderBy : 'gaji' },
 { value : 'gajiDsc', title : 'Gaji teringgi', orderBy : 'gaji' }
]

const Sorting = () => {

    const [loading, setLoading] = useState<boolean> (false) 

    const { dataKaryawan, setDataKaryawan } = useDataKaryawan()

    const [showSorting, setShowSorting] = useState<boolean>(false)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const search = form.elements.namedItem('search') as HTMLInputElement
        const res = await axios.get(`/api/karyawan?search=${search.value}`)
        setDataKaryawan(res.data)

    }


   
    const handleChangeSorting = (value:string) => {
      let sortedDataKaryawan;
      switch(value) {
        case 'namaAsc' :
           sortedDataKaryawan = dataKaryawan.sort((a,b) => a.nama.localeCompare(b.nama))
          setDataKaryawan(sortedDataKaryawan)
          break;
        case 'namaDsc' :
           sortedDataKaryawan = dataKaryawan.sort((a,b) => b.nama.localeCompare(a.nama))
          setDataKaryawan(sortedDataKaryawan)
          break;
        case 'gajiAsc' :
           sortedDataKaryawan = dataKaryawan.sort((a,b) => Number(a.gaji)   - Number(b.gaji ))
          setDataKaryawan(sortedDataKaryawan)
          break;
        case 'gajiDsc' :
           sortedDataKaryawan = dataKaryawan.sort((a,b) => Number(b.gaji)   - Number(a.gaji ))
          setDataKaryawan(sortedDataKaryawan)
          break;
        
      }
    }

  return (
    <div className='bg-blue-900 text-white py-6 rounded px-4 my-2 flex justify-between items-center'>
      <form onSubmit={handleSubmit} className='flex items-center gap-4'>
        <input name='search' type="text" placeholder='Cari Orang...' className='rounded text-black focus:border-none px-5 py-2  shadow-md shadow-blue-500 focus:shadow-sm focus:shadow-blue-500 focus:outline-none'/>
        <button
            disabled={loading}
            className="border  w-32 py-[5px] rounded  bg-white shadow-lg shadow-blue-500 hover:shadow-md hover:shadow-blue-500 active:shadow-sm active:shadow-blue-500  text-blue-500 font-bold text-xl disabled:shadow-sm disabled:shadow-blue-500 "
          >
            {loading ? 'Loading...' : 'Cari'}
          </button>
      </form>
      <div className='flex flex-col items-center relative '>
        <button onClick={() => setShowSorting(!showSorting)} className='w-40  relative bg-white py-2 rounded text-black px-3 hover:bg-gray-200 active:bg-gray-300'>
          Urut Berdasarkan
        </button>
          <AnimatePresence>
            {showSorting && 
            <motion.div
            initial={{
                width : 0,
                opacity : 0,
                y : -50
            }}
            animate={{
                width : 1,
                opacity : 1,
                y : 0
            }}
            exit={{
                width : 0,
                opacity : 0,
                y : -50
            }}
            className='flex flex-col absolute top-10 right-40 z-[100]'>
            {sortingOption.map((item,index)  => (
                <button onClick={() => handleChangeSorting(item.value)} className='w-40 bg-white rounded text-blue-500 py-1  mt-2 hover:bg-gray-200 active:bg-gray-300 ' key={index}>{item.title}</button>
            ))}
          </motion.div>}
          </AnimatePresence>
      </div>
    </div>
  )
}

export default Sorting