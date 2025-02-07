"use client";

import Header from "@/components/common/Header";
import Confirm from "@/components/common/Confirm";
import { DataKaryawan } from "@/types/dataKaryawan.type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TambahKaryawanPage = () => {
  const { push } = useRouter();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState<DataKaryawan>({
    nama: "",
    jabatan: "",
    gaji: null,
    kota_asal: "",
    tanggal_masuk: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gaji" ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("/api/tambahkaryawan", {
        formData,
      });
      console.log(res.data);
      setFormData({
        nama: "",
        jabatan: "",
        gaji: null,
        kota_asal: "",
        tanggal_masuk: "",
      });
      setLoading(false);
      setShowConfirm(true);
    } catch (error) {
      setFormData({
        nama: "",
        jabatan: "",
        gaji: null,
        kota_asal: "",
        tanggal_masuk: "",
      });
      setLoading(false);
      console.log("error : ", error);
    }
  };

  const handleConfirm = (value: boolean) => {
    setShowConfirm(false);
    if (value) push("/");
  };

  return (
    <div className={`flex-1 relative ${showConfirm && "gray"}`}>
      <Header title="Tambah Karyawan" />
      <div className="w-4/5 mx-auto  mt-10  min-h-96 ">
        <p className="font-bold text-center my-5 text-2xl text-blue-500">
          Tambahkan Karyawan
        </p>
        <form
          onSubmit={handleSubmit}
          className="min-h-full relative gap-4 m-5 grid grid-cols-1 lg:grid-cols-2"
        >
          <input
            onChange={handleChange}
            value={formData.nama}
            name="nama"
            required
            className="rounded  focus:border-none px-5 py-4 text-xl shadow-md shadow-blue-500 focus:shadow-sm focus:shadow-blue-500 focus:outline-none "
            type="text"
            placeholder="Nama karyawan"
          />
          <select
            onChange={handleChange}
            value={formData.jabatan}
            required
            name="jabatan"
            className="rounded focus:border-none px-5 py-4 text-xl shadow-md shadow-blue-500 focus:shadow-sm focus:shadow-blue-500 focus:outline-none "
          >
            <option disabled value="" className="text-gray-400">
              Jabatan
            </option>
            <option value="Karyawan">Karyawan</option>
            <option value="Manager">Manager</option>
            <option value="Direktur">Direktur</option>
          </select>
          <input
            onChange={handleChange}
            value={formData.gaji ?? ""}
            name="gaji"
            required
            className="rounded  focus:border-none px-5 py-4 text-xl shadow-md shadow-blue-500 focus:shadow-sm focus:shadow-blue-500 focus:outline-none "
            type="number"
            placeholder="Gaji"
          />
          <input
            onChange={handleChange}
            value={formData.kota_asal}
            name="kota_asal"
            required
            className="rounded  focus:border-none px-5 py-4 text-xl shadow-md shadow-blue-500 focus:shadow-sm focus:shadow-blue-500 focus:outline-none "
            type="text"
            placeholder="Kota asal"
          />
          <button
            disabled={loading}
            className="border py-4 w-1/2 absolute right-0 -bottom-20 bg-white shadow-lg shadow-blue-500 hover:shadow-md hover:shadow-blue-500 active:shadow-sm active:shadow-blue-500  text-blue-500 font-bold text-xl disabled:shadow-sm disabled:shadow-blue-500 "
          >
            {loading ? "Loading..." : "TAMBAH!"}
          </button>
        </form>
      </div>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed top-1/4 z-[100] left-1/3 "
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
          >
            <Confirm handleConfirm={handleConfirm} title="Data berhasil disimpan 😊 ! "/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TambahKaryawanPage;
