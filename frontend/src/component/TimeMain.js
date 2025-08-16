import { memo, useEffect, useState } from "react"
import { useMainContext } from "../context/mainContext";

const twoDigit = (num) => {
  return num.toString().padStart(2, '0');
}

const HourMinuteSecond = memo(({secondProp, minuteProp, hourProp, ampm, setAmpm}) => {
  const [initialSecond, setInitialSecond] = useState(secondProp);
  const [second, setSecond] = useState(secondProp);

  const [initialMinute, setInitialMinute] = useState(minuteProp);
  const [minute, setMinute] = useState(minuteProp);

  const [initialHour, setInitialHour] = useState(hourProp);
  const [hour, setHour] = useState(hourProp);

  useEffect(() => {
    setTimeout(() => {
      // if main context change -> change this local state
      if((secondProp !== initialSecond) || (minuteProp !== initialMinute) || (hourProp !== initialHour)) {
          setSecond(secondProp);
          setInitialSecond(secondProp);

          setMinute(minuteProp);
          setInitialMinute(minuteProp);

          setHour(hourProp);
          setInitialHour(hourProp);
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
          setAmpm(ampm === 'AM' ? 'PM' : 'AM');
        } else if((tempMinute === 60) && (tempHour !== 12)) {
          setHour(hour + 1);
        }
      }
    }, 1000);
  }, [second, secondProp, minute, minuteProp, hour, hourProp]);

  return (
    <>
      {twoDigit(hour)}:{twoDigit(minute)}:{twoDigit(second)}
    </>
  )
})

const TimeMain = () => {
  const {mainTime} = useMainContext();
  const [ampm, setAmpm] = useState(mainTime.ampm);

  // when ampm change through main context
  useEffect(() => {
    setAmpm(mainTime.ampm);
  }, [mainTime])

  return (
    <div className="capitalize flex flex-col items-center mx-auto max-w-[326px] sm:max-w-[595px] md:max-w-[675px]">
      <p className="text-lg self-start sm:text-3xl">
        <span className="font-bold">{mainTime.city}, </span>
        {mainTime.country}
      </p>
      <p className="leading-none py-2.5">
        <span className="font-bold text-[69px] sm:text-[120px]">
          <HourMinuteSecond secondProp={mainTime.second} minuteProp={mainTime.minute} hourProp={mainTime.hour} ampm={ampm} setAmpm={setAmpm} />
        </span>
        <span className="text-4xl uppercase sm:text-6xl">{ampm}</span>
      </p>
      <p className="text-sm font-semibold self-end leading-none sm:text-2xl">{mainTime.date}</p>
    </div>
  )
}

export default memo(TimeMain)