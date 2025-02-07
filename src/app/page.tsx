"use client"
import { useEffect } from "react";
import Link from "next/link";

import axios from "axios";
import { Check, Pencil, Trash, User, UserPlus, X } from "lucide-react";
import { format, parseISO } from "date-fns";

import Sorting from "@/components/common/Sorting";
import CardInfo from "@/components/common/CardInfo";
import CurrenyFormat from "@/components/common/CurrenyFormat";
import Header from "@/components/common/Header";
import { DataKaryawan } from "@/types/dataKaryawan.type";
import useDataKaryawan from "@/zustand/useDataKaryawan";

const dataCard = [
  { id: 1, title: "Total Karyawan", value: 100, icon: User },
  { id: 2, title: "Sudah Absensi", value: 40, icon: Check },
  { id: 3, title: "Belum Absensi", value: 60, icon: X },
  { id: 4, title: "Karyawan bertambah", value: 10, icon: UserPlus },
];



export default function Home() {

    const { dataKaryawan, setDataKaryawan } = useDataKaryawan()

    const fetchDataKaryawan = async () => {
      const res = await axios.get('/api/karyawan')
      console.log(res.data)
      const formattedData = res.data.map((karyawan:DataKaryawan) => ({
        ...karyawan,
        tanggal_masuk : format(parseISO(karyawan.tanggal_masuk), 'dd-MM-yyyy')
      }))
      setDataKaryawan(formattedData)
    }
      
    useEffect(() => {
      fetchDataKaryawan()
     

    },[])

   

    const handleDelete = async (karyawan:DataKaryawan) => {
      setDataKaryawan(dataKaryawan.filter((item) => item._id !== karyawan._id))
      const res = await axios.delete(`/api/karyawan/${karyawan._id}/delete`)
      console.log(res)
    }

  return (
    <div className="flex-1">
      
      <Header title="Dashboard" />
      <div className="grid grid-cols-4 gap-4 p-4">
        {dataCard.map((card) => (
          <CardInfo
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>
      <div className=" m-4">
        <Sorting />
        <div className="relative overflow-x-auto ">
          {!!dataKaryawan.length 
          ?
           <table className="w-full text-sm  text-gray-400 text-center ">
            <thead className="text-xs  uppercase  bg-blue-500 text-gray-200 ">
              <tr >

                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Jabatan
                </th>
                <th scope="col" className="px-6 py-3">
                  Gaji
                </th>
                <th scope="col" className="px-6 py-3">
                  Kota Asal
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Masuk
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {dataKaryawan?.map((karyawan, index) => (
                <tr key={index} className="odd:bg-blue-800 even:bg-blue-900 text-blue-200">
                <th>
                  {index + 1}
                </th>
                <th>
                  {karyawan.nama}
                </th>
                <td className="px-6 py-4">{karyawan.jabatan}</td>
                <td className="px-6 py-4"><CurrenyFormat amount={karyawan.gaji ?? 0}/></td>
                <td className="px-6 py-4">{karyawan.kota_asal}</td>
                <td className="px-6 py-4">{karyawan.tanggal_masuk}</td>
                <td className="px-6 py-4">
                  <div
                    className="flex gap-4 mx-auto w-max  "
                  >
                    <Link href={`/karyawan/${karyawan._id}/edit`}><Pencil size={20}  className="cursor-pointer text-blue-400  hover:text-blue-600"/></Link>
                    <Trash onClick={() => handleDelete(karyawan)} size={20} className="cursor-pointer text-red-700 hover:text-red-900"/>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table> 
          :
          <div className="min-h-80 content-center">
            <h1 className="text-center font-bold text-2xl">Tidak ada karyawan</h1>  
          </div>}
        </div>
      </div>
    </div>
  );
}
