import { Sidebar } from "../../Components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <div className="w-full">home page</div>
    </div>
  );
}
