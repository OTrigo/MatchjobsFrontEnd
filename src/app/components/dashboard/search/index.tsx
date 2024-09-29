import { MdSearch } from "react-icons/md";

const Search = ({ placeholder }: any) => {
  return (
    <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-md w-max">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-white outline-none
"
      />
    </div>
  );
};

export default Search;
