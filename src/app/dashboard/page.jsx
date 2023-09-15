"use client";

import { useGlobal } from "../context/GlobalContext";

function Dashboard() {

  const { user } = useGlobal()

  return (
    <div className="flex">
      {JSON.stringify(user)}
    </div>
  );
}

export default Dashboard;
