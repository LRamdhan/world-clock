import { memo, useEffect, useState } from "react"
import { useMainContext } from "../context/mainContext"
import { generateFlagUrl } from "../utils/flagUtils"
import timezoneApi from "../api/timezoneApi"
import { twoDigit } from "../utils/timeUtils"
import { useChooseCountry } from "../hook/time.hook"

const Item = ({item}) => {
  const [initialSecond, setInitialSecond] = useState(item.second);
  const [second, setSecond] = useState(item.second);

  const [initialMinute, setInitialMinute] = useState(item.minute);
  const [minute, setMinute] = useState(item.minute);

  const [initialHour, setInitialHour] = useState(item.hour);
  const [hour, setHour] = useState(item.hour);

  useEffect(() => {
    setTimeout(() => {
      // if main context change -> change this local state
      if((item.second !== initialSecond) || (item.minute !== initialMinute) || (item.hour !== initialHour)) {
          setSecond(item.second);
          setInitialSecond(item.second);

          setMinute(item.minute);
          setInitialMinute(item.minute);

          setHour(item.hour);
          setInitialHour(item.hour);
      } else { // if main context doesn't change -> preserve this local state
        let tempSecond = second;
        let tempMinute = minute;
        let tempHour = hour;

        if(tempSecond === 59) {
          setSecond(0);
          tempMinute++
        } else {
          setSecond(second + 1);
        }

        if((tempSecond === 59) && (tempMinute === 60)) {
          tempHour++;
          setMinute(0);
        } else if((tempSecond === 59) && (tempMinute !== 60)) {
          setMinute(minute + 1);
        }

        if((tempMinute === 60) && (tempHour === 12)) {
          setHour(0);
        } else if((tempMinute === 60) && (tempHour !== 12)) {
          setHour(hour + 1);
        }
      }
    }, 1000);
  }, [second, minute, hour, item]);

  return (
    <div title={item.country.replaceAll('_', ' ')} className="main-country text-primary cursor-pointer active:scale-90 md:hover:-translate-y-[20%] transition-all duration-200">
      <img className="h-5 sm:h-6" src={generateFlagUrl(item.code)} alt={item.code} />
      <span className="font-bold sm:text-lg">{twoDigit(hour)}:{twoDigit(minute)}</span>
    </div>
  )
}

const TimeSecondary = () => {
  const { secondaryTime, setSecondaryTime, isPendingSecondary, setIsPendingSecondary } = useMainContext()
  const chooseCountry = useChooseCountry()

  // click secondary country
  const handleClick = (zone, countryName, code) => {
    return () => {
      chooseCountry(zone, countryName, code);
    }
  }

  // load initial secondary country
  useEffect(() => {
    (async () => {
      try {
        const secondaryCountry = []
        for(const item of secondaryTime) {
          const result = await timezoneApi.getTimeByTimezone(item.timezone, () => {});
          secondaryCountry.push({
            code: item.code, 
            timezone: item.timezone, 
            country: item.country, 
            hour: result.hour, 
            second: result.second,
            minute: result.minute 
          });
        }
        setSecondaryTime(secondaryCountry);
        setIsPendingSecondary(false);
      } catch(err) {
        console.log(err.message);
        alert('There is an error')
      }
    })()
  }, [])

  return (
    <div className="flex flex-wrap justify-center">
      {isPendingSecondary ? (
        <> 
          {[1, 2, 3, 4].map((el, ind) => {
            return (
              <div className="items-center bg-[#C3E7FF] dark:bg-[#36596D] w-[80px] h-[36px] rounded-md m-2 sm:m-3" key={ind}></div>
            )
          })}
        </>
      ) : (
        <>
          {secondaryTime.map((el, ind) => (
            <div key={ind} onClick={handleClick(el.timezone, el.country, el.code)}>
              <Item item={el} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default memo(TimeSecondary)