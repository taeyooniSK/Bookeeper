// When the search template is loaded, set dates from 1 day ago to today.

let year, year2, month, month2, day, day2;
        
year = document.getElementById("year");
year2 = document.getElementById("year2");
month = document.getElementById("month");
month2 = document.getElementById("month2");
day = document.getElementById("day");
day2 = document.getElementById("day2");

function setTimeForMonth(variable, num = 0){
    for ( let i = 0; i < variable.options.length; i++){ 
        if ( variable.options[i].value == new Date().getMonth() + num ) { 
            variable.options[i].selected = true; 
        }
    } 
}
function setTimeForDay(variable, num = 0){
    for ( let i = 0; i < variable.options.length; i++){ 
        if ( variable.options[i].value == new Date().getDate() - num) { 
            variable.options[i].selected = true; 
        }  
    }  
}


const setMonthSelected = () => { 
    setTimeForMonth(month, 1);
}; 
setMonthSelected();
    

const setDaySelected = () => {  
    setTimeForDay(day, 1);
}; 
setDaySelected();

const setMonth2Selected = () => { 
    setTimeForMonth( month2, 1);
};
setMonth2Selected();

const setDay2Selected = () => { 
    setTimeForDay(day2);
};
setDay2Selected();