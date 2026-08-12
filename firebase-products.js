import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

export async function addProduct(product) {
    await addDoc(collection(db, "products"), product);
}

export async function getProducts() {

    const snapshot =
        await getDocs(
            collection(db, "products")
        );


    let products = [];


    snapshot.forEach((item) => {

        products.push({

            ...item.data(),

            // Firebase Document ID
            id: item.id

        });

    });


    return products;

}

export async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
}

export async function updateProduct(id, product) {
    await updateDoc(doc(db, "products", id), product);
}
