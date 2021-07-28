import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar';
import AddIP from '../AddIPAdd'


const styles = {
    dashboardStyle: {
        width: '90%',
        fontSize: '2rem',
        textAlign: 'start',
        paddingLeft: '0.3em',
        paddingTop: '0.5em',
        paddingBottom: '0.1em',
    }
}

const Dashboard = () => {    
    return (
        <div className="w-full h-full whitebg mainContainer">
            <Navbar />
            <div id="dashboardBody">
                <div className="w-full header">
                    <div style={styles.dashboardStyle}>Dashboard</div>
                </div>
                <AddIP/>
            </div>
        </div>
    );
}

export default Dashboard;