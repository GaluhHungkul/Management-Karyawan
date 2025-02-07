import mongoose from "mongoose";

const KaryawanSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    }, 
    jabatan : {
        type: String,
        enum : ["Karyawan", "Manager", "Direktur"],
        required: true
    },
    gaji : {
        type: Number,
        required: true
    },
    kota_asal : {
        type : String, 
        required : true
    },
    tanggal_masuk : {
        type : Date,
        required : true
    }
})

const Karyawan = mongoose.models.Karyawan || mongoose.model("Karyawan", KaryawanSchema)

export default Karyawan;