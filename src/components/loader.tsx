import React from 'react';

import styles from './loader.module.css';

const Loader: React.FC<LoaderProps> = ({ color = '#FDCD5E', width = '100%' }) => {
    return (
        <div className={ styles.loaderContainer }>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                style={{ width }}
                className={ styles.loader }
                viewBox="0 0 50 50"
                xmlSpace="preserve"
            >
                <path fill={ color } d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        </div>
    );
};

type LoaderProps = {
    color ?: string;
    width ?: number | string;
}

export default Loader;