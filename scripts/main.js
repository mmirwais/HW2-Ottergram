var DETAIL_IMAGE_SELECTOR = '[data-image-role=\"target\"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var LEFT = '[data-image-role="previous"]';
var RIGHT = '[data-image-role="next"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var preButton = document.querySelector("#previous-button");
var nextButton = document.querySelector("#next-button");
var currentIndex = 0;
var thumbLength; 

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
  }

function imageFromThumb(thumbnail) {
    'use strict';
     return thumbnail.getAttribute('data-image-url');
    }

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
    }
    
    function setDetailsFromThumb(thumbnail) {
        'use strict';
        setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
      }

      function addThumbClickHandler(thumb) {
        'use strict';
        thumb.addEventListener('click', function(event) {
            event.preventDefault();
            setDetailsFromThumb(thumb);
            showDetails();
        });
    }
    
    function getThumbnailsArray() {
        'use strict';
        var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
        var thumbnailsArray = [].slice.call(thumbnails);
        return thumbnailsArray;
    }

    function hideDetails() {
        'use strict';
        document.body.classList.add(HIDDEN_DETAIL_CLASS);
      }

      function showDetails() {
        'use strict';
        var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
        document.body.classList.remove(HIDDEN_DETAIL_CLASS);
        frame.classList.add(TINY_EFFECT_CLASS);
        setTimeout(function () {
            frame.classList.remove(TINY_EFFECT_CLASS);
          }, 50);
      }
      

      function addKeyPressHandler() {
        'use strict';
        document.body.addEventListener('keyup', function (event) {
          event.preventDefault();
          console.log(event.keyCode);
          if (event.keyCode === ESC_KEY) {
            hideDetails();
          }
        });
      }
    
      function showDetails(){
        'use strict';
        document.body.classList.remove(HIDDEN_DETAIL_CLASS);
      }
      
      // cycle back through thumbnails
      function preButtonClick(thumbnails){
        'use strict';
        preButton.addEventListener("click", function(event){
          event.preventDefault();
          if(currentIndex === 0){
            currentIndex = thumbLength - 1;
          }
          else {
            currentIndex--;
          }
          setDetailsFromThumb(thumbnails[currentIndex]);
        });
      }
      
     
      function nextButtonClick(thumbnails){
        'use strict';
        nextButton.addEventListener("click", function(event){
          event.preventDefault();
          if(currentIndex === thumbLength - 1){
            currentIndex = 0;
          }
          else {
            currentIndex++;
          }
          setDetailsFromThumb(thumbnails[currentIndex]);
        });
      }
      
      function initializeEvents() {
        'use strict';
        var thumbnails = getThumbnailsArray();
        thumbLength = thumbnails.length; 
        thumbnails.forEach(addThumbClickHandler); 
        addKeyPressHandler();
        preButtonClick(thumbnails);
        nextButtonClick(thumbnails);
      }
      
      initializeEvents();