import { memo } from "react"

const MoreCountryButton = () => {
  const handleClick = () => {
    // scroll
  }

  return (
    <div className="flex flex-col justify-center items-center group">
      <h3 className="capitalize font-bold text-lg text-back dark:text-primary pb-4 md:pb-0 md:translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-y-1/2 transition-all">more countries</h3>
      <div className="aspect-square w-14 bg-back-light dark:bg-back rounded-full flex justify-center items-center cursor-pointer" onClick={handleClick}>
        <div className="aspect-square w-2/5 border-primary border-solid border-b-[3px] border-l-[3px] -rotate-45 -translate-y-1/4"></div>
      </div>
    </div>
  )
}

export default memo(MoreCountryButton)