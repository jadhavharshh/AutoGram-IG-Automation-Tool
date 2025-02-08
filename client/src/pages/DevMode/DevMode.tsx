import { useEffect } from 'react';
import useStore from '@/store/store';

const CheckIgAccounts = () => {
  const igAccounts = useStore((state) => state.igAccounts);
  useEffect(() => {
    console.log("DevMode component mounted");
    if (igAccounts.length > 0) {
      console.log("CheckIgAccounts: Data is present in the store:", igAccounts);
    } else {
      console.log("CheckIgAccounts: No data found in the store.");
    }
  }, [igAccounts]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1>Check Instagram Accounts</h1>
      {igAccounts.length > 0 ? (
        <ul>
          {igAccounts.map((account) => (
            <li key={account._id}>{account.igUsername}</li>
          ))}
        </ul>
      ) : (
        <p>No Instagram accounts found.</p>
      )}
    </div>
  );
};

export default CheckIgAccounts;