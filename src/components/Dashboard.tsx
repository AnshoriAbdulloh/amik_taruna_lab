import Form from "./ui/Form";
// import { Input, Dropdown, UploadImage } from "./ui/Input";

export default function Dashboard() {
  return (
    <section className={`grid place-items-center w-full h-full`}>
      <div
        className={`max-w-150 w-[90%] rounded-xl flex flex-col m-5 p-5 border space-y-3`}
      >
        <h1 className={`text-3xl text-center`}>
          Apa keluhan anda <br /> hari ini?
        </h1>
        <Form />
      </div>
    </section>
  );
}
