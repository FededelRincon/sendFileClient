import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css'

const About = () => {
    return (
        <>

            <Layout>
            {/* <div className={styles.container}> */}
                <h1>AboutPage</h1>
                <ol className={styles.orderList}>
                {/* <ol> */}
                    <li>Express</li>
                    <li>Mongo</li>
                    <li>Next</li>
                    <li>Taildwind</li>
                </ol>
            {/* </div> */}
            </Layout>
        </>
    );
}
 
export default About;