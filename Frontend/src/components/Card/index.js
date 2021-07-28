import React from 'react';
import '../AddIPAdd/addip.css';

const styles = {
    valueStyle: {
        fontSize: '3.5rem',
        fontWeight: 'bold'
    },
    mesStyle: {
        fontSize: '2rem'
    }
}

function Card(props){
    return(
        <div className="cardStyle">
            <div style={styles.valueStyle}>{props.value}</div>
            <div style={styles.mesStyle}>{props.message}</div>
        </div>
    )
}

export default Card;