export function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div
      className={`relative **:transition-all **:duration-300 **:ease-in-out`}
    >
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='text'
        placeholder=' '
        className={`peer border border-gray-300 focus:border-green-400 not-placeholder-shown:border-green-400 text-[15px] py-3 px-4 rounded-lg  outline-0 block w-full`}
      />
      <label
        htmlFor=''
        className={`absolute pointer-events-none bg-white text-gray-500 top-1/2 -translate-y-1/2 left-5 
        peer-focus:-translate-y-9.5 
      peer-focus:text-green-500 peer-focus:text-sm p-1 
        peer-not-placeholder-shown:-translate-y-9.5 
        peer-not-placeholder-shown:text-sm
      peer-not-placeholder-shown:text-green-500`}
      >
        Tulis keluhan
      </label>
    </div>
  );
}
