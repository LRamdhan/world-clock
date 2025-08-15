import logoDark from "./../img/logoDark.svg";
import logoLight from "./../img/logoLight.svg";
import toggleDark from "./../img/toggleDark.svg";
import toggleLight from "./../img/toggleLight.svg";

const Head = () => {
  const handleClick = e => {
    // () => switchMode
  }

  return (
    <div className="flex justify-between w-full">
      <img className="w-[187px] dark:hidden" src={logoLight} alt="logo" />
      <img className="w-[187px] hidden dark:block" src={logoDark} alt="logo" />
      <div className="w-max h-max cursor-pointer" onClick={handleClick}>
          <img className="w-8 dark:hidden" src={toggleLight} alt="toggle"/>
          <img className="w-8 hidden dark:block" src={toggleDark} alt="toggle"/>
      </div>
    </div>
  )
}

export default Head