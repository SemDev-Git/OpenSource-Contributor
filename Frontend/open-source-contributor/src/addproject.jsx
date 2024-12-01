import './style.css'
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';

export default function AddProjectsScreen() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    showNotifications={showNotifications}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <AddProjectFeed />
            </section>
        </>
    );
}

function AddProjectFeed() {
    return (
        <>
            <section id='project-feed'>
                <AddProjectsList />
            </section>
        </>
    )
}

function AddProjectsList() {
    return (
        <>
            <div className="container">
                <h2>project information</h2>
                <form>
                    <div className="form-group">
                        <label className='label' htmlFor="name">Name</label>
                        <input type="text" className="form-control small" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="gitlink">Git Hub Link</label>
                        <input type="url" className="form-control small" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="description">Description</label>
                        <textarea className="form-control large" placeholder=""></textarea>
                    </div>
                    <div className="form-group">
                        <label className='label' htmlFor="guidelines">Guidelines</label>
                        <textarea className="form-control large" placeholder=""></textarea>
                    </div>
                    <button type="submit" className="button">Submit</button>
                </form>
            </div>

        </>
    )
}