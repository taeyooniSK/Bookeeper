
    // Automatically calculate price * amount on keyup events
    
    let price_input = document.getElementById("price"),
        amount_input = document.getElementById("amount"),
        total_price_input = document.getElementById("total_price");
    
    
    price_input.onkeyup = function (){
        let parsedValue = parseInt(price_input.value);

        if ( parsedValue < 0 ){
            alert("Enter numbers which are larger than 0");
        }
        
        if( isNaN(total_price_input.value) ){
            total_price_input.value = 0;
        }
        
         // whenever whenever value of price or amount gets typed into inputs, make the values calculated & show it in total_price_input
        if(parseInt(price_input.value) != "" || parseInt(amount_input.value) != "") {
        
            total_price_input.value = 
                ( parseInt(this.value) ? parseInt(this.value) : 0 ) * 
                ( parseInt(amount_input.value) ?  parseInt(amount_input.value) : 0);
            } 
    
    }
    
    amount_input.onkeyup = function (){
        let parsedAmountValue = parseInt(amount_input);
        
         if ( parsedAmountValue < 0 ){
            alert("Enter numbers which are larger than 0");
        }

        if( isNaN(total_price_input.value) ){
            total_price_input.value = 0;
        }
        
        if(parseInt(price_input.value) != "" || parseInt(amount_input.value) != "") {
            
            total_price_input.value = 
                ( parseInt(this.value) ? parseInt(this.value) : 0)  * 
                (parseInt(price_input.value) ?  parseInt(price_input.value) : 0);
            } 
    
    }

