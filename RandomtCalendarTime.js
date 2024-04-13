import {createContext, 
    useContext,useState} from 'react';

const CalendarTimeContext = createContext();
export const useCalendarTime = () => useContext(CalendarTimeContext);

export const CalendarTimeProvider = ({ children }) => {
    
    const [randomTime, setRandomTime] = useState( getRandomCalendarTime());

    const updateRandomTime = () =>{
      const randomTime = getRandomCalendarTime();
      setRandomTime(randomTime);
    };

    return (
      <CalendarTimeContext.Provider
      value={{ randomTime, setRandomTime ,updateRandomTime}}
      >
        {children}  
      </CalendarTimeContext.Provider>
    );
    
  }
  export function getMonth(date) {
    return parseInt(date.split(':')[1], 10)
  }
class CalendarTime {
    constructor(day, month, year) {
      this.day = day;
      this.month = month;
      this.year = year;
    }
  
    
    getString(){
        return `${this.day}:${this.month}:${this.year}`;
    }
  }


export function getRandomCalendarTime() {
    const randomDay = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31
    const randomMonth = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
    //const randomYear = Math.floor(Math.random() * (new Date().getFullYear() - 2000 + 1)) + 2000; 
    const randomYear =2024; 
    return new CalendarTime(randomDay, randomMonth, randomYear);
  }


