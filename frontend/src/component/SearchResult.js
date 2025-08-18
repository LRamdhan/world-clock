import { memo } from "react"
import { useCountryResultContext } from "../context/countryResultContext"
import { useChooseCountry } from "../hook/time.hook"

const SearchResult = () => {
  const {countryResult} = useCountryResultContext()
  const chooseCountry = useChooseCountry()

  const handleChooseCountry = (zone, countryName, code) => {
    return () => {
      chooseCountry(zone, countryName, code)
    }
  }

  return (
    <div className="px-2 flex flex-wrap justify-center items-baseline capitalize space-x-3 space-y-2 md:space-x-10 md:space-y-10 md:max-w-[1100px] md:mx-auto">
      <span className="hidden country country-regular"></span>
      <span className="hidden country country-large-bold"></span>
      <span className="hidden country country-large"></span>
      <span className="hidden country country-bold"></span>
        {countryResult.map((el, ind) => 
          <span className={`country country-regular cursor-pointer`} key={ind} onClick={handleChooseCountry(el.zone, el.country_name, el.country_code)}>{el.country_name}</span>
        )}
    </div>
  )
}

export default memo(SearchResult)