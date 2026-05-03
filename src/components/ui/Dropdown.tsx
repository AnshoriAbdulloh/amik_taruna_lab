import { useState } from "react";

export function Dropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [drop, setDrop] = useState(false);

  const placeholder = "Pilih tempat keluhan";

  const handleSelect = (val: string) => {
    onChange(val);
    setDrop(false);
  };

  return (
    <div
      className={`relative space-y-1  shadow-md hover:shadow-lg rounded-lg `}
    >
      <label
        onClick={() => setDrop(!drop)}
        className={`${value ? `border-green-400 text-black` : `border-gray-300 text-gray-500`} px-5 py-3 border block rounded-lg  cursor-pointer`}
      >
        {value || placeholder}
      </label>
      <ul
        className={`${drop ? `h-100` : `h-0   `} absolute z-50 bg-white text-[15px] rounded-lg shadow-md h-0 overflow-hidden 
            *:hover:bg-gray-100 space-y-1 *:px-5 *:py-3 *:rounded-lg *:cursor-pointer`}
      >
        <li onClick={() => handleSelect(`LAB KOMPUTER 1`)}>LAB KOMPUTER 1</li>
        <li onClick={() => handleSelect(`LAB KOMPUTER 2`)}>LAB KOMPUTER 2</li>
        <li onClick={() => handleSelect(`LAB KOMPUTER 3`)}>LAB KOMPUTER 3</li>
        <li onClick={() => handleSelect(`LAB TEKNIK`)}>LAB TEKNIK</li>
        <li onClick={() => handleSelect(`KELAS 1`)}>KELAS 1</li>
        <li onClick={() => handleSelect(`KELAS 2`)}>KELAS 2</li>
        <li onClick={() => handleSelect(`KELAS 3`)}>KELAS 3</li>
        <li onClick={() => handleSelect(`KELAS 4`)}>KELAS 4</li>
      </ul>
    </div>
  );
}
