const nav = document.querySelector('.navbar-toggler');
const navicon = document.querySelector('.navbar-toggler-icon');

nav.addEventListener('click', function(){
    if(this.classList.contains('collapsed')) {
        navicon.classList.remove('mark-icon');
    } else {
        navicon.classList.add('mark-icon');
    }
});

// const btnPresent = document.getElementById('btn-present');

// btnPresent.addEventListener('click', function(){
//     alert('лее, ты че жидкий, географию не знаешь?');
// });

let button = document.getElementById('theme-dark');
let darkTheme = document.getElementById('theme');
// let img = document.getElementById('img-theme');

button.onclick = function() {
    if (darkTheme.getAttribute("href") == "css/white.css"){
        darkTheme.href = "css/style.css";
        // img.setAttribute('src', 'pict/theme.png');
    } else {
        darkTheme.href = "css/white.css";
        // img.setAttribute('src', 'pict/dark.png');
    }
}