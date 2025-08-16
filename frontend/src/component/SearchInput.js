import { memo } from "react"

const SearchInput = () => {
  const handleKeyUp = (e) => {
    // search
  }

  const handleInput = e => {
    // setInputValue
  }

  const handleSubmit = e=> {
    e.preventDefault()
    // search
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input className="bg-transparent outline-none text-primary-light dark:text-primary placeholder:text-back-light dark:placeholder:text-primary text-center border-b-[3px] border-back dark:border-back-light pb-2 w-64" placeholder="Search Country" type="text" onInput={handleInput} onKeyUp={handleKeyUp} />
    </form>

  )
}

export default memo(SearchInput)