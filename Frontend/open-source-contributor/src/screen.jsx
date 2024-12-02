import React, { useState } from 'react';
import Dashboard from './dashboard';
import AddProjectsScreen from './addproject';
import CurrentProject from './currentproject';
import FindProject from './findprojects';
import MyProjectsScreen from './myprojects';

function Screen({ userData }) {
    const [currentScreen, setCurrentScreen] = useState('dashboard'); // Initial screen

    const screens = {
        dashboard: <Dashboard userData={userData} onNavigate={setCurrentScreen} />,
        addProjects: <AddProjectsScreen userData={userData} onNavigate={setCurrentScreen} />,
        currentproject: <CurrentProject onNavigate={setCurrentScreen} />,
        findproject: <FindProject onNavigate={setCurrentScreen} />,
        myproject: <MyProjectsScreen onNavigate={setCurrentScreen} />,
    };

    return <div>{screens[currentScreen]}</div>; // Dynamically render the current screen
}

export default Screen;
