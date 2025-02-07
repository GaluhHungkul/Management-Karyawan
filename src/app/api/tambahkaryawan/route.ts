import ConnectToDatabase from "@/lib/mongoose";
import Karyawan from "@/models/Karyawan";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    await ConnectToDatabase()

    const { formData } = await req.json()

    const karyawanBaru = new Karyawan({
        ...formData,
        tanggal_masuk : new Date()
    })

    await karyawanBaru.save()

    return NextResponse.json({
        karyawanBaru
    })

}