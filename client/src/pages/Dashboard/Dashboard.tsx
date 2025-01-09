import userAppStore from "@/store/store";

const Dashboard = () => {
  const { userInfo } = userAppStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-2xl font-bold">Dashboard</h1>
      {userInfo ? (
        <div className="mt-4 text-center">
          {/* <p><strong>Name:</strong> {userInfo.name}</p> */}
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>ID:</strong> {userInfo.id}</p>
        </div>
      ) : (
        <p className="mt-4 text-center">No user information available.</p>
      )}
    </div>
  )
}

export default Dashboard