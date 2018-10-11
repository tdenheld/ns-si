// generic javascript
// ------------------------------------------------------------
$(document).ready(function () {

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
    $(window).resize(function () {
        update_window_size();
    });




    // functionality that"s on linked on scroll
    // ------------------------------------------------------------

    $(window).scroll(function () {
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



    // scroll to
    // ------------------------------------------------------------
    $("a[href^='#'].js-scroll-to").click(function () {
        var obj = {
            element: $($.attr(this, "href")),
            offst: $(".header").height(),
        };
        TweenMax.to(window, .8, {
            ease: Power3.easeInOut,
            scrollTo: {
                y: obj.element,
                offsetY: obj.offst,
                autoKill: false,
            }
        });
        return false;
    });



    // toggle modalities
    // ------------------------------------------------------------------

    function modalities() {
        var modalities = [
            "train",
            "metro",
            "tram",
            "bus",
            "ferry",
        ];

        var default_state = modalities[0];

        function toggle_modalities(b, t) {
            // hide all tables
            $(".js-tm-table").hide();

            // show default
            $(".js-tm-table__" + default_state).show();
            $(".js-tm__" + default_state).addClass("is-active");

            $(b).click(function () {
                // transition to slide out the current cols of the table
                TweenMax.set(".js-times-col", {
                    x: -75,
                    autoAlpha: 0
                });

                // set delay to let the transition fade out the current state
                setTimeout(function () {
                    // slide in new cols
                    TweenMax.fromTo(".js-times-col", 0.1, {
                        x: 75,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1
                    });

                    // hide all tables and show the one that's clicked
                    $(".js-tm-table").hide();
                    $(t).show();
                }, 300);

                // remove all active states of the toggle
                $(".js-tm").removeClass("is-active");

                // add the one that"s clicked
                $(b).addClass("is-active");
            });
        };

        for (i = 0; i < modalities.length; i++) {
            toggle_modalities(
                ".js-tm__" + modalities[i],
                ".js-tm-table__" + modalities[i]
            );
        };
    };

    // init function
    modalities();





    // clock
    // ------------------------------------------------------------------

    function init_local_clocks() {
        // Get the local time using JS
        var date = new Date;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var angle_hours = (hours * 30) + (minutes / 2);
        var angle_minutes = (minutes * 6);
        var angle_seconds = (seconds * 6);

        $(".clock__hours").css({
            "transform": "rotateZ(" + angle_hours + "deg)"
        });
        $(".clock__minutes").css({
            "transform": "rotateZ(" + angle_minutes + "deg)"
        });
        //$(".clock__seconds").css({"transform":"rotateZ("+angle_seconds+"deg)"});
    };

    init_local_clocks();





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