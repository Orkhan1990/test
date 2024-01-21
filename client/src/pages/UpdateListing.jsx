import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { useEffect, useState } from "react";
  import { app } from "../firebase";
  import { useSelector } from "react-redux";
  import {useNavigate,useParams} from "react-router-dom";
  
  const UploadListing = () => {
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [upload, setUpload] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const navigate=useNavigate();
    const {id}=useParams();

    const [formData, setFormData] = useState({
      name: "",
      address: "",
      description: "",
      imagesUrl: [],
      type: "rent",
      parking: false,
      offer: false,
      bathrooms: 1,
      bedrooms: 1,
      regularPrice: 10,
      discountPrice: 1,
      furnished: false,
    });
  
    //IMAGES UPLOAD
    const handleImages = () => {
      if (files.length > 0 && files.length + formData.imagesUrl.length < 7) {
        setUpload(true);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storageImage(files[i]));
        }
  
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imagesUrl: formData.imagesUrl.concat(urls),
            });
            setUpload(false);
          })
          .catch((err) => {
            setImageUploadError("Image upload failed (2 mb max per image)");
            console.log(err);
            setUpload(false);
          });
      } else {
        setImageUploadError("You can not upload more than 6 images!");
        setUpload(false);
      }
    };
  
    const storageImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              resolve(downloadUrl);
            });
          }
        );
      });
    };
  
    //GET FORM DATA
  
    const handleChange = (e) => {
      if (e.target.id === "rent" || e.target.id === "sale") {
        setFormData({ ...formData, type: e.target.id });
      }
  
      if (
        e.target.id === "parking" ||
        e.target.id === "furnished" ||
        e.target.id === "offer"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === "text" ||
        e.target.type === "number" ||
        e.target.type === "textarea"
      ) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      }
    };
  
    //IMAGE DELETE
  
    const imageDelete = (index) => {
      setFormData({
        ...formData,
        imagesUrl: formData.imagesUrl.filter((_, i) => i !== index),
      });
    };
  
    //CREATE LISTING
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (formData.imagesUrl.length < 1) {
        setError("You must upload at least one image");
        return
      }
  
      if(formData.regularPrice<formData.discountPrice){
        return setError("Discount price must be lower than regular price")
      }
      try {
        const result = await fetch(
          `http://localhost:3007/api/v1/listing/updateListing/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, userRef: currentUser._id }),
          }
        );
        const data = await result.json();
        console.log(data);
        setLoading(false);
        navigate(`/listing/${data._id}`)
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };


    //FETCH LISTING
    useEffect(()=>{
        const fetchListing=async()=>{
             const result=await fetch(`http://localhost:3007/api/v1/listing/getListing/${id}`);
             const data=await result.json();
             if(data.success==false){
                console.log(data.message);
             }
             setFormData(data);
             
        }
        fetchListing();
    },[])

  
  
    console.log(formData);
    return (
      <div>
        <h1 className="text-center text-4xl font-semibold mt-10 mb-6">
          Update a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 p-3 max-w-4xl mx-auto"
        >
          <div className="flex flex-col gap-4 ">
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="p-2 rounded-lg"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
              className="p-2 rounded-lg"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="p-2 rounded-lg"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap space-x-3">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="sale"
                  checked={formData.type === "sale"}
                  className="w-4"
                  onChange={handleChange}
                />
                <span>Sale</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4"
                  checked={formData.type === "rent"}
                  onChange={handleChange}
                />
                <span>Rent</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
  
            <div className="flex flex-wrap gap-4">
              <div className="flex space-x-2 items-center">
                <input
                  type="number"
                  id="beds"
                  className="w-[70px] p-3 border border-gray-300 rounded-lg"
                  maxLength={"10"}
                  minLength={"1"}
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <span>Beds</span>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="number"
                  id="bath"
                  className="w-[70px] p-3 border border-gray-300 rounded-lg"
                  maxLength={"10"}
                  minLength={"1"}
                  onChange={handleChange}
                  value={formData.bathrooms}
                  required
                />
                <span>Baths</span>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="number"
                  className="w-[120px] p-3 border border-gray-300 rounded-lg"
                  id="regularPrice"
                  minLength="10"
                  maxLength="1000000000"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col space-x-1 items-center">
                  <span>Regular price</span>
                  <small className="text-xs">($/Month)</small>
                </div>
              </div>
  
              {formData.offer&&(
                    <div className="flex space-x-2 items-center">
                    <input
                      type="number"
                      className="w-[120px] p-3 border border-gray-300 rounded-lg"
                      id="dicountPrice"
                      minLength="1"
                      max="1000"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col space-x-1 items-center">
                      <span>Discounted price</span>
                      <small className="text-xs">($/Month)</small>
                    </div>
                  </div>
              )}
          
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex items-center">
              <h2 className="font-bold text-[18px]">Images:</h2>
              <p className="text-gray-500 ml-1">
                The first image will be the cover (max6)
              </p>
            </div>
            <form className="flex space-x-3">
              <div className="p-2 border border-gray-400 rounded-lg">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
              </div>
              <button
                disabled={upload}
                type="button"
                onClick={handleImages}
                className="uppercase p-4 border border-green-500 text-green-500 rounded-lg hover:bg-green-700 hover:text-white "
              >
                {upload ? "Uploading..." : "Upload"}
              </button>
            </form>
            {imageUploadError && (
              <p className="text-red-700 text-sm">{imageUploadError}</p>
            )}
            {formData.imagesUrl.length > 0 &&
              formData.imagesUrl.map((image, index) => (
                <div
                  key={image}
                  className="flex justify-between border border-gray-300 p-2 rounded-lg"
                >
                  <img
                    src={image}
                    alt="image"
                    className="w-[100px] h-10 object-cover rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => imageDelete(index)}
                    className=" text-red-700 rounded-lg  uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading||upload}
              className="p-2 bg-slate-700 text-white uppercase rounded-lg hover:opacity-70 disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Listing"}
            </button>
            <p className="text-red-700 text-xs">{error && error}</p>
          </div>
        </form>
      </div>
    );
  };
  
  export default UploadListing;
  