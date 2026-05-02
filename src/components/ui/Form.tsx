import { useState } from "react";
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

    let imageUrl = "";

    try {
      if (image) {
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
      }

      const payload = {
        keluhan,
        lokasi,
        imageUrl,
      };
      console.log("DATA TERKIRIM", payload);
      setKeluhan("");
      setLokasi("");
      setImage(null);
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
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Kirim
        </button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}{" "}
      </form>
    </>
  );
}
