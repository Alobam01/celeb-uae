var map;
var currentMarkers = [];
var allMarkers = {};
var originalIcons = {};

function createListResult(param_data) {
    param_data.forEach(item => {
        const targetElementId = `result-${item.category}-list`;
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            targetElement.innerHTML += createResultTemplate(item);
        }
    });
}

function createResultTemplate(param_data) {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const websites = param_data.website ? param_data.website.trim().split(/\s+/) : [];
    return `
    <div id="${param_data.id}" class="input-result-details">
      <div class="result-header">
        <h6>${param_data.title}</h6>
        <div class="result-details">
          <span>${param_data.adress}</span>
          ${
        param_data.googleMapsUrl && param_data.googleMapsUrl.trim() !== ''
            ? `<a href="${param_data.googleMapsUrl}" target="_blank">Get Direction</a>`
            : ''
          }
        </div>
        ${param_data.phone ? `
          <div class="result-info">
            <span>${isRTL ? 'هاتف' : 'phone'}:</span>
            <a href="tel:${param_data.phone}">${param_data.phone}</a>
          </div>` : ""}
        ${param_data.fax ? `
          <div class="result-info">
            <span>${isRTL ? 'فاكس' : 'Fax'}:</span>
            <a>${param_data.fax}</a>
          </div>` : ""}
          ${param_data.customerCare ? `
          <div class="result-info">
            <span>${isRTL ? 'خدمة العملاء' : 'Customer Care'}:</span>
            <a href="tel:${param_data.customerCare}">${param_data.customerCare}</a>
          </div>` : ""}
          ${param_data.pOBox ? `
          <div class="result-info">
            <span>${isRTL ? 'صندوق البريد' : 'POBox'}:</span>
            <p>${param_data.pOBox}</p>
          </div>` : ""}
          ${param_data.workingHours ? `
          <div class="result-info">
            <span>${isRTL ? 'موعيد العمل' : 'Working Hours'}:</span>
            <p>${param_data.workingHours}</p>
          </div>` : ""}
          ${param_data.email ? `
          <div class="result-info">
            <span>${isRTL ? 'البريد الالكتروني' : 'Email'}:</span>
            <a href="mailto:${param_data.email}">${param_data.email}</a>
          </div>` : ""}
          ${websites.length > 0 ? `
            <div class="result-info">
              <span>${isRTL ? 'موقع' : 'Website'}:</span>
              <ul>
                ${websites.map(site => `<li><a href="${site}" target="_blank">${site}</a></li>`).join('')}
              </ul>
            </div>` : ''}
      </div>
      <a class="close-btn">
        <img src="/image/icons/XCircle.svg">
      </a>
    </div>
  `;
}

// Loop through the param_data and add the HTML to the container


function initMap(param_data) {
    var mapControl = document.getElementById('map');

    map = new google.maps.Map(mapControl, {
        center: { lat: 24.873784, lng: 54.856930 },
        zoom: 8.65,
        mapId: '4502bf5f5caf9ef4',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        draggable: false,
    });
    createListResult(param_data)
    // Initialize markers for all categories
    initializeMarkers(param_data);

    document.querySelectorAll('.list-map .list-link').forEach(link => {
        link.addEventListener('click', function () {
            switchCategory(this.id);
            document.querySelectorAll('.list-map .list-link').forEach(link => { link.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.map-result').forEach(result => { result.classList.remove('d-none'); });
            zoomOutMap();
        });
    });

    document.querySelectorAll('[data-target]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetMarker = currentMarkers.find(marker => marker.getTitle() === document.getElementById(targetId).querySelector('h6').textContent);
            showOnlyMarker(targetMarker);
            changeMarkerIcon(targetMarker, true);
            zoomToMarker(targetMarker);
            toggleDetails(targetId);
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            restoreAllMarkers();

            document.querySelectorAll('.map-result').forEach(result => {
                result.classList.remove('d-none');
                result.classList.add('d-block');
            });

            hideAllDetails();
            zoomOutMap();
        });
    });


    const firstcategory = 'airports';
    switchCategory(firstcategory);
    document.getElementById(firstcategory)?.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (this.getAttribute('data-bs-target') === '#gov-services') {
                switchCategory('airports');
                document.querySelectorAll('.list-map .list-link').forEach(link => link.classList.remove('active'));
                document.getElementById('airports').classList.add('active');
                document.getElementById('airports').click();
                document.querySelectorAll('.map-result').forEach(result => {
                    result.classList.remove('d-none');
                    result.classList.add('d-block');
                });
            } else if (this.getAttribute('data-bs-target') === '#emergency') {
                switchCategory('fire');
                document.querySelectorAll('.list-map .list-link').forEach(link => link.classList.remove('active'));
                document.getElementById('fire-stations').click();
                document.querySelectorAll('.map-result').forEach(result => {
                    result.classList.remove('d-none');
                    result.classList.add('d-block');
                });
            } else if (this.getAttribute('data-bs-target') === '#entertainment') {
                switchCategory('landmarks');
                document.querySelectorAll('.list-map .list-link').forEach(link => link.classList.remove('active'));
                document.getElementById('landmarks').click();
                document.querySelectorAll('.map-result').forEach(result => {
                    result.classList.remove('d-none');
                    result.classList.add('d-block');
                });
            }
        });
    });
}

function convertData(array) {
    const result = {};

    array.forEach(item => {
        const { id, category, lat, lng, title, googleMapsUrl } = item;
        const icon = "/image/icons/map-marker.svg";

        if (!result[category]) {
            result[category] = [];
        }

        result[category].push({ id, lat, lng, title, icon, googleMapsUrl });
    });

    return result;
}

function initializeMarkers(param_data) {
    const data = convertData(param_data);
    Object.keys(data).forEach(category => {

        allMarkers[category] = data[category].map(item => {
            const marker = createMarker(
                { lat: +item.lat, lng: +item.lng },
                item.title,
                '/image/icons/map-marker.svg',
                item.googleMapsUrl,
                item.id
            );
            marker.setMap(null);
            return marker;
        });
    });
}

function createMarker(position, title, iconUrl, url, id) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(30, 30)
        },
        url: url
    });

    originalIcons[title] = iconUrl;

    
    google.maps.event.addListener(marker, "click", function () {

        showOnlyMarker(marker);
        changeMarkerIcon(marker, true);
        zoomToMarker(marker);

        if (id) {
            toggleDetails(id); 
        }
    });

    return marker;
}

function setMarkers(markers) {
    if (!markers || !Array.isArray(markers)) {
        return;
    }
    currentMarkers.forEach(marker => marker.setMap(null));

    currentMarkers = markers;
    currentMarkers.forEach(marker => {
        marker.setMap(map);
        marker.setVisible(true);
    });
}

function switchCategory(category) {
    hideAllDetails();

    Object.values(allMarkers).flat().forEach(marker => marker.setMap(null));

    setMarkers(allMarkers[category]);

    document.querySelectorAll('.map .category-section').forEach(section => {
        section.classList.add('d-none');
    });

    document.querySelector(`.map .category-section.${category}`)?.classList.remove('d-none');
}


function showOnlyMarker(selectedMarker) {
    currentMarkers.forEach(marker => {
        if (marker !== selectedMarker) {
            marker.setMap(null);
        } else {
            marker.setMap(map);
        }
    });
}

function restoreAllMarkers() {
    currentMarkers.forEach(marker => {
        marker.setMap(map);
    });
}

function toggleDetails(targetId) {
    hideAllDetails();

    document.querySelectorAll('.map-result').forEach(result => {
        result.classList.add('d-none');
    });

    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.remove('d-none');
        targetElement.classList.add('d-flex');
    }
}



function hideAllDetails() {
    document.querySelectorAll('.input-result-details').forEach(detail => {
        detail.classList.add('d-none');
        detail.classList.remove('d-flex');
    });
}

function zoomToMarker(marker) {
    map.setZoom(12.49);
    var offset = 0.05;
    var newLat = marker.getPosition().lat();
    var newLng = marker.getPosition().lng() - offset;
    map.setCenter({ lat: newLat, lng: newLng });
}

function zoomOutMap() {
    map.setZoom(8.5);
    map.setCenter({ lat: 25.03784, lng: 54.956930 });
    currentMarkers.forEach(marker => {
        marker.setIcon({
            url: '/image/icons/map-marker.svg'
        });

    });
}

function changeMarkerIcon(marker, zoomedIn) {
    var iconUrl = zoomedIn ? '/image/icons/map-markery.gif' : originalIcons[marker.getTitle()];
    marker.setIcon({
        url: iconUrl,
        scaledSize: new google.maps.Size(50, 50)
    });
}

//search result
document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.querySelector('.map');
    if (mapElement) {
        const searchResultContainer = document.getElementById("autoSearchResult");

        searchResultContainer.addEventListener("click", function (e) {
            const target = e.target;
            target.hasAttribute("data-target")
            e.preventDefault();

            document.querySelectorAll('.map-result').forEach(result => {
                result.classList.remove('d-block');
                result.classList.add('d-none');
            });

            const categorySections = document.querySelectorAll(".category-section");
            categorySections.forEach(section => {
                section.classList.add('d-none');
            });
            const targetId = target.getAttribute("data-target");
            for (const section of categorySections) {
                const childElement = section.querySelector(`#${targetId}`);

                if (childElement) {
                    section.classList.remove("d-none");
                    break;
                }
            }

            const activeCategorySection = document.querySelector(".category-section:not(.d-none)");
            if (activeCategorySection) {
                const parentTabPane = activeCategorySection.closest(".tab-pane");
                if (parentTabPane) {
                    const tabPaneId = parentTabPane.id;
                    const tabButton = document.querySelector(`[data-bs-target="#${tabPaneId}"]`);
                    tabButton?.click();
                }
                const targetIdFromCategory = activeCategorySection.classList[1];
                const listLink = document.querySelector(`.map #${targetIdFromCategory}`);
                listLink?.click();
            }

            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                targetDiv.classList.remove("d-none");
                targetDiv.classList.add("d-flex");
            }
            const targetMarker = currentMarkers?.find(marker => {
                const targetTitle = document.getElementById(targetId)?.querySelector('h6')?.textContent;
                return marker.getTitle() === targetTitle;
            });
            if (targetMarker) {
                showOnlyMarker(targetMarker);
                changeMarkerIcon(targetMarker, true);
                zoomToMarker(targetMarker);
                toggleDetails(targetId);
            }
        });
    }
});