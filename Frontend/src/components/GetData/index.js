import { formatMs } from '@material-ui/core';
import axios from 'axios';
import React from 'react';

// Close Add ip form
// Print Errors on the form
// Table size should be constant
// Add Os and Port in the form

const ipData = [{
    'username': 'Admin Super Pro Max',
    'ip': '192.172.212.119',
    'ipName': 'Local-IP',
    'desc': 'This is a local IP'
  },
  {
    'username': 'Ubuntu',
    'ip': '127.0.0.1',
    'ipName': 'Local IP',
    'desc': 'This is a local IP'
  },
  {
    'username': 'Windows',
    'ip': '192.172.22.11',
    'ipName': 'Local IP Pro Max',
    'desc': 'This is a local IP'
  },
  
  {
    'username': 'Windows',
    'ip': '192.172.2.9',
    'ipName': 'Local IP Pro Max',
    'desc': 'This is a local IP'
  },
  {
    'username': 'Administrator',
    'ip': '192.172.91.59',
    'ipName': 'LocalIP Series S Max Pro',
    'desc': 'This is an Example of a long long long description'
  }
]

export default ipData;