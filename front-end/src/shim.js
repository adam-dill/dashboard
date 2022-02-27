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
/* eslint-enable */