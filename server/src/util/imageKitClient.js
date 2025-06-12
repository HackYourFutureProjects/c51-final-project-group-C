import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

const imageKitClient = new ImageKit({
  publicKey: process.env.IMAGE_HOSTING_PUBLIC_KEY,
  privateKey: process.env.IMAGE_HOSTING_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_HOSTING_URL_ENDPOINT,
});

export default imageKitClient;
