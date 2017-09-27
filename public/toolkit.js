/*

function setup(){
  //loads route of all an all the entries of the DB. funktioniert sowohl mit relativen als auch absoluten pfad. braucht also nicht explizit den slash.
  loadJSON('/all', gotData);
  console.log('running');

  // access the submit button
  var button = select('#submit');
  button.mousePressed(submitWord);

  // access the  analyze button
  var buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);
}

function submitWord(){

  // value function gives the content of whats in these input fields
  var word = select('#word').value();
  var score = select('#score').value();
  console.log(word,score);

  // loads the input values to the database. normally you need the post method to send something
  loadJSON('add/' + word + "/" + score);

  function finished(data){
    console.log(data);
  }
}

function analyzeThis(){
  var txt = select('#textinput').value();

  var data = {
    text: txt
  }
  // post request via the httpPost Function in p5js. it needs to send a whole object.
  httpPost('analyze/', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
  console.log(result);
}

function postErr(err) {
  console.log(err);
}


function gotData(data){
  console.log(data);
  //um einfacher durch das objekt zu iterieren kann man es als array ausgeben das nur die keys des objects ausgibt.
  var keys = Object.keys(data);
  // for (var i = 0; i < keys.length; i++){
  //   var word = keys[i];
  //   var score = data[word];
  // }
  console.log(keys);
}

*/
