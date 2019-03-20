// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var vw = Number;
var vh = Number;
var mobile = Boolean;



// update screen height
// ------------------------------------------------------------	
function update_window_size() {
    vw = $(window).innerWidth();
    vh = $(window).innerHeight();

    // set breakpoints
    if (vw > 912) {
        mobile = false;
    } else {
        mobile = true;
    };
};
update_window_size();

// update when resizing
$(window).resize(() => {
    update_window_size();
});



// scroll to
// ------------------------------------------------------------
$("a[href^='#'].js-scroll-to").click(function () {
    var obj = {
        element: $($.attr(this, "href")),
        offst: $(".header").height() + 14,
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
        "btm"
    ];

    var default_state = modalities[0];

    function toggle_modalities(b, t) {
        // hide all tables
        $(".js-tm-table").hide();

        // show default
        $(".js-tm-table__" + default_state).show();
        $(".js-tm__" + default_state).addClass("is-active");

        $(b).click(() => {
            // transition to slide out the current cols of the table
            TweenMax.set(".js-times-col", {
                x: -75,
                autoAlpha: 0
            });

            // set delay to let the transition fade out the current state
            setTimeout(() => {
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
            }, 220);

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





// departures arrivals switch
// ------------------------------------------------------------------
function switch_times() {
    function motion_text() {
        TweenMax.fromTo(".js-times-hc", 0.4, {
            ease: Power3.easeInOut,
            autoAlpha: 0,
            rotationX: 50,
        }, {
            rotationX: 0,
            autoAlpha: 1
        });
    };

    function stagger_rows() {
        var tl_a = new TimelineMax();
        var tl_b = new TimelineMax();

        tl_a.staggerTo(".js-times-row", 0.25, {
            opacity: 0,
            ease: Power3.easeInOut,
            cycle: {
                y: function (i) {
                    return (i * 6);
                },
            },
        }, 0.02);

        function cons_tl_b() {
            tl_b.staggerFromTo(".js-times-row", 0.3, {
                cycle: {
                    y: function (i) {
                        return (i * 6);
                    },
                    ease: function (i) {
                        return Power3.easeInOut;
                    },
                },
            }, {
                opacity: 1,
                y: 0,
            }, 0.02);
        };
        TweenLite.delayedCall(0.4, cons_tl_b);
    };

    var state = [
        "Vertrektijden",
        "Aankomsttijden"
    ];
    var current_state = state[0];

    $(".js-times-switch").click(() => {
        $(".js-times").toggleClass("times--arrivals");
        if (current_state === state[0]) {
            current_state = state[1];
            $(".js-times-heading").text(state[1]);
            $(".js-times-switch").text(state[0]);
            setTimeout(() => {
                $(".js-times-top-col-1").text("Aankomst");
                $(".js-times-top-col-2-train").text("Vanuit");
                $(".js-times-alert").text("aankomst");
                $(".js-times-more").text("Meer aankomsttijden");
            }, 300);
        } else {
            current_state = state[0];
            $(".js-times-heading").text(state[0]);
            $(".js-times-switch").text(state[1]);
            setTimeout(() => {
                $(".js-times-top-col-1").text("Vertek");
                $(".js-times-top-col-2-train").text("Naar");
                $(".js-times-alert").text("vertrek");
                $(".js-times-more").text("Meer vertrektijden");
            }, 300);
        };
        motion_text();
        stagger_rows();
    });
};
switch_times();




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