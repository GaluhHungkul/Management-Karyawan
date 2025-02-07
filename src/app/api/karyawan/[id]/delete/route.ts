import ConnectToDatabase from "@/lib/mongoose";
import Karyawan from "@/models/Karyawan";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, { params }: { params: { id: string } }) {
    try {
        
        await ConnectToDatabase()

        const { id } = params

        const currKaryawan = await Karyawan.findByIdAndDelete(id)

        if(!currKaryawan) return NextResponse.json({ message : 'Karyawan tidak ditemukan' }, { status : 404 })

        return NextResponse.json({ message : 'Karyawan berhasil dihapus' }, { status : 200 })

    } catch (error) {
        console.log('error : ' , error)
    }
}