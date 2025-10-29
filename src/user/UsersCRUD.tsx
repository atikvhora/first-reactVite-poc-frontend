import React, { useState, useEffect } from "react";
import type { User } from "./UserModal";
import '../App.css'

const initialUsers: User[] = [];

export const UserCrud: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ Name: "", Email: "", Age: 0 });

  useEffect(() => {
    // Load initial users (could be replaced with API call)
    setUsers(initialUsers);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleAddUser = () => {
    const newUser: User = {
      Id: users.length ? Math.max(...users.map(u => u.Id)) + 1 : 1,
      Name: formData.Name,
      Email: formData.Email,
      Age: formData.Age
    };
    setUsers([...users, newUser]);
    setFormData({ Name: "", Email: "", Age: 0 });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ Name: user.Name, Email: user.Email, Age: user.Age });
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    const updated = users.map(u => u.Id === editingUser.Id ? { ...u, ...formData } : u);
    setUsers(updated);
    setEditingUser(null);
    setFormData({ Name: "", Email: "", Age: 0 });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.Id !== id));
  };

  return (
    <div className="card">
      <h2>Users</h2>
      <input
        value={formData.Name}
        name="Name"
       type="text" onChange={handleInputChange} placeholder="patientName" className="input input-md" />
      <input 
        value={formData.Email}
        name="Email"
       type="text" onChange={handleInputChange} placeholder="Email" className="input input-md" />
      {editingUser ? (
        <button onClick={handleUpdateUser}>Update User</button>
      ) : (
        <button onClick={handleAddUser}>Add User</button>
      )}

      <ul>
        {users.map(user => (
          <li key={user.Id}>
            <strong>{user.Name}</strong> ({user.Email})
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
