const SecondaryTime = () => {
  const mainTime = [
    { code: 'ID', time: 'Indonesia' },
    { code: 'SG', time: 'Singapore' },
    { code: 'MY', time: 'Malaysia' },
    { code: 'TH', time: 'Thailand' },
  ]

  const handleClick = () => {
    // () => request(ind)
  }

  return (
    <div className="flex flex-wrap justify-center">
      {mainTime.map((el, ind) => (
        <div className="main-country text-primary cursor-pointer active:scale-90 md:hover:-translate-y-[20%] transition-all duration-200" key={ind} onClick={handleClick}>
          <img className="h-5 sm:h-6" src={`https://flagsapi.com/${el.code}/flat/64.png`} alt={el.code} />
          <span className="font-bold sm:text-lg">{el.time}</span>
        </div>
      ))}
    </div>
  )
}

export default SecondaryTime