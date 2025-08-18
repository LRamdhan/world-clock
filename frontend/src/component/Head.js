import { memo } from "react";
import logoDark from "./../img/logoDark.svg";
import logoLight from "./../img/logoLight.svg";
import toggleDark from "./../img/toggleDark.svg";
import toggleLight from "./../img/toggleLight.svg";
import { useMainContext } from "../context/mainContext";

const Head = () => {
  const {mode, setMode} = useMainContext()

  const Switchmode = () => {
    setMode(!mode ? 'dark' : '')
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1136px] max-auto flex justify-between w-full">
        <img className="w-[187px] dark:hidden" src={logoLight} alt="logo" />
        <img className="w-[187px] hidden dark:block" src={logoDark} alt="logo" />
        <div className="w-max h-max cursor-pointer" onClick={Switchmode}>
            <img className="w-8 dark:hidden" src={toggleLight} alt="toggle"/>
            <img className="w-8 hidden dark:block" src={toggleDark} alt="toggle"/>
        </div>
      </div>
    </div>
  )
}

export default memo(Head)