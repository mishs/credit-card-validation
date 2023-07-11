/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

interface BannedCountriesModalProps {
    show: any;
    message: string;
    timeout: number;
    bannedCountries: string[];
}

const DisappearingAlert: React.FC<BannedCountriesModalProps> = ({ message, timeout, bannedCountries }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout]);

    return (
        <Alert variant="success" show={visible} onClose={() => setVisible(false)} dismissible>
            <p>The following countries are not accepted:</p>
            <ul>
                {bannedCountries.map((country, index) => (
                    <li key={index} style={{ color: 'red' }}>{country}</li>
                ))}
            </ul>
            {message}
        </Alert>
    );
};

export default DisappearingAlert;