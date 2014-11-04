// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';
  if(typeof obj === 'number'){
    result += obj;
  }
  if(typeof obj === 'boolean'){
    result += obj;
  }
  if(typeof obj === 'string'){
    result += '\"' + obj + '\"';
  }
  if(typeof obj === 'object'){
    if(Array.isArray(obj) === true){
      var arr = [];
      for(var i = 0; i<obj.length; i++){
        arr.push(stringifyJSON(obj[i]));
      }
      if(arr.length === 0){
        result += '[]';
      } else {
        result += '[' + arr + ']';
      }
    } else if(obj === null){
      result = 'null';
    } else {
      result += '{';
      for(var key in obj){
        if(!(key === 'functions' || key === 'undefined')){
          result += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
        }
      }
      if(result.length > 1){
        result = result.slice(0, -1);
      }
      result += '}';
    }


  }
  if (result === ''){
    result = 'null';
  }
  
  return result;

};
