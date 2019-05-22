
    // Automatically calculate price * amount on keyup events
    
    let price_input = document.getElementById("price"),
        amount_input = document.getElementById("amount"),
        total_price_input = document.getElementById("total_price");
    
    
    price_input.onkeyup = function (){
        if( isNaN(total_price_input.value) ){
            total_price_input.value = 0;
        }
        
        if(parseInt(price_input.value) != "" || parseInt(amount_input.value) != "") {
        
        total_price_input.value = 
            ( parseInt(this.value) ? parseInt(this.value) : 0 ) * 
            ( parseInt(amount_input.value) ?  parseInt(amount_input.value) : 0);
        } 
    
    }
    
    amount_input.onkeyup = function (){
        if( isNaN(total_price_input.value) ){
            total_price_input.value = 0;
        }
        
        if(parseInt(price_input.value) != "" || parseInt(amount_input.value) != "") {
            
        total_price_input.value = 
            ( parseInt(this.value) ? parseInt(this.value) : 0)  * 
            (parseInt(price_input.value) ?  parseInt(price_input.value) : 0);
        } 
    
    }

