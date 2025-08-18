import React, { memo, useEffect, useRef } from 'react';
import Head from './Head';
import TimeMain from './TimeMain';
import TimeSecondary from './TimeSecondary';
import MoreCountryButton from './MoreCountryButton';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { useMainContext } from '../context/mainContext';

const Container = () => {
    const {mode, setInputElement, setMainTimeElement} = useMainContext();
    const inputElement = useRef(null);
    const mainTimeElement = useRef(null);

    useEffect(() => {
        setInputElement(inputElement);
        setMainTimeElement(mainTimeElement);
    }, [])

    return (
        <main className={`${mode}`}>
            <div className={`bg-light dark:bg-dark bg-cover bg-center font-karla`}>
                <div className="w-full h-screen flex flex-col items-center justify-between text-primary-dark dark:text-primary py-7 px-4 sm:py-10 sm:px-16">
                    <Head />
                    <div ref={mainTimeElement} className="w-full space-y-7">
                        <TimeMain />
                        <TimeSecondary />
                    </div>
                    <MoreCountryButton />
                </div>
                <div className="min-h-[100vh] text-center text-primary-light dark:text-primary flex flex-col justify-between">
                    <div ref={inputElement} className="pt-16 space-y-10">
                        <SearchInput />
                        <SearchResult />
                    </div>
                    <footer className="capitalize text-xs py-6 sm:text-sm">&copy; 2023 luji ramdhan</footer>
                </div>
            </div>
        </main>
    );
};

export default memo(Container);