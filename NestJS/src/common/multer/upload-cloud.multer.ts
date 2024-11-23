import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({ 
   cloud_name: 'vulebaolong', 
   api_key: '375481467533217', 
   api_secret: 'IdhzUoK7jRyQceWSIdUI2x86g24' // Click 'View API Keys' above to copy your API secret
});


const storageCloud = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
     folder: 'images',
   } as any,
 });


export default storageCloud;
