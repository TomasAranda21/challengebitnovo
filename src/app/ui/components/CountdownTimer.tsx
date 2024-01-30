import React, { useState, useEffect } from 'react';
import { format, differenceInSeconds, parseISO, addSeconds, subSeconds } from 'date-fns';
import Image from 'next/image';
import { CountdownTimerProps } from '@/app/lib/interfaces/componentsInterfaces';


const CountdownTimer = ({ targetDate, refresh }: CountdownTimerProps) => {
    const [remainingTime, setRemainingTime] = useState(differenceInSeconds(parseISO(targetDate), new Date()));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    console.log('¡Se acabó el tiempo!');
                    refresh(true)
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = format(remainingTime * 1000, 'mm:ss');
    return (
        <div className='flex items-center gap-2'>
            <Image src='/timer.svg' width={24} height={24} alt="timer" />
            <p>{formattedTime}</p>
        </div>
    );
};

export default CountdownTimer;