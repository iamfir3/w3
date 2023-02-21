// Convert file to base64
import { Buffer } from "buffer";
export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const bufferToBase64 = arrayBuffer => arrayBuffer ? new Buffer(arrayBuffer, 'base64').toString('binary') : ''

// convert number to price
export const convertPrice = (price) => {
    price = Number(price);
    price = price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return price;
}; 
