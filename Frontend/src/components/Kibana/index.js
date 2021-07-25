import React, {Component} from 'react';
import axios from 'axios';

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
            <div className="w-full h-full">
                <iframe title="Kibana" className="w-full h-full" src={this.state.url} />
            </div>
        );
    }
}

export default Kibana;