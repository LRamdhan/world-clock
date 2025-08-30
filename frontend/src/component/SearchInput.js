import { memo } from "react"
import timezoneApi from "../api/timezoneApi"
import { useCountryResultContext } from "../context/countryResultContext"

const SearchInput = () => {
  const { setCountryResult, keyword, setKeyword } = useCountryResultContext()

  const searchCountry = async (keyword) => {
    try {
      // just to handle infinityfree database limittation
      keyword = keyword.trim()
      if(keyword.length <= 1) return

      const result = await timezoneApi.getTimezoneByCountry(keyword);
      setCountryResult(result);
    } catch(err) {
      alert('There is an error')
    }
  }

  const handleInput = e => {
    setKeyword(e.target.value);
    searchCountry(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    searchCountry(keyword)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="flex justify-center pb-2 px-3 mx-auto max-w-[320px] border-b-[3px] border-back dark:border-back-light">
        <input className="w-full text-center bg-transparent outline-none text-primary-light dark:text-primary placeholder:text-back-light dark:placeholder:text-primary" placeholder="Search Country" type="text" value={keyword} onInput={handleInput} />
      </div>
    </form>
  )
}

export default memo(SearchInput)