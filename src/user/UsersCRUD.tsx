import React, { useState, useEffect, use } from "react";
import type { User } from "./UserModal";

const initialUsers: User[] = [];

export const UserCrud: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", Age: 0 });

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
      Name: formData.name,
      Email: formData.email,
      Age: formData.Age
    };
    setUsers([...users, newUser]);
    setFormData({ name: "", email: "", Age: 0 });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.Name, email: user.Email, Age: user.Age });
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    const updated = users.map(u => u.Id === editingUser.Id ? { ...u, ...formData } : u);
    setUsers(updated);
    setEditingUser(null);
    setFormData({ name: "", email: "", Age: 0 });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.Id !== id));
  };

  return (
    <div>
      <h2>User CRUD</h2>
      <input 
        name="name" 
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input 
        name="email" 
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
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
