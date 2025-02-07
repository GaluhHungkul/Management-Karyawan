import ConnectToDatabase from "@/lib/mongoose";
import Karyawan from "@/models/Karyawan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params } : { params : { id : string } }) {

    try {
        
        await ConnectToDatabase()

        const { id } = params
        
        const currKaryawan = await Karyawan.findById(id)

        if(!currKaryawan) return NextResponse.json({message : 'Karyawan tidak ditemukan'}, { status : 404 })

        return NextResponse.json(currKaryawan)

    } catch (error) {
        console.log('error : ' , error)
    }


}