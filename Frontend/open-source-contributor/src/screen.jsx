import React, { useState } from 'react';
import Dashboard from './dashboard';
import AddProjectsScreen from './addproject';
import CurrentProject from './currentproject';
import FindProject from './findprojects';
import MyProjectsScreen from './myprojects';
import MyProjectsDetailScreen from './myprojectdetail';
import FindProjectsDetailScreen from './findprojectdetails';
import SwipeableCards from './swip';

function Screen({ userData }) {
    const [currentScreen, setCurrentScreen] = useState('dashboard'); // Initial screen

    const screens = {
        dashboard: <Dashboard userData={userData} onNavigate={setCurrentScreen} />,
        addProjects: <AddProjectsScreen userData={userData} onNavigate={setCurrentScreen} />,
        currentproject: <CurrentProject onNavigate={setCurrentScreen} />,
        findproject: <FindProject onNavigate={setCurrentScreen} />,
        myproject: <MyProjectsScreen onNavigate={setCurrentScreen} />,
        findprojectdetail: <FindProjectsDetailScreen onNavigate={setCurrentScreen} />,
        myprojectdetail: <MyProjectsDetailScreen onNavigate={setCurrentScreen} />,
        findprojectdetail: <SwipeableCards onNavigate={setCurrentScreen} />,
    };

    return <div>{screens[currentScreen]}</div>; // Dynamically render the current screen
}

export default Screen;
