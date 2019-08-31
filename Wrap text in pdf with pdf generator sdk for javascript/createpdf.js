//*******************************************************************************************//
//                                                                                           //
// Download Free Evaluation Version From: https://bytescout.com/download/web-installer       //
//                                                                                           //
// Also available as Web API! Get Your Free API Key: https://app.pdf.co/signup               //
//                                                                                           //
// Copyright © 2017-2019 ByteScout, Inc. All rights reserved.                                //
// https://www.bytescout.com                                                                 //
// https://pdf.co                                                                            //
//                                                                                           //
//*******************************************************************************************//


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

    // add new page
    pdf.pageAdd();

	pdf.textSetBoxPadding(3);
	
    // set text box
    pdf.textSetBox(50, 50, 500, 100);
    // and draw a rectangle around it
    pdf.graphicsDrawRectangle(50, 50, 500, 100);

    // add text with default alignment
    pdf.textAddToBox('caf�, communiqu�, f�te, fianc�e, m�l�e, �migr�, p�t�, prot�g�; Left aligned text Left aligned text Left aligned text Left aligned text Left aligned text Left aligned text Left aligned text', true);

    // set another text box
    pdf.textSetBox(50, 200, 500, 100);
    // and draw a rectangle around it
    pdf.graphicsDrawRectangle(50, 200, 500, 100);

    // add justified text
    pdf.textSetAlign(BytescoutPDF.JUSTIFIED);
    pdf.textAddToBox('caf�, communiqu�, f�te, fianc�e, m�l�e, �migr�, p�t�, prot�g�; Justfied text Justfied text Justfied text Justfied text Justfied text Justfied text Justfied text Justfied text Justfied text', true);

    // return BytescoutPDF object instance
    return pdf;
}

