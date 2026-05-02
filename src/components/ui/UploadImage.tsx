import { useState } from "react";

export function UploadImage({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // kenapa disini pakai ? karena jika files tidak ada maka jangan error dan jika ada maka ambil index ke 0
    if (!file) return;

    // Validasi tipe
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      // apakah dalam array tsb tidak ada file.type, karena pakai not!
      setError(`Hanya boleh JPG, PNG atau WEPG`);
      onChange(null);
      return;
    }

    // Validasi ukuran  (max 2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Ukuran maksimal 2MB");
      onChange(null);
      return;
    }

    // Lolos validasi
    setError(``);
    onChange(file); // kirim ke parent
  };

  // const handleUpload = async () => {
  //   if (!image) return;

  //   const formData = new FormData(); // FormData ini adalah Web API bawaan browser, hampir sama dengan JSON, pakai ini karena file tidak bisa dikirim langsung dengan JSON
  //   formData.append("file", image);
  //   formData.append("upload_preset", "testing");

  //   try {
  //     const res = await fetch(
  //       "https://api.cloudinary.com/v1_1/dkzvwbvcb/image/upload",
  //       {
  //         method: "POST",
  //         body: formData,
  //       },
  //     );
  //     // kenapa diatas tidak set header, karena pakai formData otomatis disetingkan browser, nah jika menggunakan JSON maka perlu seting Content-Type: aplication/json

  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.error?.message || "Upload gagal");
  //     }

  //     console.log("URL gambar:", data.secure_url);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("Upload gagal");
  //     }
  //   }
  // };

  return (
    <>
      <div
        className={`${error ? `border-red-400` : value ? `border-green-400` : `border-gray-300`} 
        relative h-48 rounded-lg border bg-white flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
      >
        <div className='absolute flex flex-col items-center'>
          <img
            alt='File Icon'
            className='mb-3'
            src='https://img.icons8.com/dusk/64/000000/file.png'
          />
          <span className='block text-gray-500 font-semibold'>
            Drag & drop your files here
          </span>
          <span className='block text-gray-400 font-normal mt-1'>
            or click to upload
          </span>
        </div>
        <input
          className='h-full w-full opacity-0 file:hidden cursor-pointer'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>

      {error && <p className={`text-red-500 text-sm`}>{error}</p>}

      {value && (
        <img
          src={URL.createObjectURL(value)}
          alt='preview'
          className={`w-100 h-52 object-contain rounded-lg mt-2  mx-auto`}
        />
      )}
    </>
  );
}
