import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:3002/profile", {
                credentials: "include",
            });

            if (!response.ok) {
                window.location.href = "http://localhost:3000/signup";
                return;
            }

            const data = await response.json();

            setProfile(data);
            setFormData(data);
        } catch (error) {
            console.log(error);
            window.location.href = "http://localhost:3000/signup";
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = () => {
        setFormData(profile);
        setMessage("");
        setEditMode(true);
    };

    const handleCancel = () => {
        setFormData(profile);
        setMessage("");
        setEditMode(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3002/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    mobile: formData.mobile,
                    dateOfBirth: formData.dateOfBirth,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setMessage(errorMessage);
                return;
            }

            const updatedProfile = {
                ...profile,
                name: formData.name,
                mobile: formData.mobile,
                dateOfBirth: formData.dateOfBirth,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
            };

            setProfile(updatedProfile);
            setFormData(updatedProfile);
            setEditMode(false);
            setMessage("Profile updated successfully");
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    if (!profile) {
        return null;
    }

    const initials = profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="profile-page">
            <div className="profile-page-top">
                <Link to="/" className="profile-back-link">
                    ← Back to Dashboard
                </Link>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-large-avatar">{initials}</div>

                        <div className="profile-header-content">
                            <h1>My Profile</h1>
                            <p>Manage your account information</p>
                        </div>

                        {!editMode && (
                            <button
                                className="profile-edit-button"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message && (
                        <div className="profile-message">{message}</div>
                    )}

                    <div className="profile-section-title">
                        Personal Information
                    </div>

                    <div className="profile-info">
                        <div className="profile-info-item">
                            <span>Full Name</span>

                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <strong>{profile.name}</strong>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="profile-info-item">
                            <span>Mobile Number</span>

                            {editMode ? (
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile || ""}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                />
                            ) : (
                                <strong>{profile.mobile || "Not added"}</strong>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <span>Date of Birth</span>

                            {editMode ? (
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <strong>
                                    {profile.dateOfBirth || "Not added"}
                                </strong>
                            )}
                        </div>
                    </div>

                    <div className="profile-section-title">
                        Address Information
                    </div>

                    <div className="profile-info">
                        <div className="profile-info-item profile-full-width">
                            <span>Address</span>

                            {editMode ? (
                                <textarea
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    rows="3"
                                ></textarea>
                            ) : (
                                <strong>
                                    {profile.address || "Not added"}
                                </strong>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <span>City</span>

                            {editMode ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                            ) : (
                                <strong>{profile.city || "Not added"}</strong>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <span>State</span>

                            {editMode ? (
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state || ""}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                />
                            ) : (
                                <strong>{profile.state || "Not added"}</strong>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <span>Pincode</span>

                            {editMode ? (
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode || ""}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                />
                            ) : (
                                <strong>
                                    {profile.pincode || "Not added"}
                                </strong>
                            )}
                        </div>
                    </div>

                    <div className="profile-section-title">
                        Account Information
                    </div>

                    <div className="profile-info">
                        <div className="profile-info-item">
                            <span>Account Type</span>
                            <strong>{profile.accountType}</strong>
                        </div>

                        <div className="profile-info-item">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>
                    </div>

                    {editMode && (
                        <div className="profile-action-buttons">
                            <button
                                className="profile-cancel-button"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                Cancel
                            </button>

                            <button
                                className="profile-save-button"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                    <div className="profile-status-section">
                        <div>
                            <span className="profile-status-label">
                                Account Status
                            </span>

                            <p>Your account is currently active.</p>
                        </div>

                        <span className="profile-status">
                            <span className="profile-status-dot"></span>
                            {profile.accountStatus}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
