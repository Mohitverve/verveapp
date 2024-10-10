import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../components/firebase';

const useFirestoreCollection = (collectionName, queryCondition) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), queryCondition);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [collectionName, queryCondition]);

  return { data, loading, error };
};

export default useFirestoreCollection;
