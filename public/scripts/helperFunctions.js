exports.yyyymmdd = function (){
    return Date.prototype.yyyymmdd = function (){
        const yyyy = this.getFullYear(); 
        const mm = this.getMonth() + 1; // getMonth() is 0 based
        const dd = this.getDate();
    
        return [yyyy, (mm > 9 ? "" : "0" ) + mm, (dd > 9 ? "" : "0" ) + dd].join("-");
    };
}
exports.trim = function (body){
	for (let prop in body){
        body[prop] = body[prop].trim();
	}
	return body;
};

