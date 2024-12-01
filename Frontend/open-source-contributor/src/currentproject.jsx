import './App.css'
import { useState } from 'react';
import {InformationTab, Notifications } from './dashboard'; 

export default function CurrentProjectsScreen() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    showNotifications={showNotifications}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <CurrentProjectFeed />
            </section>
        </>
    );
}

function CurrentProjectFeed() {
    return (
        <>
            <section id='project-feed'>
                <CurrentProjectsList />
            </section>
        </>
    )
}

function CurrentProjectsList() {
    //If user won't have access to any project we need to show messsage to add projects
    const [showCurrent, setCurrent] = useState(true);
    return (
        <>
            {!showCurrent ? (
                <>
                    <div className='current-project'>
                        <h2>current projects</h2>
                        <p>oh, no! you don't have any active projects right now!</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='current-project'>
                        <h2>current projects</h2>
                        <div className='projects'>
                            <div className='one-project'></div>
                            <div className='one-project'></div>
                            <div className='one-project'></div>
                            <div className='one-project'></div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}