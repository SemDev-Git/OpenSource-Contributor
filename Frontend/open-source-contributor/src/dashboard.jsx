import './App.css';
import { useState, useEffect } from 'react';
import ezhanImage from './assets/ezhan.jpeg';
import SwipeableCards from './swip';

export default function Dashboard({ userData, onNavigate }) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                    onNavigate={onNavigate}
                />
                <MainFeed userData={userData} onNavigate={onNavigate} />
            </section>
        </>
    );
}

export function InformationTab({ toggleNotifications, onNavigate }) {
    const [showhalf, setShowhalf] = useState(true);

    return (
        <>
            {!showhalf ? (
                <div id="full-info">
                    <img className="dash-img" src={ezhanImage} alt="" />
                    <h2 className="dash-name">Ezhan Javed</h2>
                    <div className="contributions">
                        <i className="fa-solid fa-code"></i>
                        <p>Contributions: 20</p>
                        <i className="fa-solid fa-timeline"></i>
                        <p>Date Joined: 20</p>
                    </div>
                    <button className="edit-buttons">Edit Profile</button>
                    <button onClick={() => onNavigate('addProjects')} className="edit-buttons">Add Projects</button>
                    <div className="contributions">
                        <button onClick={() => setShowhalf(true)} className="notification-buttons">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button onClick={toggleNotifications} className="notification-buttons">
                            <i className="fa-solid fa-bell"></i>
                        </button>
                    </div>
                </div>
            ) : (
                <div id="small-info">
                    <img className="dash-img" src={ezhanImage} alt="" />
                    <h2 className="dash-name">EJ</h2>
                    <button className="small-buttons edit-buttons">Edit</button>
                    <button className="small-buttons edit-buttons">Add</button>
                    <button
                        onClick={() => setShowhalf(false)}
                        className="small-buttons edit-buttons"
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <button onClick={toggleNotifications} className="small-buttons edit-buttons">
                        <i className="fa-solid fa-bell"></i>
                    </button>
                </div>
            )}
        </>
    );
}

function MainFeed( {userData, onNavigate}) {
    return (
        <>
            <section id='main-feed'>
                <CurrentProjects onNavigate={onNavigate} />
                <FindProjects onNavigate={onNavigate} />
                <MyProjects userData={userData} onNavigate={onNavigate} />
            </section>
        </>
    )
}

function CurrentProjects({ onNavigate }) {
    // State to manage current visibility and project data
    const [showCurrent, setShowCurrent] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state
    const [error, setError] = useState(null); // To handle error state
  
    // Fetch projects when the component mounts
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/projects'); // Replace with the correct API URL
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          const data = await response.json();
  
          // Limit to the first 3 projects
          setProjects(data.slice(0, 3)); // Only get the first 3 projects
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
    if (loading) {
      return <p>Loading projects...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <>
        {!showCurrent ? (
          <div className="current-project">
            <div className="another line">
              <h2>Current Projects</h2> -{' '}
              <button className="new-buttons" onClick={() => onNavigate('currentproject')}><i className="fa-solid fa-arrow-left"></i></button>
            </div>
            <p>Oh no! You don't have any active projects right now!</p>
          </div>
        ) : (
          <div className="current-project">
            <div className="another line">
              <h2>Current Projects</h2> -{' '}
              <button
                className="new-buttons"
                onClick={() => onNavigate('currentproject')}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
            <div className="projects">
              {projects.length === 0 ? (
                <p>No projects available.</p>
              ) : (
                projects.map((project, index) => (
                  <div key={index} className="card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </>
    );
  }

function FindProjects({onNavigate}) {
    return (
        <>
            <div className='current-project'>
                <div className='another line'><h2>find projects</h2> - <button className='new-buttons' onClick={() => onNavigate('findproject')}><i className="fa-solid fa-arrow-left"></i></button></div>
                <div className='projects'>
                    <div className='one-project'><SwipeableCards onNavigate={onNavigate} /></div>
                </div>
            </div>
        </>
    )
}

function MyProjects({userData, onNavigate}) {
    // State to manage current visibility and project data
    const [showCurrent, setShowCurrent] = useState(true);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state
    const [error, setError] = useState(null); // To handle error state
  
    // Fetch projects when the component mounts
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/projects'); // Replace with the correct API URL
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          const data = await response.json();
  
          // Limit to the first 3 projects
          setProjects(data.slice(0, 3)); // Only get the first 3 projects
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
    if (loading) {
      return <p>Loading projects...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <>
        {!showCurrent ? (
          <div className="current-project">
            <div className="another line">
              <h2>my projects</h2> -{' '}
              <button className="new-buttons" onClick={() => onNavigate('myproject')}><i className="fa-solid fa-arrow-left"></i></button>
            </div>
            <p>Oh no! You don't have any active projects right now!</p>
          </div>
        ) : (
          <div className="current-project">
            <div className="another line">
              <h2>my projects</h2> -{' '}
              <button
                className="new-buttons"
                onClick={() => onNavigate('myproject')}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
            <div className="projects">
              {projects.length === 0 ? (
                <p>No projects available.</p>
              ) : (
                projects.map((project, index) => (
                  <div key={index} className="card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button className='edit-buttons' onClick={() => onNavigate('myprojectdetail')}>Explore</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </>
    );
}


export function Notifications() {
    return (
        <>
            <div id='notify'>
                <h2>check out if anyone has tried to contact you...</h2>
            </div>

        </>
    );
}