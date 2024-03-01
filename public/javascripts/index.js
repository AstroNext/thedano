$(document).ready(function(){
    $('#home-btn').click(function (e) {
        console.log("printed 1")
        $('#home-btn').removeClass('dark:text-violet-400 dark:border-violet-400');
        $('#product-btn').addClass('dark:text-violet-400 dark:border-violet-400');
    });
    
    $('#product-btn').click(function (e) {
        console.log("printed 2")
        $('#product-btn').removeClass('dark:text-violet-400 dark:border-violet-400');
        $('#home-btn').addClass('dark:text-violet-400 dark:border-violet-400');
    });
});