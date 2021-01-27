function openPage(evt, pageName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

setInterval(() => {
    currentTime();
}, 1000);

function currentTime() {
    var Now = new Date();
    var YYYY = Now.getFullYear().toString();
    var MM = formatNumber(Now.getMonth() + 1);
    var DD = formatNumber(Now.getDate());
    var hh = formatNumber(Now.getHours());
    var mm = formatNumber(Now.getMinutes());
    var ss = formatNumber(Now.getSeconds());

    var CurrentTime = hh + ":" + mm + ":" + ss;
    var CurrentDay = DD + "." + MM + "." + YYYY;

    document.getElementById("datetime2").textContent = CurrentTime;
    document.getElementById("datetime1").textContent = CurrentDay;

    document.getElementById("datetime3").src =
        "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" +
        CurrentTime +
        " " +
        CurrentDay;
}

function formatNumber(number) {
    if (number < 10) {
        number = "0" + number.toString();
    } else {
        number = number.toString();
    }
    return number;
}
