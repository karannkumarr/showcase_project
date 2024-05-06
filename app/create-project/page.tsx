"use client"
import { useState } from "react";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthorize = () => {
    setIsLoading(true);
    // Simulate authorization process
    setTimeout(() => {
      if (password === "fa4smyzz65") {
        setIsModalOpen(false);
      } else {
        alert("Authorization failed. Please try again.");
      }
      setIsLoading(false);
    }, 1500); // Simulate loading time
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-900">Authorize Yourself</h3>
          <div className="mb-6">
            <input
              type="password"
              className="w-full px-4 py-3 bg-[#103146] border border-gray-200 rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter the secret code..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-sm text-gray-500">Hint: We use Api's to upload things that's why we need it to be protected.</p>
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 py-3 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleAuthorize}
              disabled={isLoading}
            >
              {isLoading ? "Authorizing..." : "Authorize"}
            </button>
          </div>
        </Modal>
      )}

      {!isModalOpen && (
        <Modal>
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-900">Create a New Project</h3>
          <ProjectForm type="create" session={{ user: { id: "" } }} />
        </Modal>
      )}
    </>
  );
};

export default CreateProject;
