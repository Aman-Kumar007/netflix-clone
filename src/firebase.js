
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAMcp1sLW7dGqWmD_xuCK-v81QBTYjzvtM",
  authDomain: "netflix-clone-5b74f.firebaseapp.com",
  projectId: "netflix-clone-5b74f",
  storageBucket: "netflix-clone-5b74f.firebasestorage.app",
  messagingSenderId: "779658971634",
  appId: "1:779658971634:web:d62e9bfd2174e5d856836b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);

const signup = async(name , email , password)=>{

    try {

      const res = await createUserWithEmailAndPassword(auth ,email ,password);
      const user = res.user;
      await addDoc (collection(db, "users"),{
        uid:user.uid,
        name,
        authProvider: "local",
        email ,
      });        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password)=>{

    try{
      
        await signInWithEmailAndPassword(auth ,email ,password);
    } catch (error){
  
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}


const logout= ()=>{
  signOut(auth);
}


export { auth, db, login , signup, logout};