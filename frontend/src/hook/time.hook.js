import timezoneApi from "../api/timezoneApi"
import { useCountryResultContext } from "../context/countryResultContext"
import { useMainContext } from "../context/mainContext"

export const useChooseCountry = () => {
  const {setCountryResult, setKeyword} = useCountryResultContext()
  const {setMainTime, mainTimeElement, setIsPending, secondaryTime, setSecondaryTime, mainTime, setIsPendingSecondary} = useMainContext()

  return (zone, countryName, code) => {
    // scroll up
    mainTimeElement.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });

    // main country
    (async () => {
      try {
        // show loading ui
        setIsPending(true)

        // request time
        const result = await timezoneApi.getTimeByTimezone(zone, () => {
          // when success
          setIsPending(false);
        });

        // update main context
        setMainTime({
          city: result.city,
          country: countryName,
          hour: result.hour,
          minute: result.minute,
          second: result.second,
          ampm: result.ampm,
          date: result.date,
          code,
          timezone: zone
        })

        // reset search
        setKeyword('')
        setCountryResult([])
      } catch(err) {
        alert('There is an error')
      }
    })();

    // secondary country
    (async () => {
      try {
        setIsPendingSecondary(true)

        // parse new list
        let secondary = [...secondaryTime]
        const isExistsInList = secondary.find(e => e.timezone === zone)
        const isExistInMain = mainTime.timezone === zone

        if(!isExistInMain) {
          if(isExistsInList) {
            secondary = secondary.filter(e => e.timezone !== zone)
          } else {
            secondary.pop()
          }
          secondary.unshift({
            code: mainTime.code, 
            timezone: mainTime.timezone, 
            country: mainTime.country, 
            hour: mainTime.hour, 
            minute: mainTime.minute, 
            second: mainTime.second
          })
        }

        // get time of list
        const updatedSecondary = []
        for(const item of secondary) {
          const result = await timezoneApi.getTimeByTimezone(item.timezone, () => {});
          updatedSecondary.push({
            code: item.code, 
            timezone: item.timezone, 
            country: item.country, 
            hour: result.hour, 
            second: result.second,
            minute: result.minute 
          });
        }

        // update secondary state
        setSecondaryTime(updatedSecondary);
        setIsPendingSecondary(false);
      } catch(err) {
        console.log(err.message);
        alert('There is an error')
      }
    })();
  }
}