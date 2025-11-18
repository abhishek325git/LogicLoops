import React, { useEffect, useState } from 'react';
import { userAPI } from '../../services/api';
import { User } from '../../types';

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Partial<User>>({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        setProfile(res.data);
      } catch (err) {
        alert('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await userAPI.updateProfile(profile);
      alert('Profile updated!');
      setEditing(false);
    } catch (err) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {editing ? (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={profile.name || ''}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Age"
            value={profile.age || ''}
            onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Contact"
            value={profile.contact || ''}
            onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={() => setEditing(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </form>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Age: {profile.age}</p>
          <p>Contact: {profile.contact}</p>
          <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;