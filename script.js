// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function saveTxt(event) {
    // prevent event bubbling
    event.stopPropagation();
    // create variable to store event parent id name
    var thisParent = $(this).parent().attr('id');
    // create variable to get text content from the textarea 
    // sibling of the event target
    var txt = $(this).siblings('textarea').get(0).value.trim();
    // saves text for the current target in local stoarge
    localStorage.setItem(thisParent + ' text', txt);
    // console.log for debugging purposes
    console.log(thisParent + ' save button clicked');
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function applyColor () {
    // create variable to reference the current hour of the current day
    var currentTime = dayjs().format('H');
    console.log('the current hour is: ' + currentTime);
    // create variable to reference all of the divs in the main section of the html
    var hourDivs = $('.main-container').children('div');
    
    // var currentTime = 10
    // create for loop and set i to 9
    // conditional statement defined as i is less than 18 because our scheduler goes up to the 17th hour, so the loop will stop when i = 19
    // add 1 to i every iteration
    // hourDivs are targeted with i-9 to start at the index of zero
    console.log('temporary current time ' + currentTime)
    for (var i = 9; i < 18; i ++) {
      console.log('index: ' + (i-9) + ' for time: ' + i)
      if (currentTime == i) {
        hourDivs.eq(i-9).addClass('present');
      } else if (currentTime > i) {
        hourDivs.eq(i-9).addClass('past');
      } else {
        hourDivs.eq(i-9).addClass('future');
      }
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function displaySavedData () {
    // returns an array of div elements
    var hourDivs = $('.main-container').children('div');
    console.log(hourDivs);
    // iterate through each div element
    hourDivs.each(function() {
      // get each div element's id attribute
      var eachDiv = $(this).attr('id')
      console.log(eachDiv);
      // get values saved in local storage using (this) id tag 
      // plus the string ' text' to identify the key
      var eachSavedData = localStorage.getItem(eachDiv + ' text')
      console.log(eachSavedData);

      var textareaEl = $(this).children('textarea')
      textareaEl.text(eachSavedData);
    })

  }
  // TODO: Add code to display the current date in the header of the page.
  function showDateTime () {
    var showDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(showDate);

    var showTime = dayjs().format('h : mm A');
    $('#currentTime').text(showTime);
  }

  showDateTime();
  applyColor();
  displaySavedData();
  $('.saveBtn').on('click', saveTxt);
});
