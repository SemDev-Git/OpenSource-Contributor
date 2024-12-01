import './App.css'
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';

export default function FindProjectsScreen() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showFilter, setFilter] = useState(false);

    return (
        <>
            {showFilter && <Filter />}
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <FindProjectFeed
                    toggleFilter={() => setFilter(!showFilter)}
                />
            </section>
        </>
    );
}

function FindProjectFeed({ toggleFilter }) {
    return (
        <section id='project-feed'>
            <FindProjectsList toggleFilter={toggleFilter} />
        </section>
    );
}


function FindProjectsList({ toggleFilter }) {
    return (
        <>
            <div className='current-project'>
                <div className='line'><h2>find projects</h2><button className='filter-btn' onClick={toggleFilter}><i class="fa-solid fa-search"></i></button></div>
                <div className='projects'>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                    <div className='one-project'></div>
                </div>
            </div>
        </>
    )
}

function Filter() {
    return (
        <>
            <div id='notify'>
                <h2>Add the filters to find the project you need</h2>
                <div className="filter-options">
                    <div className="filter-group">
                        <label htmlFor="programming-language">Programming Language</label>
                        <select id="programming-language" className="filter-select">
                            <option value="">Select</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="csharp">C#</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="interest">Interest</label>
                        <select id="interest" className="filter-select">
                            <option value="">Select</option>
                            <option value="web-development">Web Development</option>
                            <option value="data-science">Data Science</option>
                            <option value="mobile-development">Mobile Development</option>
                            <option value="game-development">Game Development</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="hobby">Hobby</label>
                        <select id="hobby" className="filter-select">
                            <option value="">Select</option>
                            <option value="painting">Painting</option>
                            <option value="reading">Reading</option>
                            <option value="sports">Sports</option>
                            <option value="music">Music</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}