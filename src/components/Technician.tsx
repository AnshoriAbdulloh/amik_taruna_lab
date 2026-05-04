import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

type Laporan = {
  id: string;
  keluhan: string;
  lokasi: string;
  imageUrl: string;
  status: string;
};

export default function Technician() {
  const [data, setData] = useState<Laporan[]>([]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const ref = doc(db, "laporan", id);
      await updateDoc(ref, { status });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // versi singkat
    // const unsub = onSnapshot(collection(db, "laporan"), (snapshot) => {
    //   const result: Laporan[] = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...(doc.data() as Omit<Laporan, "id">),
    //     // Omit itu mengambil tipe, tapi menghapus beberapa property
    //   }));

    //   setData(result);
    // });

    // versi sederhana
    const unsub = onSnapshot(collection(db, "laporan"), (snapshot) => {
      const result: Laporan[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          keluhan: data.keluhan,
          lokasi: data.lokasi,
          imageUrl: data.imageUrl,
          status: data.status,
        };
      });
      setData(result);
    });

    return () => unsub();
  }, []);

  return (
    <section className='container xl:px-20 px-5  space-y-4 '>
      <h1 className='text-3xl text-center font-bold pt-5 pb-3'>
        Dashboard Teknisi
      </h1>
      <div className={`sm:grid sm:grid-cols-[1fr_auto]`}>
        <div className={`flex flex-col space-y-2`}>
          {/* #fff0d1 #f4f2ff */}
          {data.map((item, i) => (
            <div
              key={item.id}
              className={`${i % 2 ? `bg-[#fce6db]` : `bg-[#d7f4fa] `}  sm:py-5 sm:px-10 p-4 flex justify-between min-h-40 rounded-xl`}
            >
              <div className={`flex flex-col w-fit   `}>
                <ul className={` border-green-400 w-fit shrink-0`}>
                  <li>
                    <b>Status:</b> {item.status}
                  </li>
                  <li>
                    <b>Lokasi:</b> {item.lokasi}
                  </li>
                  <li>
                    <b>Keluhan:</b> {item.keluhan}
                  </li>
                </ul>
                <div className=' mt-auto space-x-2'>
                  <button
                    onClick={() => updateStatus(item.id, "diproses")}
                    className='bg-yellow-500  px-3 py-1 rounded'
                  >
                    Proses
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "selesai")}
                    className='bg-green-500  px-3 py-1 rounded'
                  >
                    Selesai
                  </button>
                </div>
              </div>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  className='sm:w-60 h-30 rounded border object-contain'
                />
              )}
            </div>
          ))}
        </div>
        <div className={`w-fit border hidden`}>dsdf</div>
      </div>
    </section>
  );
}
