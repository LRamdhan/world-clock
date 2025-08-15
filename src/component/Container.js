import React from 'react';
import logoDark from "./../img/logoDark.svg";
import logoLight from "./../img/logoLight.svg";
import toggleDark from "./../img/toggleDark.svg";
import toggleLight from "./../img/toggleLight.svg";

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
            "country_code": "AT",
            "country_name": "Austria",
            "zone": "Europe/Vienna"
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
    const [running, setRunning] = React.useState(false);

    const [mainTime, setMainTime] = React.useState([]);

    const [input, setInput] = React.useState('');

    const [searchedCountry, setSearchedCountry] = React.useState([]);

    const container = React.useState(React.useRef())[0];
    const searching = React.useState(React.useRef())[0];
    const clock = React.useState(React.useRef())[0];
    const inputField = React.useState(React.useRef())[0];

    const requestBar = async () => {
        const times = [];
        for(let country of mainCountry) {
            await fetch(`/time/?key=${country.zone}`)
                .then(async res => {
                    const detail = await res.json();
                    let hour = detail.hour === 24 ? 0 : detail.hour > 12 ? detail.hour - 12 : detail.hour;
                    hour = hour < 10 ? `0${hour}` : hour;
                    const minute = detail.minute < 10 ? `0${detail.minute}` : detail.minute;
                    times.push({
                        time: `${hour}:${minute}`,
                        code: country.country_code
                    });
                })
                .catch(res => console.log(`error : ${res}`));
        }
        setMainTime(times);
    };

    const requestOne = (zone, code) => {
        fetch(`/time/?key=${zone}`)
            .then(async res => {
                const detail = await res.json();
                const main = [...mainTime];
                main.pop();
                let hour = detail.hour === 24 ? 0 : detail.hour > 12 ? detail.hour - 12 : detail.hour;
                hour = hour < 10 ? `0${hour}` : hour;
                const minute = detail.minute < 10 ? `0${detail.minute}` : detail.minute;
                main.unshift({
                    time: `${hour}:${minute}`,
                    code: code
                });
                setMainTime(main);
            })
            .catch(res => console.log(`error : ${res}`));
    };

    React.useEffect(() => {
        requestBar();
    }, []);
   
    if(running) {                                                                         
        setTimeout(() => {
            switch(0) {
                case second.length :
                case minute.length :
                case hour.length :
                case twelve.length :
                case date.length :
                    return;
                default :
            }
            let secondVal = parseInt(second) >= 59 ? 0 : parseInt(second) + 1;
            secondVal = secondVal < 10 ? `0${secondVal}` : secondVal;
            let minuteVal = minute;
            if(secondVal === "00") {
                minuteVal = parseInt(minute) >= 59 ? 0 : parseInt(minute) + 1;
                minuteVal = minuteVal < 10 ? `0${minuteVal}` : minuteVal;
                requestBar();
            }
            let hourVal = hour;
            if(minuteVal === "00" && secondVal === "00") {
                hourVal = parseInt(hourVal) >= 11 ? 0 : parseInt(hourVal) + 1;
                hourVal = hourVal < 10 ? `0${hourVal}` : hourVal;
            }
            let twelveVal = twelve;
            if(hourVal === "00" && minuteVal === "00" && secondVal === "00") {
                twelveVal = twelve === "am" ? "pm" : "am";
            }
            let dateVal = date;
            if(twelve === "pm" && twelveVal === "am" && hourVal === "00" && minuteVal === "00" && secondVal === "00") {
                dateVal = date.split(" ");
                dateVal[0] = parseInt(dateVal[0]) + 1;
                dateVal = dateVal.join(" ");
            }
            setSecond(secondVal + "");  
            setMinute(minuteVal + "");
            setHour(hourVal + "");
            setTwelve(twelveVal + "");
            setDate(dateVal + "");
        }, 1000)
    };

    const request = index => {
        setRunning(false);
        fetch(`/time/?key=${mainCountry[index].zone}`)
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
                    setRunning(true);
                })
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
    };

    React.useEffect(() => { 
        request(0);
    }, [mainCountry]);

    const search = async event => {
        event.preventDefault();
        if(input.length === 0) return;
        const country = await fetch(`/timezone/?key=${input}`)
            .then(async response => await response.json()
                .then(response => response)
                .catch(response => console.log(`error : ${response}`)))
            .catch(response => console.log(`error : ${response}`));
        for(let ctr of country.data) {
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
           ctr.style = type;
        }
        setSearchedCountry(country.data);
    };

    const updateMainCountry = index => {
        inputField.current.blur();
        clock.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        });
        for(let ctr of mainCountry) {
           if(ctr.country_name === searchedCountry[index].country_name) return;
        }
        const newTime = [...mainCountry];
        newTime.pop();
        newTime.unshift(searchedCountry[index]);
        requestOne(searchedCountry[index].zone, searchedCountry[index].country_code);
        setRunning(false);
        setMainCountry(newTime);
    };

    const setInputValue = event => {
        if(event.target.value.trimStart().length === 0) {
            event.target.value = "";
        }
        setInput(event.target.value);
    };

    const switchMode = () => {
        container.current.classList.toggle('dark');
    };

    const scroll = () => {
        searching.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        });
        inputField.current.focus({preventScroll: true});
    };

    return (<div ref={container}><div className="bg-light dark:bg-dark bg-cover bg-center font-karla">
        <div className="w-full h-screen flex flex-col items-center justify-between text-primary-dark dark:text-primary py-7 px-4 sm:py-10 sm:px-16" ref={clock}>
            <div className="flex justify-between w-full">
                <img className="w-[187px] dark:hidden" src={logoLight} alt="logo" />
                <img className="w-[187px] hidden dark:block" src={logoDark} alt="logo" />
                <div className="w-max h-max cursor-pointer" onClick={switchMode}>
                    <img className="w-8 dark:hidden" src={toggleLight} alt="toggle"/>
                    <img className="w-8 hidden dark:block" src={toggleDark} alt="toggle"/>
                </div>
            </div>
            <div className="w-full space-y-7">
                <div className="capitalize flex flex-col items-center mx-auto max-w-[326px] sm:max-w-[595px] md:max-w-[675px]">
                    <p className="text-lg self-start sm:text-3xl"><span className="font-bold">{currentTime.city}, </span>{currentTime.country}</p>
                    <p className="leading-none py-2.5"><span className="font-bold text-[69px] sm:text-[120px]">{hour}:{minute}:{second}</span><span className="text-4xl uppercase sm:text-6xl">{twelve}</span></p>
                    <p className="text-sm font-semibold self-end leading-none sm:text-2xl">{date}</p>
                </div>
                <div className="flex flex-wrap justify-center">
                    {mainTime.map((el, ind) => {
                        return <div className="main-country text-primary cursor-pointer active:scale-90 md:hover:-translate-y-[20%] transition-all duration-200" key={ind} onClick={() => request(ind)}>
                            <img className="h-5 sm:h-6" src={`https://www.countryflagicons.com/FLAT/64/${el.code}.png`} alt={el.code} />
                            <span className="font-bold sm:text-lg">{el.time}</span>
                        </div>
                    })}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center group">
                <h3 className="capitalize font-bold text-lg text-back dark:text-primary pb-4 md:pb-0 md:translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-y-1/2 transition-all">more countries</h3>
                <div className="aspect-square w-14 bg-back-light dark:bg-back rounded-full flex justify-center items-center cursor-pointer" onClick={scroll}>
                    <div className="aspect-square w-2/5 border-primary border-solid border-b-[3px] border-l-[3px] -rotate-45 -translate-y-1/4"></div>
                </div>
            </div>
        </div>
        <div className="min-h-[100vh] text-center text-primary-light dark:text-primary flex flex-col justify-between" ref={searching}>
            <div className="pt-16 space-y-10">
                <form action="" onSubmit={search}>
                    <input className="bg-transparent outline-none text-primary-light dark:text-primary placeholder:text-back-light dark:placeholder:text-primary text-center border-b-[3px] border-back dark:border-back-light pb-2 w-64" placeholder="Search Country" type="text" onInput={setInputValue} onKeyUp={search} ref={inputField} />
                </form>
                <div className="px-2 flex flex-wrap justify-center items-baseline capitalize space-x-3 space-y-2 md:space-x-10 md:space-y-10 md:max-w-[1100px] md:mx-auto">
                    <span className="hidden country country-regular"></span>
                    <span className="hidden country country-large-bold"></span>
                    <span className="hidden country country-large"></span>
                    <span className="hidden country country-bold"></span>
                    {searchedCountry.map((el, ind) => 
                        <span className={`country country-${el.style} cursor-pointer`} key={ind} onClick={() => updateMainCountry(ind)}>{el.country_name}</span>
                    )}
                </div>
            </div>
            <footer className="capitalize text-xs py-6 sm:text-sm">&copy; 2023 luji ramdhan</footer>
        </div>
    </div></div>);
};

export default Container;