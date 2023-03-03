import React from 'react';
import logo from "./../img/logo.svg";
import toggle from "./../img/toggle.svg";

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
        city: "",
        country: "",
    });

    const [hour, setHour] = React.useState("");
    const [minute, setMinute] = React.useState("");
    const [second, setSecond] = React.useState("");
    const [twelve, setTwelve] = React.useState("");
    const [date, setDate] = React.useState("");

    // dev
    const [running, setRunning] = React.useState(false);
   
   if(running) {                                                                         
        setTimeout(() => {
            // validation
            // if(second.length === 0) return;
            // if(minute.length === 0) return;
            // if(hour.length === 0) return;
            switch(0) {
                case second.length :
                case minute.length :
                case hour.length :
                case twelve.length :
                case date.length :
                    return;
                default :
            }
    
            // second
            let secondVal = second === "59" ? 0 : parseInt(second) + 1;
            secondVal = secondVal < 10 ? `0${secondVal}` : secondVal;
    
            // menute
            let minuteVal = minute;
            if(secondVal === "00") {
                minuteVal = minute === "59" ? 0 : parseInt(minute) + 1;
                minuteVal = minuteVal < 10 ? `0${minuteVal}` : minuteVal;
            }
    
            // hour
            let hourVal = hour;
            if(minuteVal === "00" && secondVal === "00") {
                hourVal = hourVal === "11" ? 0 : parseInt(hourVal) + 1;
                hourVal = hourVal < 10 ? `0${hourVal}` : hourVal;
            }
    
            // twelve
            let twelveVal = twelve;
            if(hourVal === "00" && minuteVal === "00" && secondVal === "00") {
                twelveVal = twelve === "am" ? "pm" : "am";
            }
    
            // date
            let dateVal = date;
            if(twelve === "pm" && twelveVal === "am" && hourVal === "00" && minuteVal === "00" && secondVal === "00") {
                dateVal = date.split(" ");
                dateVal[0] = parseInt(dateVal[0]) + 1;
                dateVal = dateVal.join(" ");
            }
    
            // set state
            setSecond(secondVal + "");  
            setMinute(minuteVal + "");
            setHour(hourVal + "");
            setTwelve(twelveVal + "");
            setDate(dateVal + "");
        }, 1000)
    };

    const request = index => {
        // clearTimeout(ivl);
        setRunning(false); //
        fetch(`http://192.168.43.150:80/latihan/world%20clock/public/time/?key=${mainCountry[index].zone}`)
            .then(response => response.json()
                .then(response => {
                    let city = mainCountry[index].zone.split('/');
                    city = city[1].replaceAll('_', ' ');
                    const time = new Date(response.dateTime);
                    let hour = time.getHours();
                    let twelve = "am";
                    if(hour > 12) {
                        hour = hour - 12;
                        twelve = "pm";
                    }
                    hour = hour < 10 ? `0${hour}` : hour;
                    const minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
                    const second = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
                    const date = `${time.getDate()} ${time.toLocaleString('default', { month: 'long' })} ${time.getFullYear()}`;
                    const obj = {
                        city: city,
                        country: mainCountry[index].country_name,
                    };
                    setHour(hour);
                    setMinute(minute);
                    setSecond(second);
                    setTwelve(twelve);
                    setDate(date);
                    setCurrentTime(obj);
                    setRunning(true); //
                })
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
    };

    React.useEffect(() => { 
        // clearTimeout(ivl);
        request(0);
    }, [mainCountry]);

    const [input, setInput] = React.useState('');

    const [searchedCountry, setSearchedCountry] = React.useState([]);

    const search = async event => {
        event.preventDefault();
        const country = await fetch(`http://192.168.43.150:80/latihan/world%20clock/public/timezone/?key=${input}`)
            .then(async response => await response.json()
                .then(response => response)
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
        setSearchedCountry(country.data);
    };

    const updateMainCountry = index => {
        // clearTimeout(ivl);
        const newTime = [...mainCountry];
        newTime.pop();
        newTime.unshift(searchedCountry[index]);
        setRunning(false); //
        setMainCountry(newTime);
    };

    return (<div className="bg-gradient bg-cover bg-center font-karla">
        <div className="w-full h-screen flex flex-col items-center justify-between text-primary py-7 px-4 sm:py-10 sm:px-16">
            <div className="flex justify-between w-full">
                <img className="w-[187px]" src={logo} alt="logo" />
                <img className="w-8" src={toggle} alt="toggle" />
            </div>
            <div className="w-full space-y-7">
                <div className="capitalize flex flex-col items-center mx-auto max-w-[326px] sm:max-w-[595px] md:max-w-[675px]">
                    <p className="text-lg self-start leading-10 sm:text-3xl"><span className="font-bold">{currentTime.city}, </span>{currentTime.country}</p>
                    <p className="leading-none"><span className="font-bold text-[69px] sm:text-[120px]">{hour}:{minute}:{second}</span><span className="text-4xl uppercase sm:text-6xl">{twelve}</span></p>
                    <p className="text-sm font-semibold self-end leading-10 sm:text-2xl">{date}</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    {mainCountry.map((el, ind) => {
                        return <div className="main-country" key={ind} onClick={() => request(ind)}>
                            <img className="h-5 sm:h-6" crossOrigin="anonymous" src={`https://countryflagsapi.com/svg/${el.country_code}`} alt={el.country_code} />
                            <span className="font-bold sm:text-lg">03:29</span>
                        </div>
                    })}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4">
                <h3 className="capitalize font-bold text-lg">more countries</h3>
                <div className="aspect-square w-14 bg-back rounded-full flex justify-center items-center">
                    <div className="aspect-square w-2/5 border-primary border-solid border-b-[3px] border-l-[3px] -rotate-45 -translate-y-1/4"></div>
                </div>
            </div>
        </div>
        <div className="min-h-[100vh] text-center text-primary flex flex-col justify-between">
            <div className="pt-16 space-y-10">
                <form action="" onSubmit={search}>
                    <input className="bg-transparent outline-none text-primary placeholder:text-primary text-center border-b-[3px] border-back pb-2 w-64" placeholder="Search Country" type="text" onInput={event => setInput(event.target.value)} onKeyUp={search} />
                </form>
                <div className="px-2 flex flex-wrap justify-center items-baseline capitalize space-x-3 space-y-2 md:space-x-10 md:space-y-10 md:max-w-[1100px] md:mx-auto">
                    <span className="hidden country country-regular"></span>
                    <span className="hidden country country-large-bold"></span>
                    <span className="hidden country country-large"></span>
                    <span className="hidden country country-bold"></span>
                    {searchedCountry.map((el, ind) => {
                        const random = Math.random();
                        let type;
                        if(random < 0.25) {
                            type = "regular";
                        } else if(random > 0.25 && random <= 0.5) {
                            type = "large-bold";
                        } else if(random > 0.5 && random <= 0.75) {
                            type = "large";
                        } else {
                            type = "bold"
                        }
                        return <span className={`country country-${type}`} key={ind} onClick={() => updateMainCountry(ind)}>{el.country_name}</span>;
                    })}
                </div>
            </div>
            <footer className="capitalize text-xs py-6 sm:text-sm">&copy; 2023 luji ramdhan</footer>
        </div>
    </div>);
};

export default Container;