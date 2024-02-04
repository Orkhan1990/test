import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md'

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md w-full sm:w-[330px] hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="picture"
          className="h-[320px] sm:h-[220px] object-cover w-full hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
             <div className="flex items-center gap-1">
                <MdLocationOn className="h-4 w-4 text-green-700"/>
                <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
             </div>
             <p className="text-sm text-gray-600 line-clamp-2 truncate">{listing.descripton}</p>
             <p className=" text-slate-500 mt-2 font-semibold">${" "} {listing.offer?listing.discountPrice.toLocateString("en-US"):listing.regularPrice.toLocaleString("en-US")}
             {listing.type==="rent"&& " / month"}
             </p>
             <div className="flex items-center gap-4 text-slate-700">
                <div className="text-xs font-bold">
                    {listing.bedrooms>1?(`${listing.bedrooms} beds`):(`${listing.bedrooms} bed`)}
                </div>
                <div>
                    {listing.bathrooms>1?(`${listing.bathrooms} baths`):(`${listing.bathrooms} bath`)}
                </div>
             </div>
            
        </div>
      </Link>
    </div>
  );
};


ListingItem.propTypes = {
  listing: PropTypes.object,
};
export default ListingItem;
