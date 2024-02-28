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
        let fun = (e) => {
            let src = e.getAttribute("src");
            if (src == null) return;
            var img = new Image();
            img.src = src;
            img.onload = () => {
                e.style.backgroundImage = `url(${src})`;
                let f = img.width / img.height;
                e.style.width = img.width + "px";
                let h = window.getComputedStyle(e).width;
                h = h.substring(0, h.length - 2);
                h = parseFloat(h) / f;
                e.style.height = h + "px";
            };
        };
        fun(imgs[i]);
    }
};

let initTable = () => {
    let tables = document.querySelectorAll('.table');
    let initSingleTable = (e) => {
        let trs = e.querySelectorAll(".tr");
        let ls = [];
        for (let i = 0; i < trs.length; i++) {
            let tbs = trs[i].querySelectorAll(".tr > *");
            if (ls.length == 0) ls.push(tbs.length);
            else {
                if (ls[ls.length - 1] != tbs.length) return;
            }
        }
        for (let i = 0; i < trs.length; i++) {
            let tbs = trs[i].querySelectorAll(".tr > *");
            for (let j = 0; j < tbs.length; j++) {
                tbs[j].innerHTML = `<div class="trSonContent">${tbs[j].innerHTML}</div>`;
            }
        }
        let g = [];
        for (let i = 0; i < trs.length; i++) {
            let tbs = trs[i].querySelectorAll(".tr > *");
            g[i] = tbs;
        }
        let n = ls[0];
        let m = trs.length;
        if (m == 0 || n == 0) return;
        let maxLen = [];
        for (let i = 0; i < n; i++) {
            maxLen[i] = 0;
            for (let j = 0; j < m; j++) {
                let t = window.getComputedStyle(g[j][i]).width;
                maxLen[i] = Math.max(maxLen[i], parseFloat(t.substring(0, t.length - 2)));
            }
        }
        let sumLen = 0;
        for (let i = 0; i < n; i++) sumLen += maxLen[i];
        let lw = getComputedStyle(document.documentElement).getPropertyValue("--table-line-weight");
        lw = parseFloat(lw.substring(0, lw.length - 2));
        sumLen += (10 + lw) * n;
        sumLen += lw;
        for (let i = 0; i < m; i++) trs[i].style.width = sumLen + "px";
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                g[j][i].style.width = maxLen[i] + "px";
            }
        }
    };
    for (let i = 0; i < tables.length; i++) {
        initSingleTable(tables[i]);
    }
};



let initAdmonition = () => {
    let as = document.querySelectorAll(".admonition > .title");
    let svgs = {
        note: `<svg t="1708790026053" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8342" width="100%" height="100%"><path d="M512.761856 230.106112l-360.31488 0L152.446976 871.2448l589.847552 0L742.294528 544.626688l51.291136-48.973824L793.585664 871.2448c0 28.324864-22.966272 51.291136-51.291136 51.291136l-589.847552 0c-28.324864 0-51.291136-22.966272-51.291136-51.291136l0-641.138688c0-28.325888 22.966272-51.291136 51.291136-51.291136L563.289088 178.814976l1.276928 1.277952L512.761856 230.106112zM806.509568 152.706048c15.490048 0.776192 30.027776 7.675904 40.445952 19.171328 13.686784 10.894336 22.514688 26.747904 24.594432 44.115968-1.62816 18.169856-10.317824 34.987008-24.205312 46.83264-14.263296 14.738432-126.02368 125.159424-332.102656 328.269824l-15.777792 15.552512c-23.629824 7.300096-80.217088 25.483264-122.993664 39.281664 13.774848-45.48096 30.304256-100.427776 37.666816-126.399488 44.053504-44.003328 335.307776-334.820352 346.377216-345.726976 12.335104-12.284928 28.663808-19.74784 46.031872-21.050368M806.546432 101.465088c-30.954496 1.214464-60.319744 14.062592-82.221056 35.989504C712.329216 149.300224 372.349952 488.790016 372.349952 488.790016c-2.679808 2.705408-4.608 6.048768-5.597184 9.730048-9.203712 34.035712-55.360512 185.116672-55.824384 186.61888-2.354176 7.713792-0.25088 16.104448 5.459968 21.801984 4.007936 4.032512 9.46688 6.286336 15.152128 6.273024 2.229248 0.013312 4.458496-0.324608 6.587392-0.989184 1.577984-0.526336 157.492224-50.939904 183.149568-58.60352 3.381248-1.01376 6.462464-2.842624 8.979456-5.310464 16.191488-15.978496 328.671232-323.611648 353.902592-349.745152 26.145792-26.923008 39.156736-55.022592 38.656-83.34848-1.990656-31.118336-16.57856-60.094464-40.3968-80.2304-19.871744-20.774912-47.19616-32.80896-75.933696-33.434624l0 0L806.546432 101.465088z" p-id="8343" fill="var(--admonition-note-color)"></path></svg>`,
        abstract: `<svg t="1708790152604" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9665" width="100%" height="100%"><path d="M877.353086 1017.679012H146.646914c-27.812346 0-49.935802-24.019753-49.935803-53.096296v-783.802469c0-29.076543 22.123457-53.096296 49.935803-53.096296h730.706172c27.812346 0 49.935802 24.019753 49.935803 53.096296v783.802469c0 29.076543-22.123457 53.096296-49.935803 53.096296zM146.646914 175.723457s-1.896296 1.896296-1.896297 5.05679v783.802469c0 3.160494 1.264198 5.05679 1.896297 5.05679h730.706172s1.896296-1.896296 1.896297-5.05679v-783.802469c0-3.160494-1.264198-4.424691-1.896297-5.05679H146.646914z m730.706172 0z" fill="var(--admonition-abstract-color)" p-id="9666"></path><path d="M725.017284 408.335802H298.350617c-13.274074 0-24.019753-10.745679-24.019753-24.019753 0-13.274074 10.745679-24.019753 24.019753-24.019753h426.034568c13.274074 0 24.019753 10.745679 24.019753 24.019753 0.632099 13.274074-10.11358 24.019753-23.387654 24.019753zM725.017284 611.871605H298.350617c-13.274074 0-24.019753-10.745679-24.019753-24.019753 0-13.274074 10.745679-24.019753 24.019753-24.019753h426.034568c13.274074 0 24.019753 10.745679 24.019753 24.019753 0.632099 13.274074-10.11358 24.019753-23.387654 24.019753zM725.017284 816.039506H298.350617c-13.274074 0-24.019753-10.745679-24.019753-24.019753s10.745679-24.019753 24.019753-24.019753h426.034568c13.274074 0 24.019753 10.745679 24.019753 24.019753s-10.11358 24.019753-23.387654 24.019753z" fill="var(--admonition-abstract-color)" p-id="9667"></path><path d="M316.681481 175.723457c-13.274074 0-24.019753-10.745679-24.019753-24.019753V30.340741C292.661728 17.066667 303.407407 6.320988 316.681481 6.320988s24.019753 10.745679 24.019754 24.019753V151.703704c0 13.274074-10.745679 24.019753-24.019754 24.019753zM707.318519 175.723457c-13.274074 0-24.019753-10.745679-24.019754-24.019753V30.340741c0-13.274074 10.745679-24.019753 24.019754-24.019753 13.274074 0 24.019753 10.745679 24.019753 24.019753V151.703704c0 13.274074-10.745679 24.019753-24.019753 24.019753z" fill="var(--admonition-abstract-color)" p-id="9668"></path></svg>`,
        info: `<svg t="1708791296165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6148" width="100%" height="100%"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="6149" fill="var(--admonition-info-color)"></path><path d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" p-id="6150" fill="var(--admonition-info-color)"></path><path d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" p-id="6151" fill="var(--admonition-info-color)"></path></svg>`,
        tip: `<svg t="1708790261041" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11804" width="100%" height="100%"><path d="M706.403656 773.268396v125.662658a39.435245 39.435245 0 0 1-39.846375 39.815732H614.217418a105.241518 105.241518 0 0 1-24.72651 37.305543 109.537951 109.537951 0 0 1-154.972879 0.284726 114.117832 114.117832 0 0 1-25.040602-37.590269h-52.051306a39.836161 39.836161 0 0 1-40.108119-39.815732v-125.662658a317.556763 317.556763 0 0 1-43.209467-36.761626 326.65524 326.65524 0 0 1-98.983921-234.756282c0-88.354561 35.251172-172.240323 98.983921-235.041009a337.182456 337.182456 0 0 1 237.7657-97.34068c89.849694 0 175.157811 34.794077 238.286634 97.34068 63.442916 62.805793 98.696642 146.683893 98.696642 235.041009a327.547724 327.547724 0 0 1-98.696642 234.756282 305.831909 305.831909 0 0 1-43.757213 36.761626zM511.874235 463.046849a89.275134 89.275134 0 0 1 21.60218-11.51929 120.508216 120.508216 0 0 1 45.515367-8.673302 117.104267 117.104267 0 0 1 45.198721 8.673302 122.700482 122.700482 0 0 1 38.958999 25.551322c9.108691 9.242755 9.108691 23.817428 0 33.655172-9.660269 8.698839-25.015066 8.698839-34.123758 0a73.090417 73.090417 0 0 0-22.757683-15.714855 78.082705 78.082705 0 0 0-27.272449-5.048467 77.177454 77.177454 0 0 0-27.32352 5.048467 69.798827 69.798827 0 0 0-22.727041 15.714855c-9.134227 8.698839-24.463488 8.698839-34.149293 0a70.077169 70.077169 0 0 0-22.72704-15.714855 74.49362 74.49362 0 0 0-27.036241-5.048467 75.983646 75.983646 0 0 0-27.299261 5.048467 69.298321 69.298321 0 0 0-22.47168 15.714855c-9.658992 8.698839-25.015066 8.698839-34.123758 0-9.370435-9.83136-9.370435-24.412416 0-33.655172a113.102776 113.102776 0 0 1 38.665335-25.551322 118.2802 118.2802 0 0 1 45.226811-8.673302 124.115176 124.115176 0 0 1 45.777111 8.673302c7.40544 2.537002 14.227383 6.756826 21.078691 11.51929z m23.859562-348.06973c0 12.89568-10.2144 23.247975-23.859562 23.247974-13.098691 0-23.886375-10.354848-23.886375-23.247974v-75.458882a24.088109 24.088109 0 0 1 23.886375-23.84807 23.7089 23.7089 0 0 1 23.859562 23.842963v75.458881z m193.40073 63.090519c-6.824496 11.4912-21.60218 15.714855-32.99379 8.956752-11.654631-6.135024-15.329261-20.736509-8.531577-32.255799l38.113757-65.627521c6.247382-11.4912 21.340436-15.118589 32.968253-8.414112 11.39161 6.472099 15.093053 20.762045 8.530301 32.826529l-38.086944 64.514151z m134.524926 150.903718a24.331978 24.331978 0 0 1-32.705232-8.983565 22.577655 22.577655 0 0 1 9.081879-31.97235l65.990132-37.848183a24.09194 24.09194 0 0 1 32.705232 8.412836 23.851901 23.851901 0 0 1-8.818857 32.516266l-66.253154 37.874996z m40.397953 196.648908c-13.124227 0-23.6208-10.951114-23.6208-24.413693a23.383316 23.383316 0 0 1 23.6208-23.299047h77.03956a23.416512 23.416512 0 0 1 23.6208 23.299047c0 13.462579-10.552752 24.413693-23.6208 24.413693h-77.03956z m-64.021306 189.860163a23.200733 23.200733 0 0 1-9.081879-32.541802 24.741831 24.741831 0 0 1 32.705232-8.414112l66.253154 38.134186c11.39161 6.756826 15.38161 20.787581 8.818857 31.972349a24.06768 24.06768 0 0 1-32.705232 9.009101l-65.990132-38.154615z m-679.975173-40.950807a25.099335 25.099335 0 0 1 32.995066 8.414112 23.860839 23.860839 0 0 1-8.820134 32.541802l-66.535326 38.159723c-11.39161 6.704477-25.880736 2.225462-32.706509-9.009101-6.535939-11.184768-2.545939-25.215524 9.370435-31.97235l65.700299-38.134186z m-40.369863-196.627203c13.361712 0 24.149396 10.381661 24.149396 23.299047a24.279629 24.279629 0 0 1-24.148119 24.413693H43.174993a24.06002 24.06002 0 0 1-23.886375-24.413693 23.459924 23.459924 0 0 1 23.886375-23.299047h76.516071z m64.544795-189.892083c11.36352 6.73129 15.356074 21.305962 8.820134 31.972349a24.186423 24.186423 0 0 1-32.995066 8.983565l-66.277412-37.869888a23.980858 23.980858 0 0 1-8.793322-32.516266 24.468596 24.468596 0 0 1 32.9657-8.412836l66.277412 37.848183z m152.138383-133.24685a23.480352 23.480352 0 0 1-8.241744 32.255799 24.344746 24.344746 0 0 1-33.258087-8.956752l-38.401037-65.078497a23.582496 23.582496 0 0 1 9.107414-32.257076c11.36352-6.419751 26.143757-3.080918 32.417953 8.414112l38.375501 65.627521z m308.580859 563.543778l1.705805-1.138905a265.398206 265.398206 0 0 0 46.621076-36.73609 250.089374 250.089374 0 0 0 0-357.338022 258.961857 258.961857 0 0 0-362.575455 0c-48.349863 47.369281-75.386104 110.776447-75.386104 178.656243a250.508164 250.508164 0 0 0 75.386104 178.681779 265.620369 265.620369 0 0 0 46.644058 36.73609l1.418525 1.138905a262.97867 262.97867 0 0 0 266.188545 0zM397.822797 814.509037v45.148925h44.649696c22.179293 0 40.396676 17.682403 40.396676 39.273092v1.138906c0 7.27776 2.80896 15.118589 8.530301 20.192592v0.545194a31.067098 31.067098 0 0 0 20.474765 7.870195c7.926375 0 15.039427-3.365645 21.025066-8.414112a27.180519 27.180519 0 0 0 8.268557-20.192593v-1.138905c0-21.590688 18.452314-39.273092 40.346881-39.273092h44.675232V814.509037a346.759733 346.759733 0 0 1-228.364621 0z" fill="var(--admonition-tip-color)" p-id="11805"></path></svg>`,
        success: `<svg t="1708790345447" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12869" width="100%" height="100%"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" fill="var(--admonition-success-color)" p-id="12870"></path><path d="M701.866667 381.866667L448 637.866667 322.133333 512c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l149.333334 149.333333c6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l277.333333-277.333333c12.8-12.8 12.8-32 0-44.8-14.933333-12.8-36.266667-12.8-49.066666-2.133333z" fill="var(--admonition-success-color)" p-id="12871"></path></svg>`,
        question: `<svg t="1708790395079" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13852" width="100%" height="100%"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="13853" fill="var(--admonition-question-color)"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7c0-19.7 12.4-37.7 30.9-44.8 59-22.7 97.1-74.7 97.1-132.5 0.1-39.3-17.1-76-48.3-103.3z" p-id="13854" fill="var(--admonition-question-color)"></path><path d="M512 732m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" p-id="13855" fill="var(--admonition-question-color)"></path></svg>`,
        warning: `<svg t="1708790463704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14878" width="100%" height="100%"><path d="M522.656 388.064a32 32 0 0 0-32 32v160a32 32 0 0 0 64 0v-160a32 32 0 0 0-32-32M522.656 676.064a32 32 0 1 0 0 64 32 32 0 0 0 0-64" fill="var(--admonition-warning-color)" p-id="14879"></path><path d="M714.656 795.616H203.072l127.584-221.888 33.152-57.664 158.848-276.224 158.816 276.224 33.184 57.696 127.552 221.856h-127.552z m194.528-11.968L566.528 187.712c-10.144-17.6-26.112-27.712-43.872-27.712s-33.728 10.112-43.84 27.712L136.096 783.648c-10.048 17.568-10.784 36.48-1.92 51.84 8.896 15.328 25.6 24.128 45.824 24.128H865.344c20.16 0 36.864-8.8 45.76-24.128 8.896-15.36 8.192-34.24-1.92-51.84z" fill="var(--admonition-warning-color)" p-id="14880"></path></svg>`,
        failure: `<svg t="1708790505502" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15912" width="100%" height="100%"><path d="M51.2 512C51.2 257.501288 257.501288 51.2 512 51.2s460.8 206.301288 460.8 460.8c0 254.498712-206.301288 460.8-460.8 460.8S51.2 766.498712 51.2 512zM0 512c0 282.771525 229.228475 512 512 512 282.771525 0 512-229.228475 512-512 0-282.771525-229.228475-512-512-512C229.228475 0 0 229.228475 0 512z" fill="var(--admonition-failure-color)" p-id="15913"></path><path d="M714.32678 309.282712c19.447322 19.447322 19.447322 50.991729 0 70.439051L379.721763 714.32678c-19.456 19.456-50.991729 19.456-70.447729 0-19.447322-19.447322-19.447322-50.991729 0-70.439051L643.887729 309.282712C663.335051 289.826712 694.879458 289.826712 714.32678 309.282712z" fill="var(--admonition-failure-color)" p-id="15914"></path><path d="M379.721763 309.282712l334.605017 334.605017c19.447322 19.456 19.447322 50.991729 0 70.439051-19.456 19.456-50.991729 19.456-70.447729 0L309.282712 379.721763c-19.447322-19.447322-19.447322-50.991729 0-70.439051C328.730034 289.826712 360.274441 289.826712 379.721763 309.282712z" fill="var(--admonition-failure-color)" p-id="15915"></path></svg>`,
        danger: `<svg t="1708790559210" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16955" width="100%" height="100%"><path d="M616.244855 791.310592l289.465623 144.267433-41.884093 82.837429L512 843.43302l-351.826385 175.913192-41.884093-82.837429L407.755145 791.310592l-288.534865-144.267433 41.884093-82.837429L512 739.188165l351.826385-175.913192 40.953335 83.768186-288.534865 144.267433zM791.227289 298.939805v26.991972l-93.075763 93.075763v93.075763l-186.151526 93.075763-186.151526-93.075763v-93.075763l-93.075763-93.075763V279.393895a269.919713 269.919713 0 0 1 279.227289-279.227289 287.604108 287.604108 0 0 1 279.227289 298.773199z m-352.757142-46.537881a73.529853 73.529853 0 1 0-73.529853 73.529853 73.529853 73.529853 0 0 0 73.529853-73.529853zM465.462118 419.00754h-46.537881v93.075763H465.462118v-93.075763z m139.613645 0H558.537882v93.075763h46.537881v-93.075763z m126.583038-166.605616a73.529853 73.529853 0 1 0-73.529853 73.529853 73.529853 73.529853 0 0 0 73.529853-73.529853z" p-id="16956" fill="var(--admonition-danger-color)"></path></svg>`,
        bug: `<svg t="1708790604465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17997" width="100%" height="100%"><path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 34.8-28.2 63-63 63H232c-34.8 0-63-28.2-63-63 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5 0.2 13 0.7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7 6 17.2 13.6 33.6 22.7 49 24.3 41.5 59 76.2 100.5 100.5S460.5 960 512 960s99.8-13.9 141.3-38.2c41.5-24.3 76.2-59 100.5-100.5 9.1-15.5 16.7-31.9 22.7-49C812.1 793.1 836 831.8 836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7 0.4-6.4 0.7-12.8 0.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM716 680c0 36.8-9.7 72-27.8 102.9-17.7 30.3-43 55.6-73.3 73.3-20.1 11.8-42 20-64.9 24.3V484c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v396.5c-22.9-4.3-44.8-12.5-64.9-24.3-30.3-17.7-55.6-43-73.3-73.3C317.7 752 308 716.8 308 680V412h408v268z" p-id="17998" fill="var(--admonition-bug-color)"></path><path d="M304 280h56c4.4 0 8-3.6 8-8 0-28.3 5.9-53.2 17.1-73.5 10.6-19.4 26-34.8 45.4-45.4C450.9 142 475.7 136 504 136h16c28.3 0 53.2 5.9 73.5 17.1 19.4 10.6 34.8 26 45.4 45.4C650 218.9 656 243.7 656 272c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1-17.2-31.5-42.5-56.8-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9-31.5 17.2-56.8 42.5-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z" p-id="17999" fill="var(--admonition-bug-color)"></path></svg>`,
        example: `<svg t="1708790662726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19058" width="100%" height="100%"><path d="M769.642871 459.444604h251.230533C997.806026 218.464462 802.968636 23.635068 561.988494 0.559694v251.238529a262.704255 262.704255 0 0 1 207.654377 207.646381z m-310.198267-207.646381V0.559694C218.464462 23.635068 23.635068 218.464462 0.559694 459.444604h251.238529a262.704255 262.704255 0 0 1 207.646381-207.646381z m102.54389 517.844648v251.230533c243.546738-23.067378 435.817532-217.904768 461.451506-461.44351H772.209467c-23.075374 107.669086-105.110486 189.704199-210.220973 210.212977zM251.798223 561.988494H0.559694c23.075374 243.546738 217.904768 435.817532 461.451505 461.451506V772.209467c-107.669086-23.075374-189.704199-105.110486-210.212976-210.220973z" p-id="19059" fill="var(--admonition-example-color)"></path></svg>`,
        quote: `<svg t="1708790719214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20081" width="100%" height="100%"><path d="M512 1024c282.304 0 512-229.696 512-512S794.304 0 512 0 0 229.696 0 512s229.696 512 512 512z m0-992c264.672 0 480 215.328 480 480s-215.328 480-480 480S32 776.672 32 512 247.328 32 512 32z" fill="var(--admonition-quote-color)" p-id="20082"></path><path d="M343.488 436.672c16.224 5.28 33.088 2.848 48.992-7.104a16 16 0 0 0-16.992-27.104c-7.712 4.8-15.136 6.016-22.016 3.808-7.328-2.4-14.24-8.576-20.032-17.856a36.32 36.32 0 0 1 11.584-50.336c19.776-12.48 45.504-5.344 62.176 7.168 28.192 21.088 40.8 57.76 40.8 118.752 0 90.048-40.96 202.016-119.264 241.728a16.032 16.032 0 1 0 14.528 28.544C437.184 686.624 480 560.736 480 464c0-71.104-17.024-116.96-53.6-144.384-30.464-22.944-70.016-26.368-98.336-8.672a67.968 67.968 0 0 0-30.432 42.72 67.968 67.968 0 0 0 8.672 51.712c9.824 15.68 22.656 26.496 37.184 31.296zM599.488 436.672c16.192 5.28 33.088 2.848 48.992-7.104a16 16 0 0 0-16.992-27.104c-7.68 4.8-15.136 6.016-22.016 3.808-7.328-2.4-14.24-8.576-20.032-17.856a36.32 36.32 0 0 1 11.584-50.336c19.808-12.48 45.536-5.344 62.176 7.168 28.192 21.088 40.8 57.76 40.8 118.752 0 90.048-40.96 202.016-119.264 241.728a16.032 16.032 0 1 0 14.528 28.544C693.184 686.624 736 560.736 736 464c0-71.104-17.024-116.96-53.6-144.384-30.464-22.944-70.016-26.368-98.336-8.672a67.968 67.968 0 0 0-30.432 42.72 67.968 67.968 0 0 0 8.672 51.712c9.824 15.68 22.656 26.496 37.184 31.296z" fill="var(--admonition-quote-color)" p-id="20083"></path></svg>`,
    };

    let detailsButton = (color) => {
        return `<svg t="1708791772674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10006" width="100%" height="100%"><path d="M374.1740759 703.57949928a24.41125145 24.41125145 0 0 0 31.53933641 37.30039208L682.39053355 507.26421736 405.71341231 273.64854336a24.41125145 24.41125145 0 0 0-31.53933641 37.30039154L606.71565485 507.26421736 374.1740759 703.57949928z" p-id="10007" fill="${color}"></path></svg>`;
    };

    for (let i = 0; i < as.length; i++) {
        let cls = as[i].parentNode.classList;
        let mo;
        for (let j = 0; j < cls.length; j ++) {
            if (svgs[cls[j]] != undefined) {
                mo = cls[j];
                break;
            }
        }
        let button = `<div class="button"></div>`;
        if (cls.contains("details")) {
            button = `<div class="button">${detailsButton(`var(--admonition-${mo}-color)`)}</div>`;
        }
        as[i].innerHTML = `<div class="icon">${svgs[mo]}</div><div class="content">${as[i].innerHTML}</div>${button}`;
    }
};

let buttonDetails = () => {
    let as = document.querySelectorAll(".details");
    for (let i = 0; i < as.length; i ++) {
        let content = as[i].querySelector(".details > .content");
        content.style.setProperty("max-height", "0");
        content.style.setProperty("padding-top", "0");
        content.style.setProperty("padding-bottom", "0");
        let e = as[i].querySelector(".details > .title");
        let br = getComputedStyle(document.querySelector(":root")).getPropertyValue("--admonition-border-radius");
        e.style.setProperty("border-radius", br);
        let f = (details) => {
            let e = details.querySelector(".title");
            let cnt = 0;
            // 如果活着的东西调用了函数的内部变量时，函数就一直存活，直到没有活着的东西调用后就销毁
            e.addEventListener("click", () => {
                cnt ++;
                let button = e.querySelector(".title > .button");
                if (cnt % 2 == 1) {
                    button.setAttribute("style", "transform: rotate(90deg)");
                    let content = details.querySelector(".details > .content");
                    content.style.setProperty("max-height", "unset");
                    content.style.setProperty("padding-top", "10px");
                    content.style.setProperty("padding-bottom", "10px");
                    let br = getComputedStyle(document.querySelector(":root")).getPropertyValue("--admonition-border-radius");
                    e.style.setProperty("border-radius", `${br} ${br} 0 0`);
                }
                else {
                    button.setAttribute("style", "transform: rotate(0deg)");
                    let content = details.querySelector(".details > .content");
                    content.style.setProperty("max-height", "0");
                    content.style.setProperty("padding-top", "0");
                    content.style.setProperty("padding-bottom", "0");
                    let br = getComputedStyle(document.querySelector(":root")).getPropertyValue("--admonition-border-radius");
                    e.style.setProperty("border-radius", br);
                }
            });
        };
        f(as[i]);
    }
};

let codeBlock = () => {
    let cbs = document.querySelectorAll(".codeBlock");
    let deal = (e) => {
        let s = e.innerHTML;
        // let reg = /<!--.*?\n(.*)\n.*?-->/gs;
        // s = reg.exec(s)[1];
        // s = s.replace(/&/g, '&amp;')
        // s = s.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        // s = s.replace(/ /g, '&nbsp;')
        // s = s.replace(/</g, '&lt;')
        // s = s.replace(/>/g, '&gt;')
        // s = s.replace(/"/g, '&quot;')
        console.log(s);
        e.innerHTML = `<pre><code class="${e.getAttribute("lang")}">${s}</code></pre>`
    };
    for (let i = 0; i < cbs.length; i ++) {
        deal(cbs[i]);
    }
};

let main = () => {
    initOl();
    initUl();
    a_SrcClick();
    showImage();
    initTable();
    initAdmonition();
    buttonDetails();
    codeBlock();
    window.onresize = () => {
        showImage();
    };
};

export {
    main
};