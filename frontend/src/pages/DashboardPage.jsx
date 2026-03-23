import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import FavouriteItem from "../components/FavouriteItem";

const ITEMS = [
  { id: "res-home", name: "Residential Villa", price: "2.5 cr" },
  { id: "comm-space", name: "Commercial Office Space", price: "1.2 cr" },
  { id: "apt-unit", name: "3BHK Apartment", price: "95 L" },
  { id: "raw-land", name: "Development Land (per aana)", price: "45 L" },
  { id: "ind-wh", name: "Industrial Warehouse", price: "4 cr" },
  { id: "retail-shop", name: "Retail Storefront", price: "60 L" },
];

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, favRes] = await Promise.all([
          API.get("/me"),
          API.get("/favourites"),
        ]);
        setUser(userRes.data);
        setFavourites(favRes.data);
      } catch (err) {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isFavourite = (itemId) =>
    favourites.some((f) => f.propertyId === itemId);

  const handleAdd = async (itemId) => {
    setAddingId(itemId);
    try {
      const res = await API.post("/favourites", { propertyId: itemId });
      setFavourites([res.data, ...favourites]);
      showMessage("Added to favourites!");
    } catch (err) {
      showMessage(err.response?.data?.message || "Failed to add", "error");
    } finally {
      setAddingId(null);
    }
  };

  const handleRemove = async (propId) => {
    try {
      await API.delete(`/favourites/${propId}`);
      setFavourites(favourites.filter((f) => f.propertyId !== propId));
      showMessage("Removed from favourites");
    } catch (err) {
      showMessage(err.response?.data?.message || "Failed to remove", "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {user && (
        <div className="user-info">
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <h2>Items to Buy</h2>

      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </p>
      )}

      <div className="items-grid">
        {ITEMS.map((item) => {
          const alreadyFav = isFavourite(item.id);
          return (
            <div key={item.id} className="item-card">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">Rs. {item.price}</span>
              </div>
              <button
                className={alreadyFav ? "fav-btn added" : "fav-btn"}
                disabled={alreadyFav || addingId === item.id}
                onClick={() => handleAdd(item.id)}
              >
                {addingId === item.id
                  ? "Adding..."
                  : alreadyFav
                    ? "Favourited"
                    : "Add to Favourite"}
              </button>
            </div>
          );
        })}
      </div>

      <h2>My Favourites</h2>

      {favourites.length === 0 ? (
        <p>No favourites yet. Add items above!</p>
      ) : (
        favourites.map((fav) => {
          const item = ITEMS.find((i) => i.id === fav.propertyId);
          return (
            <FavouriteItem
              key={fav._id}
              propertyId={fav.propertyId}
              label={item ? `${item.name} - Rs. ${item.price}` : fav.propertyId}
              onRemove={handleRemove}
            />
          );
        })
      )}
    </div>
  );
}

export default DashboardPage;
