import axios from "axios";
//this is the root URL
const API_URL = "https://project-glovo-api.onrender.com/news/"; //note that the news URL

//Get all posts
export const getAllPosts = async () => {
  const res = await axios.get(API_URL);
  if (res.status !== 200) {
    return console.log("Some Error Occurred");
  }

  const data = res.data;
  console.log(data);
  return data;
};
