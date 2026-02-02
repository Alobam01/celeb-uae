document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.accordion-button').forEach(element => {
        element.addEventListener('click', handleAccordionClick);
    });

    function handleAccordionClick(event) {
        const selectedButton = event.currentTarget;
        const targetId = selectedButton.getAttribute('data-bs-target');
        //const targetDiv = document.querySelector(targetId);
        const targetDiv = $(targetId);
        const isVertical = selectedButton.classList.contains('b-v')

        if (targetDiv) {

            targetDiv.on('click', 'a[data-target]', handleSubSectionClick);

            //targetDiv.find('a[data-target]').each(function () {
            //    $(this).on('click', handleSubSectionClick); // Bind event handler
            //});

            setTimeout(() => {

                const scrollOptions = { top: 0, behavior: 'smooth' };

                if (isVertical)
                    selectedButton.parentNode.querySelector('.accordion-collapse').scrollIntoView(scrollOptions)

                else
                var accordionItem = selectedButton.closest('.accordion-item-custom');
                var infoCardContent = accordionItem ? accordionItem.querySelector('.info-card-content') : null;
                if (infoCardContent) {
                    infoCardContent.scrollIntoView(scrollOptions);
                }
                else {
                    selectedButton.closest('.accordion-item-custom').scrollIntoView(scrollOptions);
                }
            }, 500);
        }
    }

    function handleSubSectionClick(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('data-target');
        const targetDiv = document.getElementById(targetId);
        const currentAccordion = event.currentTarget.closest('.accordion-collapse');
        /*const loader = currentAccordion.querySelector('.loader');*/

        if (targetDiv) {
            currentAccordion.querySelectorAll('.accordion-body').forEach(function (div) {
                div.classList.add('d-none');
                div.classList.remove('d-grid');
            });

            //loader.style.display = 'grid';

            //setTimeout(function () {
            //    loader.style.display = 'none';
            //    targetDiv.classList.remove('d-none');
            //    targetDiv.classList.add('d-grid');
            //}, 750);

            targetDiv.classList.remove('d-none');
            targetDiv.classList.add('d-grid');
        }
    }
});
