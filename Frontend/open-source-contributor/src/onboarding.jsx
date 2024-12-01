import './App.css'
import React, { useState } from 'react';

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1); 

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1); 
        }
    };

    return (
        <>
            <section id="onboarding">
                {currentStep === 1 && <Language />}
                {currentStep === 2 && <Interest />}
                {currentStep === 3 && <Hobbies />}
                
                <button className='next-button' onClick={handleNext}>Next</button>
            </section>
        </>
    );
}

function Language() {
    const languageButtons = ['javascript', 'python', 'go', 'java', 'c#', 'typescript', 'swift', 'php', 'ruby'];
    return (
        <>
            <h1>Tell us about yourself</h1>
            <p>Which <span className='highlight'>programming</span> language do you like to work with the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={languageButtons} />
                </div>
            </div>
        </>
    );
}

function Interest() {
    const interestButtons = ['Sports', 'Music', 'Technology', 'Travel', 'Art'];
    return (
        <>
            <h1>Okay, what about this...</h1>
            <p>Which <span className='highlight'>interest</span> do you have the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={interestButtons} />
                </div>
            </div>
        </>
    );
}

function Hobbies() {
    const hobbyButtons = ['Reading', 'Cooking', 'Photography', 'Gaming', 'Fitness'];
    return (
        <>
            <h1>One last question for you!</h1>
            <p>Which <span className='highlight'>hobby</span> do you enjoy the most?</p>
            <div id='holder'>
                <div id='choices'>
                    <ButtonGroup buttons={hobbyButtons} />
                </div>
            </div>
        </>
    );
}

function ButtonGroup({ buttons }) {
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