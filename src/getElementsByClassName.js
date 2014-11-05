// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var result = [];
  var body = document.body;

  var traverse = function(node){
  	if(node.classList){
  		if(node.classList.contains(className)){
  			result.push(node);
  		}
  		node = node.firstChild;
  		while(node){
  			traverse(node);
  			node = node.nextSibling;
  		}
	}
  };

  if(body){
  	traverse(body);
  	return result;
  } else {
  	return false;
  }
};
