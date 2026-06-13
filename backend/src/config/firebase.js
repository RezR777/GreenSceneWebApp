import admin from "firebase-admin";

let firebaseApp = null;

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {

            firebaseApp = admin.initializeApp({
                credential:
                    admin.credential.cert(serviceAccount),
            });

            console.log(
                "Firebase is initialized"
            );
        }

        return firebaseApp;

    } catch (error) {

        console.error(
            "Firebase initialization error occured:",
            error.message
        );

        return null;
    }
};

export default initializeFirebase;
