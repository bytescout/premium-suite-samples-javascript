## How to display PDF in browser and select area using PDF in JavaScript with ByteScout Premium Suite

### Learning is essential in computer world and the tutorial below will demonstrate how to display PDF in browser and select area using PDF in JavaScript

An easy to understand sample source code to learn how to display PDF in browser and select area using PDF in JavaScript What is ByteScout Premium Suite? It is the set that includes 12 SDK products from ByteScout including tools and components for PDF, barcodes, spreadsheets, screen video recording. It can help you to display PDF in browser and select area using PDF in your JavaScript application.

The following code snippet for ByteScout Premium Suite works best when you need to quickly display PDF in browser and select area using PDF in your JavaScript application. IF you want to implement the functionality, just copy and paste this code for JavaScript below into your code editor with your app, compile and run your application. This basic programming language sample code for JavaScript will do the whole work for you to display PDF in browser and select area using PDF.

You can download free trial version of ByteScout Premium Suite from our website with this and other source code samples for JavaScript.

## REQUEST FREE TECH SUPPORT

[Click here to get in touch](https://bytescout.zendesk.com/hc/en-us/requests/new?subject=ByteScout%20Premium%20Suite%20Question)

or just send email to [support@bytescout.com](mailto:support@bytescout.com?subject=ByteScout%20Premium%20Suite%20Question) 

## ON-PREMISE OFFLINE SDK 

[Get Your 60 Day Free Trial](https://bytescout.com/download/web-installer?utm_source=github-readme)
[Explore SDK Docs](https://bytescout.com/documentation/index.html?utm_source=github-readme)
[Sign Up For Online Training](https://academy.bytescout.com/)


## ON-DEMAND REST WEB API

[Get your API key](https://pdf.co/documentation/api?utm_source=github-readme)
[Explore Web API Documentation](https://pdf.co/documentation/api?utm_source=github-readme)
[Explore Web API Samples](https://github.com/bytescout/ByteScout-SDK-SourceCode/tree/master/PDF.co%20Web%20API)

## VIDEO REVIEW

[https://www.youtube.com/watch?v=NEwNs2b9YN8](https://www.youtube.com/watch?v=NEwNs2b9YN8)




<!-- code block begin -->

##### ****code.js:**
    
```
// PDF file to display:
var url = 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf';
// Note: if absolute URL from the remote server is provided, 
// you should configure the CORS header on your server.

// The workerSrc property should be specified
PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.97/pdf.worker.js';

var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1,
  canvas = document.getElementById('the-canvas'),
  ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    var viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait until the end of the rendering
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, wait until it finished; 
 * otherwise, execute the rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  displayCoordinates();
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  displayCoordinates();
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Download PDF asynchronously.
 */
PDFJS.getDocument(url).then(function (pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});


// Area selector
var startX,
  startY,
  selectedBoxes = [],
  $selectionMarquee = $('#selectionMarquee'),
  clearSelectedAreasBtn = $('#clearSelectedAreasBtn'),
  wrapper = $("#canvas-wrap"),
  wrapperObj = wrapper[0],
  $allCords = $('#all-cords'),
  positionBox = function ($box, coordinates) {
    $box.css(
      'top', coordinates.top + wrapperObj.offsetTop
    ).css(
      'left', coordinates.left + wrapperObj.offsetLeft
      ).css(
      'height', coordinates.bottom - coordinates.top
      ).css(
      'width', coordinates.right - coordinates.left
      ).css(
      'border', 'solid grey 1px'
      );
  },

  compareNumbers = function (a, b) {
    return a - b;
  },

  getBoxCoordinates = function (startX, startY, endX, endY) {
    var x = [startX, endX].sort(compareNumbers),
      y = [startY, endY].sort(compareNumbers);

    return {
      top: y[0],
      left: x[0],
      right: x[1],
      bottom: y[1]
    };
  },

  trackMouse = function (event) {
    var position = getBoxCoordinates(startX, startY, event.pageX - wrapperObj.offsetLeft, event.pageY - wrapperObj.offsetTop);
    console.log(position);
    positionBox($selectionMarquee, position);
  },

  displayCoordinates = function () {
    var msg = 'Areas:\n';
    if (!selectedBoxes.length) {
      $allCords.html('');
      return;
    }
    selectedBoxes.forEach(function (box) {
      msg += '<li>(' + box.left + ', ' + box.top + ') - (' + (box.right) + ', ' + (box.bottom) + ')</li>';
    });
    $allCords.html(msg);
  },
  
  endMoving = function (event) {
    var position,
      $selectedBox;

    $selectionMarquee.hide();

    position = getBoxCoordinates(startX, startY, event.pageX - wrapperObj.offsetLeft, event.pageY - wrapperObj.offsetTop);

    if (position.left !== position.right && position.top !== position.bottom) {
      $selectedBox = $('<div class="selected-box selected-box-item"></div>');
      $selectedBox.hide();
      wrapper.append($selectedBox);

      positionBox($selectedBox, position, wrapper[0]);

      $selectedBox.show();

      selectedBoxes.push(position);
      displayCoordinates();

      wrapper.off('mousemove', trackMouse);
      $selectionMarquee.off('mousemove', trackMouse);
      $selectionMarquee.off('mouseup', endMoving);
    }
  };

wrapper.on('mousedown', function (event) {
  event.preventDefault();
  startX = event.pageX - wrapperObj.offsetLeft;
  startY = event.pageY - wrapperObj.offsetTop;
  positionBox($selectionMarquee, getBoxCoordinates(startX, startY, startX, startY), this);
  $selectionMarquee.show();

  wrapper.on('mousemove', trackMouse);
  $selectionMarquee.on('mousemove', trackMouse);
  $selectionMarquee.on('mouseup', endMoving);
}).on('mouseup', endMoving);

clearSelectedAreasBtn.on('click', function(event){
  selectedBoxes = [];
  $('.selected-box-item').remove();
  displayCoordinates();
});
```

<!-- code block end -->