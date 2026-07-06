document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("countrySearch");
    var blocks = document.querySelectorAll(".country-block");
    var searchEmpty = document.getElementById("searchEmpty");

    function applyVisibility() {
        var query = searchInput.value.trim().toLowerCase();
        var anyVisible = false;

        blocks.forEach(function (block) {
            var items = block.querySelectorAll(".country-list p");
            var blockHasMatch = false;

            items.forEach(function (item) {
                var link = item.querySelector(".country-link");
                var name = link.textContent.trim().toLowerCase();
                var match = query === "" || name.includes(query);
                item.style.display = match ? "" : "none";
                if (match) blockHasMatch = true;
            });

            block.closest(".col").style.display = blockHasMatch ? "" : "none";
            if (blockHasMatch) anyVisible = true;
        });

        if (searchEmpty) {
            searchEmpty.classList.toggle("d-none", anyVisible);
            searchEmpty.textContent = "Ничего не найдено. Попробуйте другой запрос.";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyVisibility);
    }

    applyVisibility();

    var modalEl = document.getElementById("countryModal");
    var bsModal = window.bootstrap ? new bootstrap.Modal(modalEl) : null;

    var modalFlag = document.getElementById("modalFlag");
    var modalName = document.getElementById("modalCountryName");
    var modalLoader = document.getElementById("modalLoader");
    var modalData = document.getElementById("modalData");
    var modalErr = document.getElementById("modalError");

    var numberFormatter = new Intl.NumberFormat("ru-RU");

    function formatPopulation(value) {
        var numberValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numberValue)) {
            return "нет данных";
        }
        return numberFormatter.format(numberValue) + " чел.";
    }

    function findCountryByCode(data, code) {
        var normalizedCode = (code || "").toUpperCase();
        return data.find(function (item) {
            return (item.cca2 || "").toUpperCase() === normalizedCode ||
                (item.cca3 || "").toUpperCase() === normalizedCode;
        });
    }

    function getCountryDetails(code) {
        var cacheKey = "gc-country-data-cache";
        var cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
            try {
                var parsed = JSON.parse(cachedData);
                var cachedCountry = findCountryByCode(parsed, code);
                if (cachedCountry) {
                    return Promise.resolve(cachedCountry);
                }
            } catch (err) {
                sessionStorage.removeItem(cacheKey);
            }
        }

        return fetch("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json")
            .then(function (res) {
                if (!res.ok) throw new Error("country data error");
                return res.json();
            })
            .then(function (data) {
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                var country = findCountryByCode(data, code);
                if (!country) throw new Error("country not found");
                return country;
            });
    }

    var WEATHER_CODES = {
        0: { text: "Ясно", icon: "☀️" }, 1: { text: "Малооблачно", icon: "🌤️" }, 2: { text: "Облачно с прояснениями", icon: "⛅" }, 3: { text: "Пасмурно", icon: "☁️" },
        45: { text: "Туман", icon: "🌫️" }, 48: { text: "Изморозь", icon: "🌫️" },
        51: { text: "Лёгкая морось", icon: "🌦️" }, 53: { text: "Морось", icon: "🌦️" }, 55: { text: "Сильная морось", icon: "🌦️" },
        56: { text: "Ледяная морось", icon: "🌦️" }, 57: { text: "Ледяная морось", icon: "🌦️" },
        61: { text: "Небольшой дождь", icon: "🌧️" }, 63: { text: "Дождь", icon: "🌧️" }, 65: { text: "Сильный дождь", icon: "🌧️" },
        66: { text: "Ледяной дождь", icon: "🌧️" }, 67: { text: "Ледяной дождь", icon: "🌧️" },
        71: { text: "Небольшой снег", icon: "🌨️" }, 73: { text: "Снег", icon: "🌨️" }, 75: { text: "Сильный снегопад", icon: "❄️" }, 77: { text: "Снежная крупа", icon: "❄️" },
        80: { text: "Ливень", icon: "🌧️" }, 81: { text: "Сильный ливень", icon: "🌧️" }, 82: { text: "Очень сильный ливень", icon: "🌧️" },
        85: { text: "Снегопад", icon: "🌨️" }, 86: { text: "Сильный снегопад", icon: "🌨️" },
        95: { text: "Гроза", icon: "⛈️" }, 96: { text: "Гроза с градом", icon: "⛈️" }, 99: { text: "Сильная гроза с градом", icon: "⛈️" }
    };

    function loadWeather(lat, lng) {
        var row = document.getElementById("modalWeatherRow");
        var out = document.getElementById("modalWeather");
        row.style.display = "none";
        if (typeof lat !== "number" || typeof lng !== "number") return;

        var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&current_weather=true";
        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error("weather error");
                return res.json();
            })
            .then(function (data) {
                var cw = data.current_weather;
                if (!cw) return;
                var info = WEATHER_CODES[cw.weathercode] || { text: "Данные недоступны", icon: "🌍" };
                out.innerHTML = '<span class="weather-icon">' + info.icon + '</span> ' + Math.round(cw.temperature) + "°C, " + info.text;
                row.style.display = "flex";
            })
            .catch(function () {
                row.style.display = "none";
            });
    }

    function buildFlagUrl(code, country) {
        var normalizedCode = (code || "").toLowerCase();
        var directUrl = "https://flagcdn.com/w320/" + normalizedCode + ".png";
        if (country && country.flags && (country.flags.svg || country.flags.png)) {
            return country.flags.svg || country.flags.png;
        }
        return directUrl;
    }

    function openCountry(code, fallbackName) {
        modalName.textContent = fallbackName || "—";
        modalFlag.src = "";
        modalLoader.classList.remove("d-none");
        modalData.classList.add("d-none");
        modalErr.classList.add("d-none");

        if (bsModal) {
            bsModal.show();
        } else {
            modalEl.classList.add("show");
            modalEl.style.display = "block";
        }

        getCountryDetails(code)
            .then(function (country) {
                var nameRu = (country.name && country.name.common) || fallbackName || "—";
                var languages = country.languages ? Object.values(country.languages).join(", ") : "нет данных";

                modalName.textContent = nameRu;
                modalFlag.src = buildFlagUrl(code, country);
                modalFlag.alt = nameRu;
                document.getElementById("modalCapital").textContent = (country.capital && country.capital[0]) || "нет данных";
                document.getElementById("modalRegion").textContent = country.subregion || country.region || "нет данных";
                document.getElementById("modalPopulation").textContent = formatPopulation(country.population);
                document.getElementById("modalArea").textContent = numberFormatter.format(country.area) + " км²";
                document.getElementById("modalLanguages").textContent = languages;

                modalLoader.classList.add("d-none");
                modalData.classList.remove("d-none");

                var coords = (country.capitalInfo && country.capitalInfo.latlng) || country.latlng;
                if (coords && coords.length === 2) {
                    loadWeather(coords[0], coords[1]);
                } else {
                    document.getElementById("modalWeatherRow").style.display = "none";
                }
            })
            .catch(function () {
                modalLoader.classList.add("d-none");
                modalErr.classList.remove("d-none");
            });
    }

    var countryRows = document.getElementById("countryRows");
    if (countryRows) {
        countryRows.addEventListener("click", function (e) {
            var link = e.target.closest(".country-link");
            if (!link) return;
            e.preventDefault();
            var code = link.dataset.code;
            var name = link.textContent.trim();
            openCountry(code, name);
        });
    }
});
