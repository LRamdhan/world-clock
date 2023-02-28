import React from 'react';

const Container = () => {
    const [mainCountry, setMainCountry] = React.useState([
        {  
            "country_code": "AE",
            "country_name": "United Arab Emirates",
            "zone": "Asia/Dubai"
        },
        {
            "country_code": "GB",
            "country_name": "United Kingdom",
            "zone": "Europe/London"
        },
        {
            "country_code": "TZ",
            "country_name": "Tanzania, United Republic of",
            "zone": "Africa/Dar_es_Salaam"
        },
        {
            "country_code": "UM",
            "country_name": "United States Minor Outlying Islands",
            "zone": "Pacific/Midway"
        },
        {
            "country_code": "US",
            "country_name": "United States",
            "zone": "America/Adak"
        }
    ]);
    
    const [currentTime, setCurrentTime] = React.useState({
        time: new Date(),
        timeZone: "random"
    });

    const setCurrent = (time, timeZone) => {
        setCurrentTime({
            time: new Date(time),
            timeZone: timeZone
        });
    };

    const request = index => {
        fetch(`http://localhost:80/latihan/world%20clock/public/time/?key=${mainCountry[index].zone}`)
            .then(response => response.json()
                .then(response => setCurrent(response.dateTime, response.timeZone))
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
    };

    React.useEffect(() => {
        request(0)
    }, [mainCountry]);

    const [input, setInput] = React.useState('');

    const [searchedCountry, setSearchedCountry] = React.useState([]);

    const search = async event => {
        event.preventDefault();
        const country = await fetch(`http://localhost:80/latihan/world%20clock/public/timezone/?key=${input}`)
            .then(async response => await response.json()
                .then(response => response)
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
        setSearchedCountry(country.data);
    };

    const updateMainCountry = index => {
        const newTime = [...mainCountry];
        newTime.pop();
        newTime.unshift(searchedCountry[index]);
        setMainCountry(newTime);
    };

    return (<>
       <div>
            <p>{currentTime.timeZone}</p>
            <h2>{currentTime.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</h2>
            <p>{currentTime.time.getDate()} {currentTime.time.toLocaleString('default', { month: 'long' })} {currentTime.time.getFullYear()}</p>
            <ul>
                {mainCountry.map((el, ind) => <li key={ind} onClick={() => request(ind)}>
                    <img crossOrigin="anonymous" src={`https://countryflagsapi.com/svg/${el.country_code}`} alt={el.country_code} width="30" />
                    {el.country_name}
                </li>)}
            </ul>
       </div>
       <br /><br /><br />
       <div>
            <form action="" onSubmit={search}>
                <input type="text" placeholder='search country' onInput={event => setInput(event.target.value)} onKeyUp={search}/>
            </form>
            <ul>
                {searchedCountry.map((el, ind) => {
                    return <li key={ind} onClick={() => updateMainCountry(ind)}>{el.country_name}</li>;
                })}
            </ul>
       </div>
    </>);

};

export default Container;