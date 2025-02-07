import ConnectToDatabase from "@/lib/mongoose"
import Karyawan from "@/models/Karyawan"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req:NextRequest, { params } : { params : { id : string } }) {

    try {
        
        await ConnectToDatabase()

        const { id } = params

        const { formData } = await req.json()

        const editedKaryawan = await Karyawan.findByIdAndUpdate(id, formData, {
            new : true
        })

        if(!editedKaryawan) return NextResponse.json({message : 'Karyawan tidak ditemukan'}, { status : 404 })

        return NextResponse.json({message : 'Data karyawan berhasil dirubah 😁😊'})


    } catch (error) {
        console.log('error : ', error)
    }

}
