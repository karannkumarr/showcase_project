import { useState } from "react";

interface ShareWorkModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ShareWorkModal: React.FC<ShareWorkModalProps> = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Perform validation
    if (password === "your_hardcoded_password") {
      onConfirm();
    } else {
      // Handle incorrect password
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ShareWorkModal;
