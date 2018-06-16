window.addEventListener('load', () => {
    let rSecBtn = document.getElementById('rightSectBtn');
    let lSecBtn = document.getElementById('leftSectBtn');
    let rSection = document.querySelector('#cContainer .section.right');
    let lSection = document.querySelector('#cContainer .section.left');
    let showCls = 'show';

    rSecBtn.addEventListener('click', ev => {
        if (rSection.classList.contains(showCls)) {
            rSection.classList.remove(showCls);
        } else {
            rSection.classList.add(showCls);

            if (lSection.classList.contains(showCls))
                lSection.classList.remove(showCls);
        }
    });

    lSecBtn.addEventListener('click', ev => {
        if (lSection.classList.contains(showCls)) {
            lSection.classList.remove(showCls);
        } else {
            lSection.classList.add(showCls);

            if (rSection.classList.contains(showCls))
                rSection.classList.remove(showCls);
        }
    });
});