// Firebase initialization
// Replace with your own Firebase config
export async function initializeFirebase() {
  try {
    // Dynamically import Firebase modules
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js');
    const { getFirestore, doc, getDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js');

    const firebaseConfig = {
      apiKey: "AIzaSyAJ-V9ZcrG8lVk7g75MtLXV6ifqVrDxJf0",
      authDomain: "tanbuild-bb412.firebaseapp.com",
      projectId: "tanbuild-bb412",
      storageBucket: "tanbuild-bb412.firebasestorage.app",
      messagingSenderId: "1085698328238",
      appId: "1:1085698328238:web:503555ce4debd3412ecf3f"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return {
      ready: true,
      db,
      getFirestoreDoc: getDoc,
      setFirestoreDoc: setDoc,
      doc,
    };
  } catch (e) {
    console.error('Firebase failed to initialize — app will use local storage only', e);
    return {
      ready: false,
      db: null,
    };
  }
}
