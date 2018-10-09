// generic javascript
// ------------------------------------------------------------
$(document).ready(function(){

// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var window_width = Number;
var window_height = Number;
var mobile = Boolean;
var scrolled = false;


	
// update screen height
// ------------------------------------------------------------	
function update_window_size() {
	window_width = $(window).innerWidth();
	window_height = $(window).innerHeight();
	
	// set breakpoints
	if (window_width > 912) {
		mobile = false;
	} else {
		mobile = true;
	};
};
update_window_size();
	
// update when resizing
$(window).resize(function() {
	update_window_size();
});




// functionality that"s on linked on scroll
// ------------------------------------------------------------

$(window).scroll(function() {
	scrolled = true;
	if (scrolled) {
		//requestAnimationFrame(scrolling);
	};
});

function scrolling() {
	var pos = $(window).scrollTop();
	// fade arrow scroll down button
	scrolled = false;
};





// include html
// ------------------------------------------------------------
function include_html() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include");
        if (file) {
        	/*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include");
                    include_html();
                };
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        };
    };
};
include_html();

});