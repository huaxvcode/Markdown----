let setDeep = (e, s, d) => {
    if (e.classList.contains("deep" + d)) return;
    let deepnum = null;
    for (let i = 0; i < e.classList.length; i++) {
        if (e.classList[i].startsWith("deep")) {
            deepnum = parseInt(e.classList[i].substring(4));
        }
    }
    if (deepnum != null && parseInt(d) < deepnum) return;
    e.classList.add("deep" + d);
    let es = e.querySelectorAll(s);
    for (let i = 0; i < es.length; i++) {
        setDeep(es[i], s, d + 1);
    }
};

let initOl = () => {
    let ols = document.querySelectorAll(".ol");
    for (let i = 0; i < ols; i++) {
        let t = [];
        for (let j = 0; j < ols[i].classList.length; j++) {
            if (ols[i].classList[j].startsWith("deep")) {
                t.push(ols[i].classList[j]);
            }
        }
        console.log(t, ols[i].classList);
        for (let j = 0; j < t.length; j++) {
            ols[i].classList.remove(t[j]);
        }
    }
    for (let i = 0; i < ols.length; i++) setDeep(ols[i], ".ol", 1);
    for (let i = 1; ; i++) {
        let es = document.querySelectorAll(`.ol.deep` + i);
        if (es.length > 0) {
            for (let j = 0; j < es.length; j++) {
                let lis = es[j].querySelectorAll(".li");
                let cnt = 1;
                for (let k = 0; k < lis.length; k++) {
                    if (lis[k].parentNode.classList.contains("deep" + i)) {
                        lis[k].innerHTML = `<div class="liIcon">${cnt++}.</div><div class="liContent">${lis[k].innerHTML}</div>`;
                    }
                }
            }
        }
        else break;
    }
};

let initUl = () => {
    let uls = document.querySelectorAll(".ul");
    for (let i = 0; i < uls; i++) {
        let t = [];
        for (let j = 0; j < uls[i].classList.length; j++) {
            if (uls[i].classList[j].startsWith("deep")) {
                t.push(uls[i].classList[j]);
            }
        }
        console.log(t, uls[i].classList);
        for (let j = 0; j < t.length; j++) {
            uls[i].classList.remove(t[j]);
        }
    }
    for (let i = 0; i < uls.length; i++) setDeep(uls[i], ".ul", 1);
    let ls = [
        "ulSolidRound",
        "ulHollowRound",
        "ulSolidSquare",
        "ulHollowSquare"
    ];
    for (let i = 1; ; i++) {
        let es = document.querySelectorAll(`.ul.deep` + i);
        if (es.length > 0) {
            for (let j = 0; j < es.length; j++) {
                if (i != 1) es[j].classList.add("no-margin-bottom");
                let lis = es[j].querySelectorAll(".li");
                for (let k = 0; k < lis.length; k++) {
                    if (lis[k].parentNode.classList.contains("deep" + i)) {
                        lis[k].innerHTML = `<div class="liIcon ${ls[(i - 1) % 4]}"></div><div class="liContent">${lis[k].innerHTML}</div>`;
                    }
                }
            }
        }
        else break;
    }
};

let a_SrcClick = () => {
    let as = document.querySelectorAll(".a");
    for (let i = 0; i < as.length; i++) {
        as[i].addEventListener("mousedown", (even) => {
            let url = as[i].getAttribute("src");
            if (url != null) {
                if (even.button == 0) window.location.href = url;
                else if (even.button == 1) window.open(url);
            }
        });
    }
};

let showImage = () => {
    let imgs = document.querySelectorAll(".img");
    for (let i = 0; i < imgs.length; i++) {
        let src = imgs[i].getAttribute("src");
        if (src == null) continue;
        let len = window.getComputedStyle(imgs[i]).width;
        len = len.substring(0, len.length - 2);
        var img = new Image();
        img.src = src;
        img.onload = () => {
            imgs[i].style.backgroundImage = `url(${src})`;
            let f = img.width / img.height;
            imgs[i].style.width = Math.min(img.width, len) + "px";
            imgs[i].style.height = img.height * Math.min(img.width, len) / img.width + "px";
        };
    }
};

let main = () => {
    initOl();
    initUl();
    a_SrcClick();
    showImage();
};

export {
    main
};