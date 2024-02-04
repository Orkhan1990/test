import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm:"",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "create_at",
    order: "desc",
  });
  const[listings,setListings]=useState([]);
  const[loading,setLoading]=useState(false);
  const[showMore,setShowMore]=useState(false);
 const navigate=useNavigate();
  const handleChange=(e)=>{
    if(e.target.id==="all"||e.target.id==="rent"||e.target.id==="sale"){
         setSidebarData({...sidebarData,type:e.target.id})
    }

    if(e.target.id==="parking"||e.target.id==="offer"||e.target.id==="furnished"){
      setSidebarData({...sidebarData,[e.target.id]:e.target.checked})
    }

    if(e.target.id==="searchTerm"){
      setSidebarData({...sidebarData,searchTerm:e.target.value})
    }

    if(e.target.id==="sort_order"){
      const sort=e.targte.value.split('_')[0]||"createdAt";
      const order=e.target.value.split("_")[1]||"desc";
      setSidebarData({...sidebarData,sort,order})
    }
  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromURL=urlParams.get("searchTerm");
    const typeFromURL=urlParams.get("type");
    const offerFromURL=urlParams.get("offer");
    const parkingFromURL=urlParams.get("parking");
    const furnishedFromURL=urlParams.get("furnished");
     const sortFromURL=urlParams.get("sort");
     const orderFromURL=urlParams.get("order");

     if(searchTermFromURL||typeFromURL||offerFromURL||parkingFromURL||furnishedFromURL||sortFromURL||orderFromURL){
           setSidebarData({
            searchTerm:searchTermFromURL||"",
            type:typeFromURL||"all",
            offer:offerFromURL==="true"?true:false,
            furnished:furnishedFromURL==="true"?true:false,
            parking:parkingFromURL==="true"?true:false,
            sort:sortFromURL||"create_at",
            order:orderFromURL||"desc"
           })
     }
          
     const fetchsearchData=async()=>{
           setLoading(true)
           setShowMore(false);
           const searchURLParams=urlParams.toString();
           const result=await fetch(`http://localhost:3007/api/v1/listing/get?${searchURLParams}`);
           const data=await result.json();
           if(data.length>8){
            setShowMore(true);
           }else{
            setShowMore(false)
           }
           setListings(data);
           setLoading(false);
     }

     fetchsearchData();
  },
    [location.search])
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams();
    urlParams.set("searchTerm",sidebarData.searchTerm);
    urlParams.set("type",sidebarData.type);
    urlParams.set("offer",sidebarData.offer);
    urlParams.set("parking",sidebarData.parking);
    urlParams.set("furnished",sidebarData.furnished);
    urlParams.set("sort",sidebarData.sort);
    urlParams.set("order",sidebarData.order);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  console.log(listings);
  const handleShowMore=async()=>{
    const startIndex=listings.length;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set("startIndex",startIndex);
    const searchQuery=urlParams.toString();
    const result=await fetch(`http://localhost:3007/api/v1/listing/get?${searchQuery}`);
    const data=await result.json();
    if(data.length<9){
         setShowMore(false);
    }
    setListings([...listings,...data])
    

  }
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-10 border-b-2 md:flex-row border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onClick={handleSubmit}>
          <div className="flex space-x-3 items-center">
            <label>Search Term:</label>
            <input
              type="text"
              placeholder="Search.."
              id="seachTerm"
              className="p-2 rounded-lg"
              onChange={handleChange}
              value={sidebarData.searchTerm}
            />
          </div>

          <div className="flex space-x-3 items-center">
            <label>Type:</label>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="all" className="w-4 h-4" onChange={handleChange} checked={sidebarData.type==="all"}/>
              <label>Rent & Sale</label>
            </div>

            <div className="flex items-center space-x-1">
              <input type="checkbox" id="rent" className="w-4 h-4" onChange={handleChange} checked={sidebarData.type==="rent"}/>
              <label>Rent</label>
            </div>

            <div className="flex items-center space-x-1">
              <input type="checkbox" id="sale" className="w-4 h-4" onChange={handleChange} checked={sidebarData.type==="sale"}/>
              <label>Sale</label>
            </div>

            <div className="flex items-center space-x-1">
              <input type="checkbox" id="offer" className="w-4 h-4" onChange={handleChange} checked={sidebarData.offer}/>
              <label>Offer</label>
            </div>
          </div>

          <div className="flex space-x-3 items-center">
            <label>Amenities:</label>
            <div className="flex items-center space-x-1">
              <input type="checkbox" id="parking" className="w-4 h-4" onChange={handleChange} checked={sidebarData.parking} />
              <label>Parking</label>
            </div>

            <div className="flex items-center space-x-1">
              <input type="checkbox" id="furnished" className="w-4 h-4" onChange={handleChange} checked={sidebarData.furnished}/>
              <label>Furnished</label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label>Sort:</label>
            <select id="sort_order" className="p-3 border rounded-lg" onChange={handleChange} defaultValue={'create_at_desc'}>
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="uppercase p-2 bg-slate-700 text-white rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className="p-10 flex-1">
        <p className="text-xl font-semibold">Listing results:</p>
        <div className="flex  gap-4 ">
           {!loading&&listings.length===0&&(<p>No Listing Found!</p>)}
           {loading&&!listings&&(<p>Loading....</p>)}
           {!loading&&listings&&listings.map((listing)=>(
            <ListingItem key={listing._id} listing={listing}/>
           ))}
        </div>
          {
            showMore&&listings&&(<button onClick={handleShowMore} className="text-green-700 p-7 text-center w-full hover:underline">Show more</button>)
          }
      </div>
    </div>
  );
};

export default Search;
