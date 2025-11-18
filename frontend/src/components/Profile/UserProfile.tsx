import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../services/api";
import { DoctorProfile, PatientProfileData, User } from "../../types";

const UserProfile: React.FC = () => {
  const [userMeta, setUserMeta] = useState<User | null>(null);
  const [profile, setProfile] = useState<DoctorProfile | PatientProfileData>(
    {}
  );
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        setUserMeta(res.data.user);
        setProfile(res.data.profile || {});
      } catch (err) {
        alert("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await userAPI.updateProfile(profile as Record<string, unknown>);
      alert("Profile updated!");
      setEditing(false);
    } catch (err) {
      alert("Error updating profile");
    }
  };

  const isDoctor = userMeta?.role === "doctor";

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          ← Back
        </button>
      </div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-4"
        >
          {isDoctor ? (
            <>
              <input
                type="text"
                placeholder="Specialty"
                value={(profile as DoctorProfile).specialty || ""}
                onChange={(e) =>
                  setProfile({ ...profile, specialty: e.target.value })
                }
                className="border p-2 w-full"
              />
              <input
                type="text"
                placeholder="Contact"
                value={(profile as DoctorProfile).contact || ""}
                onChange={(e) =>
                  setProfile({ ...profile, contact: e.target.value })
                }
                className="border p-2 w-full"
              />
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder="Age"
                value={(profile as PatientProfileData).age ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, age: Number(e.target.value) })
                }
                className="border p-2 w-full"
              />
              <input
                type="text"
                placeholder="Contact"
                value={(profile as PatientProfileData).contact || ""}
                onChange={(e) =>
                  setProfile({ ...profile, contact: e.target.value })
                }
                className="border p-2 w-full"
              />
              <textarea
                placeholder="Conditions (comma separated)"
                value={
                  (profile as PatientProfileData).conditions?.join(", ") || ""
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    conditions: e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean),
                  })
                }
                className="border p-2 w-full"
              />
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {userMeta?.name}</p>
          <p>Email: {userMeta?.email}</p>
          {isDoctor ? (
            <>
              <p>
                Specialty: {(profile as DoctorProfile).specialty || "Not set"}
              </p>
              <p>Contact: {(profile as DoctorProfile).contact || "Not set"}</p>
            </>
          ) : (
            <>
              <p>Age: {(profile as PatientProfileData).age ?? "N/A"}</p>
              <p>Contact: {(profile as PatientProfileData).contact || "N/A"}</p>
              <p>
                Conditions:{" "}
                {(profile as PatientProfileData).conditions?.join(", ") ||
                  "N/A"}
              </p>
            </>
          )}
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
