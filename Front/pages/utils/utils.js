//split the number into thousands
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}