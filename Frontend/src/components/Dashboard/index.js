import React, {Component} from 'react';
import './dashboard.css';
import Navbar from '../Navbar';

class Dashboard extends Component {
    render() {
        return (
            <div class="w-full h-full whitebg mainContainer">
                <Navbar />
                Hello World
            </div>
        );
    }
}

export default Dashboard;