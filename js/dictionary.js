document.addEventListener("DOMContentLoaded", function () {
    var TERMS = [
        { term: "Атолл", cat: "voda", label: "Вода", def: "Кольцеобразный коралловый остров или гряда островов, окружающая лагуну." },
        { term: "Архипелаг", cat: "voda", label: "Вода", def: "Группа островов, расположенных близко друг к другу и объединённых общим происхождением." },
        { term: "Бархан", cat: "relief", label: "Рельеф", def: "Подвижный песчаный холм серповидной формы, образующийся под действием ветра в пустынях." },
        { term: "Вулкан", cat: "geologia", label: "Геология", def: "Геологическое образование, через которое на поверхность Земли извергаются лава, пепел и горячие газы." },
        { term: "Гейзер", cat: "geologia", label: "Геология", def: "Источник, периодически выбрасывающий фонтаны горячей воды и пара." },
        { term: "Дельта", cat: "voda", label: "Вода", def: "Форма устья реки, образованная отложением наносов при впадении в море или озеро." },
        { term: "Долгота", cat: "koord", label: "Координаты", def: "Угловая величина, определяющая положение точки на Земле относительно нулевого меридиана." },
        { term: "Каньон", cat: "relief", label: "Рельеф", def: "Глубокая узкая долина с крутыми, часто отвесными склонами, обычно созданная рекой." },
        { term: "Литосфера", cat: "geologia", label: "Геология", def: "Твёрдая внешняя оболочка Земли, включающая земную кору и верхнюю часть мантии." },
        { term: "Меридиан", cat: "koord", label: "Координаты", def: "Условная линия на карте, соединяющая Северный и Южный полюсы." },
        { term: "Муссон", cat: "klimat", label: "Климат", def: "Устойчивый сезонный ветер, меняющий направление в зависимости от времени года, часто приносящий сезон дождей." },
        { term: "Низменность", cat: "relief", label: "Рельеф", def: "Равнинный участок суши с высотой до 200 метров над уровнем моря." },
        { term: "Оазис", cat: "voda", label: "Вода", def: "Участок пустыни с растительностью и источником воды." },
        { term: "Плато", cat: "relief", label: "Рельеф", def: "Возвышенная равнина с ровной или слабо расчленённой поверхностью, ограниченная уступами." },
        { term: "Пассаты", cat: "klimat", label: "Климат", def: "Постоянные ветры, дующие в тропических широтах от областей высокого давления к экватору." },
        { term: "Рельеф", cat: "relief", label: "Рельеф", def: "Совокупность неровностей земной поверхности, включая горы, равнины, впадины." },
        { term: "Сельва", cat: "klimat", label: "Климат", def: "Влажный экваториальный лес в бассейне реки Амазонки." },
        { term: "Тектоника плит", cat: "geologia", label: "Геология", def: "Теория, объясняющая движение и взаимодействие крупных фрагментов литосферы — тектонических плит." },
        { term: "Тундра", cat: "klimat", label: "Климат", def: "Природная зона с холодным климатом, безлесной растительностью и вечной мерзлотой." },
        { term: "Фьорд", cat: "relief", label: "Рельеф", def: "Узкий извилистый морской залив с крутыми скалистыми берегами, образованный ледником." },
        { term: "Циклон", cat: "klimat", label: "Климат", def: "Область пониженного атмосферного давления, сопровождающаяся сильными ветрами и осадками." },
        { term: "Широта", cat: "koord", label: "Координаты", def: "Угловая величина, определяющая положение точки на Земле относительно экватора." },
        { term: "Экватор", cat: "koord", label: "Координаты", def: "Условная линия, делящая Землю на Северное и Южное полушария, равноудалённая от полюсов." },
        { term: "Эрозия", cat: "geologia", label: "Геология", def: "Разрушение и снос горных пород и почв под действием воды, ветра и других природных факторов." }
    ];

    var list = document.getElementById("termList");
    var search = document.getElementById("termSearch");
    var emptyMsg = document.getElementById("termSearchEmpty");
    var filterBar = document.getElementById("termFilterBar");
    var currentFilter = "all";

    function render(items) {
        list.innerHTML = "";
        items.forEach(function (t) {
            var block = document.createElement("div");
            block.className = "term-block";
            block.innerHTML =
                '<button class="term-title" type="button" aria-expanded="false">' +
                '<span>' + t.term + ' <span class="tag" style="margin-left:8px;">' + t.label + '</span></span>' +
                '<span class="term-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10l6 6l6 -6h-12" /></svg></span>' +
                '</button>' +
                '<div class="term-body"><p>' + t.def + '</p></div>';
            list.appendChild(block);
        });
        emptyMsg.classList.toggle("d-none", items.length > 0);
    }

    function getFiltered() {
        var q = search.value.trim().toLowerCase();
        return TERMS.filter(function (t) {
            var matchesCat = currentFilter === "all" || t.cat === currentFilter;
            var matchesQuery = t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }

    list.addEventListener("click", function (e) {
        var title = e.target.closest(".term-title");
        if (!title) return;
        var block = title.closest(".term-block");
        var isOpen = block.classList.toggle("open");
        title.setAttribute("aria-expanded", isOpen);
    });

    search.addEventListener("input", function () {
        render(getFiltered());
    });

    if (filterBar) {
        filterBar.addEventListener("click", function (e) {
            var btn = e.target.closest(".filter-btn");
            if (!btn) return;
            filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            render(getFiltered());
        });
    }
    render(TERMS);
    var dayBlock = document.getElementById("termOfDay");
    if (dayBlock) {
        var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        var todays = TERMS[dayOfYear % TERMS.length];
        document.getElementById("termOfDayTitle").textContent = todays.term;
        document.getElementById("termOfDayText").textContent = todays.def;
        document.getElementById("termOfDayBadge").textContent = todays.label;
    }
});
