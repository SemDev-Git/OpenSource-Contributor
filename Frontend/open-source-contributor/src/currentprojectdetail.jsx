import './App.css'
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';
import DragDropBoard from './drag';

export default function CurrentProjectsDetailScreen() {
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
    return (
        <>
            <div className='current-project'>
                <h2>seo tool for links</h2>
                <div className='another line'><i class="fa-solid fa-person"></i><p>project owener: mavia</p> <i class="fa-solid fa-code"></i><p>contributors: 20</p></div>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <DragDropBoard />
                <button className ='small-btn git-button'>leave project</button>
            </div>
        </>
    )
}