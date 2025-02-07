import ConnectToDatabase from "@/lib/mongoose";
import Karyawan from "@/models/Karyawan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        
        await ConnectToDatabase()

        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search')

        if(!search) {
            const dataKaryawan = await Karyawan.find()
            return NextResponse.json(dataKaryawan)
        }
        if(search && typeof search !== 'string') return NextResponse.json({message : 'Invalid query data'})

        const filteredKaryawan = await Karyawan.find({ nama : { $regex : search, $options : 'i' } })
        return NextResponse.json(filteredKaryawan)
        


    } catch (error) {
        console.log('error : ' , error)
    }
}