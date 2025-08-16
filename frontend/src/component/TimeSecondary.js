import { memo } from "react"
import { useMainContext } from "../context/mainContext"

const TimeSecondary = () => {
  const { secondaryTime } = useMainContext()

  const handleClick = () => {
    // () => request(ind)
  }

  return (
    <div className="flex flex-wrap justify-center">
      {secondaryTime.map((el, ind) => (
        <div className="main-country text-primary cursor-pointer active:scale-90 md:hover:-translate-y-[20%] transition-all duration-200" key={ind} onClick={handleClick}>
          <img className="h-5 sm:h-6" src={`https://flagsapi.com/${el.code}/flat/64.png`} alt={el.code} />
          <span className="font-bold sm:text-lg">{el.time}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(TimeSecondary)