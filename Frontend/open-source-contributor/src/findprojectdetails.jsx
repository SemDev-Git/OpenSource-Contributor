import './App.css'
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';

export default function FindProjectsDetailScreen() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    showNotifications={showNotifications}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <FindProjectFeed />
            </section>
        </>
    );
}

function FindProjectFeed() {
    return (
        <>
            <section id='project-feed'>
                <FindProjectsList />
            </section>
        </>
    )
}

function FindProjectsList() {
    return (
        <>
            <div className='current-project'>
                <h2>seo tool for links</h2>
                <div className='another line'><i class="fa-solid fa-person"></i><p>project owener: mavia</p> <i class="fa-solid fa-code"></i><p>contributors: 20</p></div>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <h2>contribution guidelines</h2>
                <p>you would be obliged to follow these guidelines - failing to do so can result in expulsion</p>
                <ul>
                    <li>you should know what you are doing</li>
                    <li>you should know what you are doing</li>
                    <li>you should know what you are doing</li>
                    <li>you should know what you are doing</li>
                    <li>you should know what you are doing</li>
                    <li>you should know what you are doing</li>
                </ul>
                <h2>some requirments</h2>
                <ul>
                    <li>tech stack: js, java</li>
                    <li>tech stack: js, java</li>
                    <li>tech stack: js, java</li>
                </ul>
                <button className='small-btn git-button'>send request</button>
            </div>
        </>
    )
}