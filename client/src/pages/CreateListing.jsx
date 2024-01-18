
const CreateListing = () => {
  return (
    <div>
        <h1 className="text-center text-4xl font-semibold mt-10 mb-6">Create a Listing</h1>
         <form  className="flex gap-3 p-3 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 ">
                <input type="text" id="name" placeholder="Name" className="p-2 rounded-lg" required/>
                <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" className="p-2 rounded-lg" required/>
                <input type="text" id="address"  placeholder="Address" className="p-2 rounded-lg" required/>
                <div className="flex flex-wrap space-x-3">
                    <div className="flex space-x-2">
                        <input type="checkbox" id="sale" checked className="w-4"/>
                        <span>Sale</span>
                    </div>
                    <div className="flex space-x-2">
                        <input type="checkbox" id="rent" className="w-4"/>
                        <span>Rent</span>
                    </div>
                    <div className="flex space-x-2">
                        <input type="checkbox" id="parking" className="w-4"/>
                        <span>Parking spot</span>
                    </div>
                    <div className="flex space-x-2">
                        <input type="checkbox" id="furnished" className="w-4"/>
                        <span>Furnished</span>
                    </div>
                    <div className="flex space-x-2">
                        <input type="checkbox" id="offer" className="w-4"/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex space-x-2 items-center">
                        <input type="number" id="beds" className="w-[70px] p-3 border border-gray-300 rounded-lg" maxLength={"10"} minLength={"1"} required defaultValue={1}/>
                        <span>Beds</span>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <input type="number" id="bath" className="w-[70px] p-3 border border-gray-300 rounded-lg" maxLength={"10"} minLength={"1"} defaultValue={1} required/>
                        <span>Baths</span>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <input type="number" className="w-[120px] p-3 border border-gray-300 rounded-lg" id="regularPrice" minLength="10"  maxLength="1000000000" defaultValue={10}/>
                        <div className="flex flex-col space-x-1 items-center">
                            <span>Regular price</span>
                            <small className="text-xs">($/Month)</small>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <input type="number" className="w-[120px] p-3 border border-gray-300 rounded-lg" id="dicountPrice" minLength="1" max="1000" required defaultValue={1}/>
                        <div className="flex flex-col space-x-1 items-center">
                            <span>Discounted price</span>
                            <small className="text-xs">($/Month)</small>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex flex-col flex-1 gap-4">
               <div className="flex items-center">
                <h2 className="font-bold text-[18px]">Images:</h2>
                <p className="text-gray-500 ml-1">The first image will be the cover (max6)</p>
               </div>
               <div className="flex space-x-3">
                <div className="p-2 border border-gray-400 rounded-lg">
                    <input type="file" id="images" accept="image/*" multiple/>
                </div>
                    <button className="uppercase p-4 border border-green-500 text-green-500 rounded-lg hover:bg-green-700 hover:text-white">Upload</button>
               </div>
               <button className="p-2 bg-slate-700 text-white uppercase rounded-lg hover:opacity-70 disabled:opacity-70">Create Listing</button>
            </div>
         </form>

    </div>
  )
}

export default CreateListing