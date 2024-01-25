
const Search = () => {
  return (
    <div className="mt-10 ml-10">
        <div className="flex flex-1 flex-col border-b-2 md:flex-row md:border-r-2 p-10">
            <form className="flex flex-col gap-3">
                <div className="flex space-x-3 items-center">
                    <label>Search Term:</label>
                    <input type="text" placeholder="Search.." id="seachTerm" className="p-2 rounded-lg"/>
                </div>

                <div className="flex space-x-3 items-center">
                    <label>Type:</label>
                    <div className="flex items-center space-x-1">
                     <input type="checkbox" id="all" className="w-4 h-4"/>
                     <label>Rent & Sale</label>
                    </div>

                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="rent" className="w-4 h-4"/>
                        <label>Rent</label>
                    </div>

                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="sale" className="w-4 h-4"/>
                        <label>Sale</label>
                    </div>

                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="offer" className="w-4 h-4"/>
                        <label>Offer</label>
                    </div>
                </div>

                <div className="flex space-x-3 items-center">
                    <label>Amenities:</label>
                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="parking" className="w-4 h-4"/>
                        <label>Parking</label>
                    </div>

                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="furnished" className="w-4 h-4"/>
                        <label>Furnished</label>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <label>Sort:</label>
                    <select name="" id="" className="p-2 rounded-lg">
                        <option value="">Latest</option>
                        <option value="">Oldest</option>

                    </select>
                </div>
                <button className="uppercase p-2 bg-slate-700 text-white rounded-lg">Search</button>
            </form>
        </div>
        <div></div>

    </div>
  )
}

export default Search