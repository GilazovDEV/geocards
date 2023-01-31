const nav = document.querySelector('.navbar-toggler');
const navicon = document.querySelector('.navbar-toggler-icon');

nav.addEventListener('click', function(){
    if(this.classList.contains('collapsed')) {
        navicon.classList.remove('mark-icon');
    } else {
        navicon.classList.add('mark-icon');
    }
});
