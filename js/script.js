//fillter
$(document).ready(function () {
    $('.custom-dropdown .dropdown-menu a.filter-item').on('click', function () {
        var text = $(this).text();
        var value = $(this).data('value');
        var parent = $(this).parents('.filter-control').parent();

        parent.find('.selected-value').text(text);
        parent.find('select').val(value).change();
        event.preventDefault();
    });
});

//refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

//loader
const loader = document.getElementById("loader");
function showLoader() {
    loader.style.display = "flex";
    document.documentElement.style.overflow = "hidden";
}

function hideLoader() {
    $(loader).fadeOut(200, () => {
        document.documentElement.style.overflow = "";
    });
}

showLoader();

document.addEventListener("DOMContentLoaded", function () {

    // Scroll to top on load
    /* window.scrollTo(0, 0);*/
    $(window).on("load", function () {
        hideLoader();
    });
});

$(document).on("ajaxSend", function (event, jqXHR, ajaxOptions) {
    if (!ajaxOptions.noLoader) {
        showLoader();
    }
});

$(document).on("ajaxComplete", function (event, jqXHR, ajaxOptions) {
    if (!ajaxOptions.noLoader) {
        hideLoader();
    }
});

$(document).on("ajaxError", function (event, jqxhr, settings, thrownError) {
    var customMessage = jqxhr.responseJSON ? jqxhr.responseJSON.message : "Network connection error please try again later!";
    showToast("error", "An error occurred!", customMessage);
});


$(document).ready(function () {
    var error = (new URL(location.href)).searchParams.get('err');
    if(error) {
        showToast("warning", "UAE Pass error occured!", error);
    }
});


// Function to scroll to the top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
}
    window.addEventListener('scroll', function () {
  const button = document.getElementById('backToTop');
  if (window.scrollY > 200) {
        button.style.display = 'flex';
  } else {
        button.style.display = 'none';
  }
});

//fix accordtion glutch

const accordions = document.querySelectorAll('.position-relative.accordion');

  accordions.forEach(accordion => {
        accordion.addEventListener('show.bs.collapse', function (event) {
            const openCollapse = accordion.querySelector('.accordion-item-custom .accordion-collapse.show');
            if (openCollapse && openCollapse !== event.target) {
                event.preventDefault();

                openCollapse.addEventListener('hidden.bs.collapse', function handler() {
                    openCollapse.removeEventListener('hidden.bs.collapse', handler);
                    const target = event.target;
                    const bsCollapse = new bootstrap.Collapse(target, { toggle: true });
                });
                const bsCollapseOld = bootstrap.Collapse.getInstance(openCollapse);
                bsCollapseOld.hide();
            }
        });
  });



// toaster
document.addEventListener('DOMContentLoaded', () => {
    const toaster = document.querySelector('.toaster');
    const closeToasterBtn = document.querySelector('.close-toaster');
    var toastTimeout;

    window.showToast = function (type, headerText, message) {
        if (toaster) {
            
            const header = toaster.querySelector('h6');
            const body = toaster.querySelector('p');

            toaster.classList.remove('error-toaster', 'warning-toaster');

            toaster.classList.add(type === 'error' ? 'error-toaster' : 'warning-toaster');

            header.textContent = headerText;
            body.textContent = message;

            toaster.style.display = 'block';

            clearTimeout(toastTimeout);

            toastTimeout = setTimeout(() => {
                toaster.style.display = 'none';
            }, 5000);
        }
    }

    closeToasterBtn.addEventListener('click', () => {
        clearTimeout(toastTimeout);
        toaster.style.display = 'none';
    });
});

//languageButton
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll(".language-modal");
    var buttons = document.querySelectorAll(".languageModalButton");
    var closeButtons = document.querySelectorAll(".closeModalBtn");

    buttons.forEach(function (btn, index) {
        var modal = modals[index];
        var closeBtn = closeButtons[index];

        btn.addEventListener("click", function () {
            var isOpen = modal.style.display === "block";
            if (isOpen) {
                closeModal(modal, btn);
            } else {
                openModal(modal, btn);
            }
        });

        closeBtn.addEventListener("click", function () {
            closeModal(modal, btn);
        });

        modal.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeModal(modal, btn);
            }
        });
    });

    function openModal(modal, triggerButton) {
        modal.style.display = "block";
        triggerButton.classList.add("active");
        triggerButton.setAttribute("aria-expanded", "true");

        const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
    }

    function closeModal(modal, triggerButton) {
        modal.style.display = "none";
        triggerButton.classList.remove("active");
        triggerButton.setAttribute("aria-expanded", "false");
        triggerButton.focus();
    }
});

 //google translate
 function googleTranslateElementInit() {
   new google.translate.TranslateElement(
       {
           pageLanguage: '@langKey',
           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
           autoDisplay: false
       },
       'google_translate_element'
   );
   var m = false;
   setTimeout(function () {
       if (jQuery(window).width() < 768) {
           m = true;
           $('#google-translate-container-mobile').append( jQuery('.google-translate').detach());
       }
   }, 2000);

    jQuery(window).resize(function () {
        if (jQuery(window).width() < 768 && m == false) {
            m = true;
            $('#google-translate-container-mobile').append(jQuery('.google-translate').detach());
        } else if (jQuery(window).width() >= 768 && m == true) {
            m = false;
            $('#google-translate-container-web').append(jQuery('.google-translate').detach());
        }
    });
}

//mobile menu
function updateOffcanvasClass() {
    var offcanvasElement = document.querySelector('.offcanvas');

    if (document.dir == "rtl") {
        offcanvasElement.classList.remove('offcanvas-start');
        offcanvasElement.classList.add('offcanvas-end');
    } else {
        offcanvasElement.classList.remove('offcanvas-end');
        offcanvasElement.classList.add('offcanvas-start');
    }
}
updateOffcanvasClass();

// remove id from link
document.addEventListener('DOMContentLoaded', function () {
    var scrollLinks = document.querySelectorAll('.nav-link');

    scrollLinks.forEach(function (scrollLink) {
        scrollLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action of adding ID to the URL

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                this.blur();
            }
        });
    });
});

//footer

document.querySelectorAll('.head-footer-text').forEach(header => {
    header.addEventListener('click', function () {
        // Only toggle on mobile screens
        if (window.innerWidth < 768) {
            const footerList = this.nextElementSibling;
            footerList.classList.toggle('show');
            this.querySelector('.arrow').classList.toggle('rotate');
        }
    });
});

//select inner page
document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById('mySelect');

    if (selectElement) {
        selectElement.addEventListener('change', function () {
            const selectedValue = this.value;
            if (window.innerWidth <= 768) {
                if (selectedValue) {
                    const targetDiv = document.getElementById(selectedValue);
                    if (targetDiv) {
                        const elementPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - 100;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    }
});

// searchButton

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('search');
    const searchContainer = document.querySelector('.search-container');
    const closeButton = document.querySelector('.close-button');
    const menuContainer = document.querySelector('.menu-container');
    const menu = document.getElementById('menu');
    const searchInput = document.querySelector('.search-input');
    const menuCloseButton = document.querySelector('.menu-close-button');

    //menuButton.addEventListener('click', function () {
    //  const menuButtonRect = menuButton.getBoundingClientRect();
    //  //searchContainer.style.top = `${menuButtonRect.top}px`;
    //  //searchContainer.style.right = `${window.innerWidth - menuButtonRect.right - 6}px`;
    //  //if (document.documentElement.classList.contains('translated-ltr')) {
    //  //  searchContainer.style.top = `${menuButtonRect.top - 40}px`;
    //  //}
    //  //if (document.dir == "rtl") {
    //  //  searchContainer.style.right = `auto`
    //  //  searchContainer.style.left = `${menuButtonRect.right - 46}px`;
    //  //}

    //  searchContainer.classList.add('active');
    //  menuButton.style.display = 'none';
    //  searchInput.focus();
    //});

    menuButton.addEventListener('click', openSearch);
    menuButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSearch();
        }
    });

    closeButton.addEventListener('click', closeSearch);
    menuCloseButton.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            closeSearch();
        }
    });

    function openSearch() {
        searchContainer.classList.add('active');
        menuButton.style.display = 'none';
        searchInput.focus();
    }

    function closeSearch() {
        searchContainer.classList.remove('active');
        menuButton.style.display = 'block';
        menuContainer.style.display = 'none';
        menu.style.display = 'none';
        searchInput.value = '';
        menuButton.focus();
    }

    //searchInput.addEventListener('keydown', function (event) {
    //  if (event.key === 'Enter') {
    //    if (searchInput.value.trim()) {
    //      loader.classList.add('d-block');
    //      loader.classList.remove('d-none');
    //      menu.classList.add('d-none');
    //      menu.classList.remove('d-block');

    //      setTimeout(() => {
    //        loader.classList.add('d-none');
    //        loader.classList.remove('d-block');
    //        menu.classList.add('d-block');
    //        menu.classList.remove('d-none');
    //      }, 1000);

    //      const searchInputRect = searchInput.getBoundingClientRect();
    //      menuContainer.style.top = `${searchInputRect.height + 8}px`;
    //      menuContainer.style.display = 'block';
    //    }
    //  }
    //});

});


//trim-text
document.addEventListener("DOMContentLoaded", function () {
    var texts = document.querySelectorAll('.text');
    var lineHeight = 1.65;
    var maxHeight = lineHeight * 4;

    texts.forEach(function (text) {
        var readMoreLink = text.nextElementSibling;
        var textBlockHeight = text.scrollHeight / parseFloat(getComputedStyle(text).fontSize);
        var isRTL = getComputedStyle(text).direction === "rtl";

        if (readMoreLink && readMoreLink.classList.contains('read-more')) {
            readMoreLink.textContent = isRTL ? "المزيد" : "Read more";
        }

        if (textBlockHeight <= maxHeight && readMoreLink != null) {
            readMoreLink.style.display = 'none';
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const heading = document.querySelector("main.head-services h2");
        const image = document.querySelector("img.img-overlay");

        if (heading && heading.textContent.includes("Founders of the Union")) {
            if (image) {
                image.classList.remove("img-overlay");
                image.classList.add("header-image", "union-image");
            }
        }
    });


    document.addEventListener("DOMContentLoaded", function () {
        const heading = document.querySelector("main.head-services h2");
        const image = document.querySelector("img.header-image");

        if (heading && heading.textContent.includes("Founders of the Union")) {
            image.classList.add("union-image");
        }
    });


    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("read-more")) {
            var text = event.target.previousElementSibling;
            var isRTL = getComputedStyle(text).direction === "rtl";

            if (text.classList.contains("trimmed-text")) {
                text.classList.remove("trimmed-text");
                event.target.textContent = isRTL ? "قليل" : "Read less";
            } else {
                text.classList.add("trimmed-text");
                event.target.textContent = isRTL ? "المزيد" : "Read more";
            }
        }
    });
});
//play video
function initYouTubeVideos() {
    var playerElements = document.querySelectorAll('.youtube-player');
    for (var n = 0; n < playerElements.length; n++) {
        /*playerElements[n].innerHTML = '';*/
        var url = playerElements[n].dataset.id;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        var videoId = (match && match[7].length == 11) ? match[7] : "";
        playerElements[n].dataset.id = videoId;
        //var div = document.createElement('div');
        //div.setAttribute('data-id', videoId);
        //var thumbNode = document.createElement('img');
        //thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId);
        //div.appendChild(thumbNode);
        //var playButton = document.createElement('div');
        //playButton.setAttribute('class', 'play');
        //div.appendChild(playButton);
        playerElements[n].onclick = function () {
            labnolIframe(this);
        };
        //playerElements[n].appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', initYouTubeVideos);
function labnolIframe(div) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('class', 'video-iframe');
    var childDiv = div.children[0];
    div.replaceChild(iframe, childDiv);
}

// translate
// var translateButton = document.getElementById('languageModalButton')
// translateButton.addEventListener("click", function () {
//   const iframes = document.getElementsByClassName('VIpgJd-ZVi9od-xl07Ob-OEVmcd');
//   const iframeDocument = iframes[0].contentDocument
//   if (iframeDocument.head.querySelector('style'))
//     return;
//   const style = iframeDocument.createElement('style');
//   style.textContent = `
//         .VIpgJd-ZVi9od-vH1Gmf{
//           padding: 12px !important;
//           border-radius: 8px !important;
//           border-color: rgba(155, 97, 49, 0.75) !important;
//         }
//         a{
//           display: inline-block !important;
//           margin-bottom: 8px !important;
//         }
//         a .indicator{
//           display: none !important;
//         }
//         a .text{
//           color: rgb(0, 0, 0, .6) !important;
//           font-family: system-ui !important;
//         }
//         a.VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd .text{
//             color: #9B6131 !important;
//         }
//         .VIpgJd-ZVi9od-vH1Gmf-KrhPNb{
//             display: inline-block !important;
//         }
//         .VIpgJd-ZVi9od-vH1Gmf-ibnC6b:hover div{
//             background: transparent;
//             border-bottom: 1px solid #9B6131;
//         }
//     }
//   `;
//   iframeDocument.head.appendChild(style);
// });

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Phone input initialization
    const input = document.querySelector("#phone");
    const output = document.querySelector("#output");
    const form = document.querySelector("#contactUsForm");
    const phoneErrorIcon = document.querySelector('#output');

    const iti = window.intlTelInput(input, {
        initialCountry: "ae", // UAE as default country
        nationalMode: true,
        utilsScript: "/vendor/intltelInput/js/utils.js"
    });

    const handleValidation = () => {
        if (input.value) {
            if (iti.isValidNumber()) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
                phoneErrorIcon.style.display = 'none';
            } else {
                text = "Number is invalid"; // Error message for invalid number
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                phoneErrorIcon.style.display = 'block';
            }
        } else {
            // Treat empty input as valid (since required will handle empty)
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
    };

    const handleFocusOut = () => {
        output.innerHTML = ""; // Clear error messages
        input.classList.remove('is-valid', 'is-invalid'); // Reset classes
        phoneErrorIcon.style.display = 'none';
    };

    // Validate phone input on form submission
    form.addEventListener('submit', (event) => {
        handleValidation();

        if (input.value && !iti.isValidNumber()) {
            event.preventDefault(); // Prevent form submission if invalid
            event.stopPropagation();
        }

        form.classList.add('was-validated'); // Enable Bootstrap validation styling
    });

    // Add validation for phone input focus/blur events
    input.addEventListener('focus', handleValidation);
    input.addEventListener('blur', handleFocusOut);

    // General form validation for all inputs
    (function () {
        'use strict';
        var forms = document.querySelectorAll('.needs-validation');
        const confirmationMessage = document.querySelector('.confirmation-message');
        const sendNewMessageButton = document.querySelector('.send-new-message');

        sendNewMessageButton.addEventListener('click', function () {
            confirmationMessage.style.display = 'none';
            form.style.display = 'block';
            sendNewMessageButton.style.display = 'none';
            form.reset();
            form.classList.remove('was-validated');  // Reset validation
        });

        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (!form.checkValidity()) {
                    event.stopPropagation();
                } else {
                    handleValidation();

                    if (!input.value || iti.isValidNumber()) {
                        /*showLoader();*/
                        grecaptcha.execute();
                    }
                }

                form.classList.add('was-validated'); // Add validation feedback styling

                // Handle error icons and tooltips
                const inputs = form.querySelectorAll('.form-control');
                inputs.forEach(function (input) {
                    const errorIcon = input.nextElementSibling;
                    if (errorIcon && !input.checkValidity()) {
                        errorIcon.style.display = 'block'; // Show error icon
                    } else if (errorIcon) {
                        errorIcon.style.display = 'none'; // Hide error icon
                    }
                });
            }, false);
        });
    })();
});

// reCAPTCHA callback function
function onSubmit(token) {
    document.getElementById("RecaptcahResponse").value = token; 

    const form = document.getElementById("contactUsForm");

    showLoader();
    // Perform AJAX submission
    const ajaxUrl = form.getAttribute('data-ajax-url');
    $.ajax({
        url: ajaxUrl,
        type: 'POST',
        data: $(form).serialize(), 
        success: function (response) {
            form.style.display = 'none';
            const confirmationMessage = document.querySelector('.confirmation-message');
            confirmationMessage.style.display = 'block';
            grecaptcha.reset();
        },
        error: function (error) {
            grecaptcha.reset();
        },
        complete: function () {
            hideLoader();
        }
    });
}




//const accordionItems = document.querySelectorAll('.accordion-collapse');
//const acc = document.getElementById('accordionExample');

//accordionItems.forEach((el) => {
//    el.addEventListener('shown.bs.collapse', (e) => {
//        const rect = el.getBoundingClientRect();
//        const scrollOffset = rect.top + window.scrollY - 100;
//        setTimeout(() => {
//            window.scrollTo({
//                top: scrollOffset,
//                behavior: 'smooth'
//            });
//        }, 300); // Adjust the timeout as necessary
//    });
//});
