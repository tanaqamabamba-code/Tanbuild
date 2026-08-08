const LOCAL_KEY = 'tanbuild-state-v1';

let firebaseContext = null;

export function setFirebaseContext(ctx) {
  firebaseContext = ctx;
}

export function waitForFirebase(timeoutMs) {
  return new Promise((resolve) => {
    if (firebaseContext) {
      resolve();
      return;
    }
    setTimeout(() => resolve(), timeoutMs);
  });
}

export async function loadState() {
  await waitForFirebase(4000);

  // Prefer Firebase when available
  if (firebaseContext && firebaseContext.ready) {
    try {
      const ref = firebaseContext.doc(firebaseContext.db, 'tanbuild', 'state');
      const snap = await firebaseContext.getFirestoreDoc(ref);
      if (snap.exists() && snap.data().stateJson) {
        return JSON.parse(snap.data().stateJson);
      }
    } catch (e) {
      console.error('Firebase load failed, falling back to localStorage', e);
    }
  }

  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* no data yet */
  }
  return null;
}

export async function saveState(state) {
  let savedRemotely = false;
  let savedLocally = false;

  if (firebaseContext && firebaseContext.ready) {
    try {
      const ref = firebaseContext.doc(firebaseContext.db, 'tanbuild', 'state');
      await firebaseContext.setFirestoreDoc(ref, {
        stateJson: JSON.stringify(state),
        updatedAt: new Date().toISOString(),
      });
      savedRemotely = true;
    } catch (e) {
      console.error('Firebase save failed, falling back to localStorage', e);
    }
  }

  // Always save to localStorage as backup
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    savedLocally = true;
  } catch (e) {
    console.error('localStorage save failed', e);
  }

  return savedRemotely || savedLocally;
}
