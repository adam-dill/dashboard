/* eslint-disable */
Array.prototype.shuffle = function() {
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

Array.prototype.chunk = function(size) {
	const returnValue = [];
    for (let i = 0; i < this.length; i += size) {
        const chunk = returnValue.slice(i, i + size);
        returnValue.push(chunk);
    }
    return returnValue;
}

Number.prototype.nth= function(){
    if(this%1) return this;
    var s= this%100;
    if(s>3 && s<21) return this+'th';
    switch(s%10){
        case 1: return this+'st';
        case 2: return this+'nd';
        case 3: return this+'rd';
        default: return this+'th';
    }
}
/* eslint-enable */