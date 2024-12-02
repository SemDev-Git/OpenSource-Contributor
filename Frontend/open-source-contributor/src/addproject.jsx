import './style.css';
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';

export default function AddProjectsScreen({ onNavigate, userData }) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    showNotifications={showNotifications}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <AddProjectFeed userData={userData} />
                <button className="git-button" onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
            </section>
        </>
    );
}

function AddProjectFeed({ userData }) {
    return (
        <>
            <section id="main-feed">
                <AddProjectsList userData={userData} />
            </section>
        </>
    );
}

function AddProjectsList({ userData }) {
    const [formData, setFormData] = useState({
        title: '',
        gitlink: '',
        description: '',
        guidelines: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            title: formData.title,
            description: formData.description,
            guidelines: formData.guidelines,
            gitlink: formData.gitlink,
        };
        console.log('Submitting project data:', projectData);
    
        try {
            const response = await fetch('https://opensource-contributor.onrender.com/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                alert(`Error: ${errorData.error}`);
            } else {
                const result = await response.json();
                console.log('Project saved successfully:', result);
                alert('Project submitted successfully!');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            alert('Failed to submit project.');
        }
    };
    
    return (
        <>
            <div className="form">
                <h2>Project Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label" htmlFor="title">Name</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control small"
                            placeholder="Enter project name"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="gitlink">GitHub Link</label>
                        <input
                            type="url"
                            name="gitlink"
                            className="form-control small"
                            placeholder="Enter GitHub link"
                            value={formData.gitlink}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            className="form-control large"
                            placeholder="Enter project description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="guidelines">Guidelines</label>
                        <textarea
                            name="guidelines"
                            className="form-control large"
                            placeholder="Enter project guidelines"
                            value={formData.guidelines}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
        </>
    );
}