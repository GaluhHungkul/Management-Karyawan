import { DataKaryawan } from "@/types/dataKaryawan.type";
import { create } from "zustand";

interface IuseDataKaryawan {
    dataKaryawan : DataKaryawan[];
    setDataKaryawan : (value:DataKaryawan[]) => void;
}

const useDataKaryawan = create<IuseDataKaryawan>((set) => ({
    dataKaryawan : [],
    setDataKaryawan : (value) => set({dataKaryawan : value})
}))

export default useDataKaryawan