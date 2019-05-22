// When the search template is loaded, set dates from 1 day ago to today.

let year, year2, month, month2, day, day2;
let yearVal, year2Val, monthVal, month2Val, dayVal, day2Val;
        
year = document.getElementById("year");
year2 = document.getElementById("year2");
month = document.getElementById("month");
month2 = document.getElementById("month2");
day = document.getElementById("day");
day2 = document.getElementById("day2");


const setMonthSelected = () => { 
    //const month = document.getElementById("month"); 
    for ( let i = 0; i < month.options.length; i++){ 
        if ( month.options[i].value == new Date().getMonth() + 1 ) { 
            month.options[i].selected = true; 
        }  
    } 
}; 

setMonthSelected();
    

const setDaySelected = () => {  
    //const day = document.getElementById("day"); 
    for ( let i = 0; i < day.options.length; i++){ 
        if ( day.options[i].value == new Date().getDate() - 1) { 
            day.options[i].selected = true; 
        }  
    }  
}; 
setDaySelected();

const setMonth2Selected = () => { 
    //const month2 = document.getElementById("month2"); 
    for ( let i = 0; i < month2.options.length; i++){ 
        if ( month2.options[i].value == new Date().getMonth() + 1 ) { 
            month2.options[i].selected = true; 
        }  
    }  
};
setMonth2Selected();

const setDay2Selected = () => { 
    //const day2 = document.getElementById("day2"); 
    for ( let i = 0; i < day2.options.length; i++){ 
        if ( day2.options[i].value == new Date().getDate() ) { 
            day2.options[i].selected = true; 
        } 
    } 
};
setDay2Selected();