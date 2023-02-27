import React from 'react';

class Head extends React.Component {
    render() {
        return (<>
            <h1>header</h1>
        </>);
    }
}

const response = fetch("http://localhost:80/latihan/world_time/public/timezone/?key=us")
    .then(data => data.json())
    .catch(data => console.log(data));
response.then(ok => console.log(ok));

export default Head;