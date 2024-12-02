import './App.css'
import { useState } from 'react';
import { InformationTab, Notifications } from './dashboard';

export default function MyProjectsDetailScreen() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            {showNotifications && <Notifications />}
            <section id="dashboard">
                <InformationTab
                    showNotifications={showNotifications}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                />
                <MyProjectFeed />
            </section>
        </>
    );
}

function MyProjectFeed() {
    return (
        <>
            <section id='main-feed'>
                <MyProjectsList />
            </section>
        </>
    )
}

function MyProjectsList() {
    return (
        <>
            <div className='current-project'>
                <h2>seo tool for links</h2>
                <div className='another line'><i class="fa-solid fa-person"></i><p>project owener: mavia</p> <i class="fa-solid fa-code"></i><p>contributors: 20</p></div>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <p> ssnesciunt nisi nam exercitationem inventore laboriosam sunt cupiditate molestias neque, doloribus laudantium possimus esse perferendis odit consequuntur.</p>
                <InteractiveTables />
            </div>
        </>
    )
}

function InteractiveTables(){
    // State for the status buttons
    const [statuses, setStatuses] = useState([
      { id: 1, status: "Approved" },
      { id: 2, status: "Declined" },
    ]);
  
    // Function to toggle the status
    const toggleStatus = (id) => {
      setStatuses((prevStatuses) =>
        prevStatuses.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "Approved" ? "Declined" : "Approved" }
            : item
        )
      );
    };
  
    return (
      <div>
        <h2>task assignment</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Task Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Alice</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
  
        <h2>project status</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Project Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(({ id, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{id === 1 ? "Alice" : "Bob"}</td>
                <td>{id === 1 ? "Project A" : "Project B"}</td>
                <td>
                  <button
                    className= 'status'
                    onClick={() => toggleStatus(id)}
                  >
                    {status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className ='small-btn git-button'>delete project</button>
      </div>
    );
  };