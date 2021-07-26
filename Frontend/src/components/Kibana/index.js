import React, {Component} from 'react';
import axios from 'axios';

const styles = {
    fullSize: {
        width: '100%',
        height: '100%'
    }
}

class Kibana extends Component {
    constructor(){
        super();
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
        axios.get(
            '/api/kibana',
            {withCredentials: true}
        ).then(res => {
            this.setState({
                url: res.data.message
            })
        }).catch(err => {
            window.location = '/login';
        })
    }

    render(){
        return (
            <div style={styles.fullSize}>
                <iframe title="kibana" style={styles.fullSize} src={this.state.url} />
            </div>
        );
    }
}

export default Kibana;