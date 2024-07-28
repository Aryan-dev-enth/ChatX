import { Alert } from "@/components/Alert";
import SearchUsers from "@/components/miscellaneous/SearchUsers";
import React from "react";

const SidePanel = ({ isSidePanelOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-background  shadow-lg z-40 transform border-r transition-transform duration-300 ease-in-out ${
        isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="p-4 font-bold">Search for users</h2>
      <SearchUsers />
      <Alert />
    </div>
  );
};

export default SidePanel;
