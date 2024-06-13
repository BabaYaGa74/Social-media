import axios from "axios";

export const uploadImage = async(image) =>{
    const imgConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    if (image) {
      const data = new FormData();
      const filename = image.name;
      data.append("img", filename);
      console.log(data);
      data.append("file", image);

      console.log(data);
      try {
        const imgUpload = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "/",
          data,
          imgConfig
        );
        console.log(imgUpload.data.filePath);
        return imgUpload.data.filePath;
      } 
      catch (err)  {console.log(err)  }
      finally { console.log("Uploaded") }
    }
}