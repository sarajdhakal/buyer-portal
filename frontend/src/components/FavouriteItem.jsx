import { useState } from "react";

function FavouriteItem({ propertyId, label, onRemove }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(propertyId);
    setRemoving(false);
  };

  return (
    <div className="favourite-item">
      <span>{label || propertyId}</span>
      <button onClick={handleRemove} disabled={removing}>
        {removing ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}

export default FavouriteItem;
