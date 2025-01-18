let container1 = document.getElementById('Square');
    // <!--The main square movement script when moving the mouse-->
    window.onmousemove = function (e) {
        let x = -e.x / 90,
            y = -e.y / 90;

        container1.style.right = x + 'px';
        container1.style.bottom = y + 'px';
    }
    /* Mobile gyroscope */
    window.addEventListener("deviceorientation", function (e) {
        container1.style.right = e.gamma/3 + "px"
        container1.style.bottom = e.beta/3 + "px"
    })