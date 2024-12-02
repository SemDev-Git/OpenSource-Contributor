import './App.css'
import React, { useState } from 'react';
import Screen from './screen';

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1); 
    const [language, setLanguage] = useState([]);   // To track selected languages
    const [interest, setInterest] = useState([]);   // To track selected interests
    const [hobbies, setHobbies] = useState([]);     // To track selected hobbies

    // Proceed to next step
    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1); 
        }
    };

    // Store data from ButtonGroup
    const handleDataChange = (type, data) => {
        if (type === 'language') {
            setLanguage(data);
        } else if (type === 'interest') {
            setInterest(data);
        } else if (type === 'hobby') {
            setHobbies(data);
        }
    };

    if (currentStep < 4) {
        return (
            <section id="onboarding">
                {currentStep === 1 && <Language onChange={handleDataChange} />}
                {currentStep === 2 && <Interest onChange={handleDataChange} />}
                {currentStep === 3 && <Hobbies onChange={handleDataChange} />}
                <button className='next-button' onClick={handleNext}>Next</button>
            </section>
        );
    } else {
        return <ThankYou data={{ language, interest, hobbies }} />;
    }
}

function Language({ onChange }) {
    const languageButtons = ['javascript', 'python', 'go', 'java', 'c#', 'typescript', 'swift', 'php', 'ruby'];

    return (
        <>
            <h1>Tell us about yourself</h1>
            <p>Which <span className='highlight'>programming</span> language do you like to work with the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={languageButtons} onChange={(data) => onChange('language', data)} />
                </div>
            </div>
        </>
    );
}

function Interest({ onChange }) {
    const interestButtons = ['Sports', 'Music', 'Technology', 'Travel', 'Art'];

    return (
        <>
            <h1>Okay, what about this...</h1>
            <p>Which <span className='highlight'>interest</span> do you have the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={interestButtons} onChange={(data) => onChange('interest', data)} />
                </div>
            </div>
        </>
    );
}

function Hobbies({ onChange }) {
    const hobbyButtons = ['Reading', 'Cooking', 'Photography', 'Gaming', 'Fitness'];

    return (
        <>
            <h1>One last question for you!</h1>
            <p>Which <span className='highlight'>hobby</span> do you enjoy the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={hobbyButtons} onChange={(data) => onChange('hobby', data)} />
                </div>
            </div>
        </>
    );
}

function ThankYou({ data }) {
    const [showDashboard, setShowDashboard] = useState(false);
    const { language, interest, hobbies } = data;

    return (
        <>
        {!showDashboard ? (
            <section id='login'>
                <h1>and that's it...</h1>
                <p>Thank you for choosing to work with us!</p>
                <p>Here's what we learned:</p>
                <ul>
                    <li><strong>Languages:</strong> {language.join(', ')}</li>
                    <li><strong>Interests:</strong> {interest.join(', ')}</li>
                    <li><strong>Hobbies:</strong> {hobbies.join(', ')}</li>
                </ul>
                <button 
                    className='git-button' 
                    onClick={() => setShowDashboard(true)}
                >
                    Show me dashboard
                </button>
            </section>
        ) : (
            <Screen />
        )}
        </>
    ) 
}

function ButtonGroup({ buttons, onChange }) {
    const [selectedButtons, setSelectedButtons] = useState([]);

    const handleButtonClick = (buttonValue) => {
        setSelectedButtons((prevSelected) => {
            if (prevSelected.includes(buttonValue)) {
                return prevSelected.filter((item) => item !== buttonValue);
            } else {
                return [...prevSelected, buttonValue];
            }
        });
    };

    const buttonStyles = (buttonValue) => {
        return selectedButtons.includes(buttonValue)
            ? { backgroundColor: '#439A97', color: '#fff' }
            : {};
    };

    const chunkButtons = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const buttonRows = chunkButtons(buttons, 3);

    // Pass the selected data to the parent component
    React.useEffect(() => {
        onChange(selectedButtons);
    }, [selectedButtons, onChange]);

    return (
        <div>
            {buttonRows.map((row, rowIndex) => (
                <div key={rowIndex} className="line">
                    {row.map((buttonValue, index) => (
                        <button
                            key={index}
                            className="stick-button"
                            style={buttonStyles(buttonValue)}
                            onClick={() => handleButtonClick(buttonValue)}
                        >
                            {buttonValue}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}