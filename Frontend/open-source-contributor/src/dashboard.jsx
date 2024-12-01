import './App.css'
import { useState } from 'react';
import ezhanImage from './assets/ezhan.jpeg';

export default function Dashboard() {
    return (
        <>
            <section id="dashboard">
                <InformationTab />
                <MainFeed />
                <Notifications/>
            </section>
        </>
    )
}

function InformationTab() {
    const [showhalf, setShowhalf] = useState(true);

    return (
        <>
            {!showhalf ? (
                <>
                    <div id='full-info'>
                        <img className='dash-img' src={ezhanImage} alt="" />
                        <h2 className='dash-name'>Ezhan Javed</h2>
                        <button className='edit-buttons'>Edit Profile</button>
                        <button className='edit-buttons'>Add Projects</button>
                        <div className='contributions'><i class="fa-solid fa-code"></i><p>contributions: 20</p> <i class="fa-solid fa-timeline"></i><p> date joined: 20</p></div>
                        <button onClick={() => setShowhalf(true)} className='edit-buttons'><i class="fa-solid fa-arrow-left"></i></button>
                    </div>

                </>
            ) : (
                <>
                    <div id='small-info'>
                        <img className='dash-img' src={ezhanImage} alt="" />
                        <h2 className='dash-name'>EJ</h2>
                        <button className='small-buttons edit-buttons'>Edit</button>
                        <button className='small-buttons edit-buttons'>Add</button>
                        <button onClick={() => setShowhalf(false)} className='small-buttons edit-buttons'><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </>
            )}
        </>
    );
}

function MainFeed() {
    return (
        <>
            <section id='main-feed'>
                <CurrentProjects />
                <FindProjects />
                <MyProjects />
            </section>
        </>
    )
}

function CurrentProjects() {
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
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

function FindProjects() {
    return (
        <>
            <div className='current-project'>
                <h2>find projects</h2>
                <div className='projects'>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                </div>
            </div>
        </>
    )
}

function MyProjects() {
    return (
        <>
            <div className='current-project'>
                <h2>my projects</h2>
                <div className='projects'>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                </div>
            </div>
        </>
    )
}


function Notifications() {
    const [showNotification, setNotification] = useState(false);

    return (
        <>
            {!showNotification ? (
                <>
                    <div id='notify'>
                        <img className='dash-img' src={ezhanImage} alt="" />
                        <h2 className='dash-name'>Ezhan Javed</h2>
                        <button className='edit-buttons'>Edit Profile</button>
                        <button className='edit-buttons'>Add Projects</button>
                        <div className='contributions'><i class="fa-solid fa-code"></i><p>contributions: 20</p> <i class="fa-solid fa-timeline"></i><p> date joined: 20</p></div>
                        <button onClick={() => setShowhalf(true)} className='edit-buttons'><i class="fa-solid fa-arrow-left"></i></button>
                    </div>

                </>
            ) : (
                <>
    
                </>
            )}
        </>
    );

}