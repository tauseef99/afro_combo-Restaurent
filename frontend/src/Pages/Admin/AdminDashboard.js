import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
    category: "",
  });
  const [activeSection, setActiveSection] = useState("menu");
  const [orders, setOrders] = useState([]);


  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   if (!token) {

  //     navigate("/admin/login");

  //   }
  //   fetchMenuItems();
  // }, [navigate]);

  //updqted code

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  
    fetchMenuItems();
  
    if (activeSection === "orders") {
      fetchOrders(); 
    }
  }, [navigate, activeSection]); 
  
  
  // const fetchMenuItems = async () => {
  //   try {
  //     const res = await axios.get("https://afrocombo.com/admin/menu-items");
  //     setMenuItems(res.data);
  //   } catch (error) {
  //     console.error("Error fetching menu items:", error);
  //   }
  // };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("https://afrocombo.com/api/admin/menu-items");
      console.log("Fetched menu response:", res.data); // Debug line
      const items = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];
  
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuItems([]); 
    }
  };
  
  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://afrocombo.com/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`https://afrocombo.com/api/menu-item/${editItem._id}`, newItem);
      } else {
        await axios.post("https://afrocombo.com/api/add-menu-item", newItem);
      }
      fetchMenuItems();
      setShowModal(false);
      setEditItem(null);
      setNewItem({ title: "", description: "", price: "", img: "", category: "" });
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://afrocombo.com/api/menu-item/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("https://afrocombo.com/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewItem({ ...newItem, img: res.data.imageUrl });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f7fc", fontFamily: "'Arial', sans-serif" }}>
      <nav
  style={{
    backgroundColor: "#2c3e50",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
  }}
>
  <h2>Admin Panel</h2>
  <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
    <li
      style={{ cursor: "pointer" }}
      onClick={() => setActiveSection("menu")}
    >
      Menu
    </li>
    <li
      style={{ cursor: "pointer" }}
      onClick={() => setActiveSection("orders")}
    >
      Orders
    </li>
  </ul>
  <button
    onClick={() => {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }}
    style={{
      backgroundColor: "#d9534f",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</nav>


      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
  {/* Admin Image */}
  <div className="flex flex-col items-center">
    
    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard </h1>
    <p className="text-gray-600 text-center max-w-md">
      Manage your Menu Item efficiently.
    </p>

    {/* Add Menu Button */}
    <button
      onClick={() => setShowModal(true)}
      className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      + Add Menu Item
    </button>
  </div>

 {/* === MENU ITEMS TABLE === */}
{activeSection === "menu" && (
  <>
    <h3 className="mt-6 text-xl font-semibold text-gray-700">Menu Items</h3>
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Images</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-3 border">{item.title}</td>
              <td className="p-3 border">£{item.price}</td>
              <td className="p-3 border">{item.description}</td>
              <td className="p-3 border">{item.category}</td>
              <td className="p-3 border">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3 border text-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

{/* === ORDERS TABLE === */}
{activeSection === "orders" && (
  <div className="mt-10">
    <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Items</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="p-3 border">{order.name}</td>
              <td className="p-3 border">{order.email}</td>
              <td className="p-3 border">{order.phone}</td>
              <td className="p-3 border">£{order.total}</td>
              <td className="p-3 border">
                {order.cartItems.map((item) => (
                  <div key={item._id}>
                    {item.title} x {item.quantity}
                  </div>
                ))}
              </td>
              <td className="p-3 border">
                {new Date(order.orderDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

</div>



      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px" }}>
            <h2>{editItem ? "Edit" : "Add New"} Menu Item</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Title" value={newItem.title} onChange={handleChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="number" name="price" placeholder="Price" value={newItem.price} onChange={handleChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="text" name="category" placeholder="Category" value={newItem.category} onChange={handleChange} required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
              <input type="file" accept="image/*" onChange={handleImageUpload} required={!editItem} />
              <button type="submit" style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "10px", width: "100%", cursor: "pointer" }}>{editItem ? "Update" : "Add"} Item</button>
              <button onClick={() => setShowModal(false)} style={{ marginTop: "10px", backgroundColor: "#d9534f", color: "#fff", padding: "10px", width: "100%", cursor: "pointer" }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
