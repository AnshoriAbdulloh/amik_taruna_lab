import { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Input } from "./Input";
import { Dropdown } from "./Dropdown";
import { UploadImage } from "./UploadImage";

export default function Form() {
  const [keluhan, setKeluhan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keluhan || !lokasi) {
      setError(`Semua field wajib diisi`);
      return;
    }
    if (!image) {
      setError(`Gambar wajib diupload`);
      return;
    }

    let imageUrl = "";

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Upload gagal");
      }

      imageUrl = data.secure_url;

      const payload = {
        keluhan,
        lokasi,
        imageUrl,
      };

      console.log(`kirim ke firebase`);

      await addDoc(collection(db, "laporan"), {
        keluhan,
        lokasi,
        imageUrl,
        status: "menunggu",
        createdAt: serverTimestamp(),
      });

      console.log("DATA TERKIRIM", payload);
      setKeluhan("");
      setLokasi("");
      setImage(null);
      setError(``);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`space-y-4`}>
        <Dropdown onChange={setLokasi} value={lokasi} />
        <Input onChange={setKeluhan} value={keluhan} />
        <UploadImage onChange={setImage} value={image} />
        <button
          type='submit'
          disabled={!keluhan || !lokasi || !image}
          className={`${!keluhan || !lokasi || !image ? `bg-gray-400 cursor-not-allowed` : `bg-green-500 hover:opacity-80 cursor-pointer `}  text-white py-2 px-8 rounded-lg `}
        >
          Kirim
        </button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}{" "}
      </form>
    </>
  );
}
