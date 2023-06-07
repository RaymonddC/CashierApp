import { FilterProduct } from '../../Components/FilterProduct/FilterProduct';
import { Sidebar } from '../../Components/Sidebar/Sidebar';

export default function Home() {
  return (
    <div className="flex bg-[#f0f0f0]">
      <Sidebar />
      <FilterProduct />
      <div className="w-full">home page</div>
    </div>
  );
}
