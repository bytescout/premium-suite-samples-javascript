## How to use html formatting and links for pdf with pdf generator sdk for javascript in JavaScript with ByteScout Premium Suite

### Learn to code in JavaScript to use html formatting and links for pdf with pdf generator sdk for javascript with this step-by-step tutorial

Sample source code below will display you how to manage a complex task like use html formatting and links for pdf with pdf generator sdk for javascript in JavaScript. ByteScout Premium Suite: the set that includes 12 SDK products from ByteScout including tools and components for PDF, barcodes, spreadsheets, screen video recording. It can use html formatting and links for pdf with pdf generator sdk for javascript in JavaScript.

Want to save time? You will save a lot of time on writing and testing code as you may just take the JavaScript code from ByteScout Premium Suite for use html formatting and links for pdf with pdf generator sdk for javascript below and use it in your application.  Simply copy and paste in your JavaScript project or application you and then run your app! Enjoy writing a code with ready-to-use sample JavaScript codes.

Our website gives trial version of ByteScout Premium Suite for free. It also includes documentation and source code samples.

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

##### ****checkdatauri.js:**
    
```
	// checks if we have datauri support in current browser
        // if we have support for datauri support then we can stream generated PDF right into the browser
        // otherwise we should use Downloadify script to allow user to save PDF file
	function CheckDataURISupport(){

	var result = true;
	var checkDataURISupportImage = new Image();

	checkDataURISupportImage.onload = checkDataURISupportImage.onerror = function(){
		if(this.width != 1 || this.height != 1){
			result = false;
		}
	}
	checkDataURISupportImage.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
	// check if we have datauri support in current browser - end

		return result;
	}


```

<!-- code block end -->    

<!-- code block begin -->

##### ****createpdf.js:**
    
```
// function that creates BytescoutPDF instance (defined in BytescoutPDF.js script which have to be included into the same page)
// then calls API methods and properties to create PDF document
// and returns created BytescoutPDF object instance
// this CreatePDF() function is called from Sample.html
// IsInternetExplorer8OrLower parameter indicates if we use IE8 or lower so we CAN'T use images (as it requires HTML5 Canvas available in IE9 or higher). Other browsers should be working fine

// IMPORTANT ABOUT IMAGES: 
// When using Firefox or IE, pdf generation may fail because images are not accessible when pdf generation works
// the solution for this issue is to preload images in main HTML document before running PDF generation
// to preload images, put them into hidden div block "pdfreportimages" - you can see it in the sample.html right after <body> opening tag


function CreatePDF(IsInternetExplorer8OrLower) {

    // create BytescoutPDF object instance
    var pdf = new BytescoutPDF();
    // set document properties: Title, subject, keywords, author name and creator name
    pdf.propertiesSet("Sample document title", "Sample subject", "keyword1, keyword 2, keyword3", "Document Author Name", "Document Creator Name");
    
    // add 1st page
    pdf.pageAdd();
    // add page header with anchor
    pdf.textAdd(10, 20, '<a name="#page1"/><font face="Courier" size="15" color="#00ff00"><b><i>Page 1</i></b></font>', 0);
    // add link to page 2 by anchor
    pdf.textAdd(10, 50,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#page2">link to page #2 by anchor</a></font></u>', 0);
    // add link to page 3 by page number and offset ("#3#10")
    pdf.textAdd(10, 70,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#3#10">link to page #3 by page number and offset</a></font></u>', 0);
    
    // add 2nd page
    pdf.pageAdd();
    // add page header with anchor
    pdf.textAdd(10, 20, '<a name="#page2"/><font face="Courier" size="15" color="#00ff00"><b><i>Page 2</i></b></font>', 0);
    // add link to page 1 by anchor
    pdf.textAdd(10, 50,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#page1">link to page #1 by anchor</a></font></u>', 0);
    // add link to page 3 by page number and offset
    pdf.textAdd(10, 70,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#3#0">link to page #3 by page number and offset</a></font></u>', 0);
    
    // add 3nd page
    pdf.pageAdd();
    // add page header
    pdf.textAdd(10, 20, '<font face="Courier" size="15" color="#00ff00"><b><i>Page 3</i></b></font>', 0);
    // add link to page 1 by anchor
    pdf.textAdd(10, 50,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#page1">link to page #1 by anchor</a></font></u>', 0);
    // add link to page 2 by page number and offset
    pdf.textAdd(10, 70,'<u><font face="Helvetica" size="12" color="#0000ff"><a href="#2#0">link to page #2 by page number and offset</a></font></u>', 0);
    
    // add an external link
    pdf.pageSetIndex(1); // return back to the first page
    pdf.textAdd(100, 300, "link to www.google.com");
	pdf.addLink(100, 280, 200, 30, 'http://www.google.com');
	
    // return BytescoutPDF object instance
    return pdf;
}


```

<!-- code block end -->