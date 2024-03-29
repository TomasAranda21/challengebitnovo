import React, { useState, useEffect } from 'react';
import { format, differenceInSeconds, parseISO, addSeconds, subSeconds } from 'date-fns';
import Image from 'next/image';
import { CountdownTimerProps } from '@/app/lib/interfaces/componentsInterfaces';
import { getOrdersId } from '@/app/lib/services/ApiServices';


const CountdownTimer = ({ targetDate, setIsTimeOut }: CountdownTimerProps) => {
    const [remainingTime, setRemainingTime] = useState(differenceInSeconds(parseISO(targetDate), new Date()));

    useEffect(() => {
        const intervalId = setInterval(async () => {
            setRemainingTime(prevTime => {
                if (prevTime < 1) {
                    clearInterval(intervalId);
                    setIsTimeOut(true)
                    console.log('¡Se acabó el tiempo!');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <div className='flex items-center gap-2'>
            <Image src='/timer.svg' width={24} height={24} alt="timer" />
            <p>{format(remainingTime * 1000, 'mm:ss')}</p>
        </div>
    );
};

export default CountdownTimer;