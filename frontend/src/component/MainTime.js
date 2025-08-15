const MainTime = () => {

  return (
    <div className="capitalize flex flex-col items-center mx-auto max-w-[326px] sm:max-w-[595px] md:max-w-[675px]">
      <p className="text-lg self-start sm:text-3xl">
        <span className="font-bold">{'oke'}, </span>
        {'ok'}
      </p>
      <p className="leading-none py-2.5">
        <span className="font-bold text-[69px] sm:text-[120px]">{23}:{53}:{23}</span>
        <span className="text-4xl uppercase sm:text-6xl">{'AM'}</span>
      </p>
      <p className="text-sm font-semibold self-end leading-none sm:text-2xl">{'237 mae 2023'}</p>
    </div>
  )
}

export default MainTime