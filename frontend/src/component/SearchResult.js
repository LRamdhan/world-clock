import { memo } from "react"

const SearchResult = () => {

  return (
    <div className="px-2 flex flex-wrap justify-center items-baseline capitalize space-x-3 space-y-2 md:space-x-10 md:space-y-10 md:max-w-[1100px] md:mx-auto">
      <span className="hidden country country-regular"></span>
      <span className="hidden country country-large-bold"></span>
      <span className="hidden country country-large"></span>
      <span className="hidden country country-bold"></span>
        {/* {searchedCountry.map((el, ind) => 
            <span className={`country country-${el.style} cursor-pointer`} key={ind} onClick={() => updateMainCountry(ind)}>{el.country_name}</span>
        )} */}
    </div>
  )
}

export default memo(SearchResult)