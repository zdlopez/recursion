// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  var index = 1;
  var currentChar = json.charAt(0);
  var escapee = {
    '"':  '"',
    '\\': '\\',
    '/':  '/',
    b:    '\b',
    f:    '\f',
    n:    '\n',
    r:    '\r',
    t:    '\t'
  };

  var iterate = function(iterateChar){
  	if(iterateChar && iterateChar !== currentChar){
      throw SyntaxError();
  	}
  	currentChar = json.charAt(index);
  	index += 1;
  	return currentChar;
  };

  var whitespace = function(){
  	while (currentChar && currentChar <= ' ') {
  	  iterate();
    }
  };

  var object = function(){
  	var key;
  	var myobject = {};

  	if(currentChar === '{'){
  		iterate('{');
  		whitespace();
  		if(currentChar === '}'){
  			iterate('}');
  			return myobject;
  		}
  		while(currentChar){
  			key = parseItem();
  			whitespace();
  			iterate(':');
  			myobject[key] = parseItem();
  			whitespace();
  			if(currentChar === '}'){
  				iterate('}');
  				return myobject;
  			}
  			iterate(',');
  			whitespace();
  		}
  	}
  	throw SyntaxError();
  };

  var array = function (){
  	var myarray = [];
  	if(currentChar === '['){
  		iterate('[');
  		whitespace();
  		if(currentChar === ']'){
  			iterate(']');
  			return myarray;
  		}
  		while(currentChar){
  			myarray.push(parseItem());
  			whitespace();
  			if(currentChar === ']'){
  				iterate(']');
  				return myarray;
  			}
  			iterate(',');
  			whitespace();
  		}
  	}
  	throw SyntaxError();
  };

  var string = function(){
  	var mystring = "";

  	if(currentChar === '"'){
  		while(iterate()){
  			if(currentChar === '"'){
  				iterate('"');
  				return mystring;
  			}
        if(currentChar === '\\'){
          iterate();
          if(escapee.hasOwnProperty(currentChar)){
            mystring += escapee[currentChar];
          }
        } else {
          mystring += currentChar;
        }
  		}
  	}
  	throw SyntaxError();
  };

  var number = function(){
  	var mynumber = "";

  	if(currentChar === '-'){
  		iterate('-');
  		mynumber = '-'
  	}
  	while(currentChar >= '0' && currentChar <= '9'){
  		mynumber += currentChar;
  		iterate();
    }
  	if(currentChar === '.'){
  		mynumber += currentChar;
  		while(iterate() && currentChar >= '0' && currentChar <= '9'){
  			mynumber += currentChar;
  		}
  	}
  	return Number(mynumber);
  };

  var bool = function(){
  	switch (currentChar) {
    	case 't':
        	iterate('t');
            iterate('r');
            iterate('u');
            iterate('e');
            return true;
        case 'f':
            iterate('f');
            iterate('a');
            iterate('l');
            iterate('s');
            iterate('e');
            return false;
        case 'n':
            iterate('n');
            iterate('u');
            iterate('l');
            iterate('l');
            return null;
    }
    throw SyntaxError();
  };

  var parseItem = function(){
  	whitespace();
	  switch(currentChar){
  		case '{':
  			return object();
  		case '[':
  			return array();
  		case '"':
  			return string();
  		case '-':
  			return number();
  		default:
  			if (currentChar >= '0' && currentChar <= '9'){
  				return number();
  			} else {
  				return bool();
  			}
  	}
  };

  return parseItem();
};
