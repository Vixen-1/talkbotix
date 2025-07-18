import { getApps, initializeApp, cert } from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const initFirebaseAdmin = () => {
    console.log("project id: ", process.env.FIREBASE_PROJECT_ID)
    console.log("client email: ", process.env.FIREBASE_CLIENT_EMAIL)
    console.log("private key: ", process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"))
    const apps = getApps();
    if(!apps.length){
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
            })
        });
    }
    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

export const {auth, db} = initFirebaseAdmin();