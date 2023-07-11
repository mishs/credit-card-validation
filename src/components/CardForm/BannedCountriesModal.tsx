import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface BannedCountriesModalProps {
    show: any;
    onHide: () => void;
    // onClick: () => void;
    bannedCountries: string[];
}

const BannedCountriesModal: React.FC<BannedCountriesModalProps> = ({ show, onHide, bannedCountries }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton >
                <Modal.Title>Banned Countries</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>The following countries are not accepted:</p>
                <ul>
                    {bannedCountries.map((country, index) => (
                        <li key={index} style={{ color: 'red' }}>{country}</li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default BannedCountriesModal;
