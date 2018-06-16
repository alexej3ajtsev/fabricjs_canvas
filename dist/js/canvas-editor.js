'use strict';

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var canvas = new fabric.Canvas('canvas');
    var modalEditor = document.getElementById('modalNewEditor');
    var canvasContainer = document.getElementById('cContainer');
    var stickersContainer = document.getElementById('stickersContainer');
    var changeCanvasBg = function changeCanvasBg(src) {
        var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        fabric.Image.fromURL(src, function (oImg) {
            for (var f in filters) {
                var curF = filters[f];
                oImg.filters.push(new fabric.Image.filters[curF.name]());
            }
            oImg.applyFilters();
            oImg.scaleToWidth(canvas.width);
            oImg.setControlsVisibility(hideControls);
            canvasContainer.dataset.src = src;
            canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
            canvasContainer.style.width = canvas.width + 'px';
            canvasContainer.style.height = canvas.height + 'px';
        });
    };

    var removeElems = function removeElems() {
        for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
            selectors[_key] = arguments[_key];
        }

        selectors.forEach(function (selector) {
            var elemsToRemove = document.querySelectorAll(selector);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = elemsToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var el = _step.value;

                    el.remove();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });
    };

    var fontSize = 40;

    var textColorOptions = {
        color: "#fff",
        showPaletteOnly: true,
        palette: [["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"], ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
        cancelText: "Отменить",
        chooseText: "Выбрать",
        move: function move(color) {
            var fontColor = color.toHexString();
            canvas.getActiveObject().set("fill", fontColor);
            canvas.renderAll();
        }
    };

    var shadowColorOptions = {
        color: "#444",
        showPaletteOnly: true,
        palette: [["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"], ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
        cancelText: "Отменить",
        chooseText: "Выбрать",
        move: function move(color) {
            var shadowColor = color.toHexString();
            canvas.getActiveObject().set("stroke", shadowColor);
            canvas.renderAll();
        }
    };

    var hideControls = {
        'tl': true,
        'tr': false,
        'bl': true,
        'br': true,
        'ml': true,
        'mt': true,
        'mr': true,
        'mb': true,
        'mtr': true
    };

    var getFontsSelect = function getFontsSelect() {
        var fonts = ['Impact', 'Lobster', 'Times New Roman'];
        var frag = document.createDocumentFragment();
        var result = document.createElement('SELECT');
        result.classList = 'font-change';

        fonts.forEach(function (font) {
            var option = document.createElement('OPTION');
            option.innerText = font;
            option.setAttribute('value', font);
            frag.appendChild(option);
        });

        result.appendChild(frag);

        return result;
    };

    var loadFont = function loadFont(font) {
        var myfont = new FontFaceObserver(font);
        myfont.load().then(function () {
            canvas.getActiveObject().set("fontFamily", font);
            canvas.requestRenderAll();
        }).catch(function (e) {
            console.log(e);
            alert('font loading failed ' + font);
        });
    };

    var getRadioBtn = function getRadioBtn(className, name, value) {
        var checked = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var result = document.createElement('INPUT');
        result.setAttribute("type", "radio");
        result.classList = className;
        if (checked) result.setAttribute('checked', true);
        result.setAttribute('name', name);
        result.setAttribute('value', value);
        return result;
    };

    var getTextPanel = function getTextPanel(textVal) {
        var panel = document.createElement('DIV');
        var tInput = document.createElement("INPUT");
        var textAlignRadios = document.createElement('DIV');
        var fontsSelect = getFontsSelect();
        var frag = document.createDocumentFragment();
        var tColorI = document.createElement("INPUT");
        var shColorI = document.createElement("INPUT");

        tColorI.classList = 'text-color';
        shColorI.classList = 'shadow-color';

        frag.appendChild(getRadioBtn('text-align left', 'itext_align', 'left'));
        frag.appendChild(getRadioBtn('text-align center', 'itext_align', 'center', true));
        frag.appendChild(getRadioBtn('text-align right', 'itext_align', 'right'));

        textAlignRadios.classList = 'text-align-cont';
        textAlignRadios.appendChild(frag);

        panel.classList = 'text-panel';
        panel.style.position = 'absolute';
        panel.style.width = canvas.width / 1.5 > 320 ? 320 + 'px' : canvas.width / 1.5 + 'px';
        panel.style.height = 75 + 'px';
        panel.style.backgroundColor = '#fff';
        panel.style.left = canvas.width / 2 - parseInt(panel.style.width) / 2 + 'px';
        panel.style.top = canvas.height / 2 - parseInt(panel.style.height) / 2 + 'px';

        tInput.setAttribute("type", "text");
        tInput.setAttribute("value", textVal);
        tInput.classList = 'canvas-text-typing';

        panel.appendChild(tInput);
        panel.appendChild(textAlignRadios);
        panel.appendChild(fontsSelect);
        panel.appendChild(tColorI);
        panel.appendChild(shColorI);

        $(tColorI).spectrum(textColorOptions);
        $(shColorI).spectrum(shadowColorOptions);
        return panel;
    };

    var initTextPanel = function initTextPanel(textFieldO) {
        removeElems('.text-panel');
        var panel = getTextPanel(textFieldO.text);
        canvasContainer.appendChild(panel);

        panel.childNodes.forEach(function (node) {
            if (node.nodeName == 'INPUT' && node.classList.contains('canvas-text-typing')) {
                node.addEventListener('keydown', function (ev) {
                    if (ev.which == 8 || ev.keyCode == 8) {
                        if (ev.target.value.slice(-4) == '<br>') {
                            ev.preventDefault();
                            ev.target.value = ev.target.value.substring(0, ev.target.value.length - 4);
                        }
                    }
                });
                node.addEventListener('keyup', function (ev) {
                    if (textFieldO.width >= canvas.width) {
                        ev.preventDefault();
                        var lastChars = ev.target.value.slice(-3);
                        ev.target.value = ev.target.value.substring(0, ev.target.value.length - 3);
                        ev.target.value += '<br>' + lastChars + String.fromCharCode(ev.keyCode);
                    }

                    if (ev.which == 13 || ev.keyCode == 13) {
                        ev.preventDefault();
                        ev.target.value += '<br>';
                    }

                    var r = new RegExp(/<br>/, 'g');
                    textFieldO.text = ev.target.value.replace(r, "\n");
                    textFieldO.left = canvas.width / 2 - textFieldO.width / 2;
                    canvas.renderAll();
                });
            }

            if (node.nodeName == 'DIV' && node.classList.contains('text-align-cont')) {
                node.childNodes.forEach(function (_node) {
                    _node.addEventListener('change', function (ev) {
                        textFieldO.set('textAlign', ev.target.value);
                        canvas.renderAll();
                    });
                });
            }

            if (node.nodeName == 'SELECT' && node.classList.contains('font-change')) {
                node.addEventListener('change', function (ev) {
                    if (textFieldO.width >= canvas.width) {
                        var lastChars = textFieldO.text.slice(-3);
                        textFieldO.text = textFieldO.text.substring(0, textFieldO.text.length - 3);
                        textFieldO.text += '\n' + lastChars;
                        textFieldO.left = canvas.width / 2 - textFieldO.width / 2;
                        canvas.renderAll();
                    }

                    if (ev.target.value !== 'Times New Roman') {
                        loadFont(ev.target.value);
                    } else {
                        canvas.getActiveObject().set("fontFamily", ev.target.value);
                        textFieldO.left = canvas.width / 2 - textFieldO.width / 2;
                        canvas.renderAll();
                    }
                });
            }
        });
    };

    var addTetxField = function addTetxField(options) {
        var font = options.fontFamily || "Times New Roman";
        var msg = options.msg || 'Введите текст';

        var field = new fabric.Text(msg, {
            left: options.left || 0,
            top: options.top || 0,
            width: options.width || canvas.width,
            fontFamily: "Times New Roman",
            fontSize: options.fontSize || 20,
            fontWeight: options.fontWeight || 'normal',
            fill: options.fill || 'white',
            stroke: options.stroke || '#222',
            strokeWidth: options.strokeWidth || 1,
            textAlign: options.textAlign || 'center',
            lineHeight: options.textAlign || 0.8
        });
        field.on('selected', function () {
            return initTextPanel(field);
        });
        field.on('modified', function () {
            return initTextPanel(field);
        });
        var centerLeft = canvas.width / 2 - field.width / 2;
        field.left = centerLeft;

        if (font != "Times New Roman") {
            var myfont = new FontFaceObserver(font);
            myfont.load().then(function () {
                field.fontFamily = font;
                canvas.add(field);
                // canvas.renderAll.bind(canvas);
            }).catch(function (e) {
                console.log(e);
                alert('font loading failed ' + font);
            });
        } else {
            canvas.add(field);
        }
    };

    var removeActiveObject = function removeActiveObject(ev) {
        removeTextPanels();
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            ev.target.remove();
        }
    };

    var addDeleteBtn = function addDeleteBtn(x, y) {
        removeElems('.deleteBtn');
        var btnLeft = x - 15;
        var btnTop = y - 15;
        var deleteBtn = document.createElement('IMG');

        deleteBtn.setAttribute('src', 'img/icons/closebtn.png');
        deleteBtn.classList = 'deleteBtn';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.top = btnTop + 'px';
        deleteBtn.style.left = btnLeft + 'px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.width = '30px';
        deleteBtn.style.height = '30px';
        deleteBtn.addEventListener('click', removeActiveObject);
        canvasContainer.appendChild(deleteBtn);
    };

    var initSticker = function initSticker(ev) {
        var sticker = ev.target;
        var imgSrc = sticker.dataset.src;

        fabric.Image.fromURL(imgSrc, function (oImg) {
            oImg.left = canvas.width / 2 - oImg.width / 2;
            oImg.top = canvas.height / 2 - oImg.height / 2;
            oImg.scale(0.5);

            oImg.setControlsVisibility(hideControls);
            canvas.add(oImg);
        });
    };

    var memeTemplates = document.getElementsByClassName('meme-template');

    var initTextFields = function initTextFields() {
        var margin = 20;
        var width = canvas.width - margin * 2;
        addTetxField({ top: margin, width: width, fontSize: fontSize, fontFamily: 'Impact' });
        addTetxField({ top: canvas.height - margin - fontSize, width: width, fontSize: fontSize, fontFamily: 'Impact' });
    };

    // START PROCESS HERE >>>>>

    canvas.setWidth(canvasContainer.clientWidth);
    canvas.setHeight(canvasContainer.clientHeight);
    canvas.renderAll.bind(canvas);

    canvasContainer.childNodes.forEach(function (node) {
        if (node.classList && node.classList.contains('section')) $(node).mCustomScrollbar({
            theme: "dark",
            scrollInertia: 200,
            advanced: {
                updateOnContentResize: true,
                updateOnImageLoad: true
            }
        });
    });

    canvas.on('object:selected', function (e) {
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
        e.target.set({
            borderColor: '#6f5fff',
            cornerColor: '#6f5fff',
            cornerSize: 18,
            cornerStyle: 'circle',
            centeredScaling: true,
            cornerStrokeColor: '#6f5fff',
            strokeWidth: 2,
            borderOpacityWhenMoving: 0.8
        });
    });

    canvas.on('mouse:down', function (e) {
        if (!canvas.getActiveObject()) removeElems('.deleteBtn', '.text-panel');
    });

    canvas.on('object:modified', function (e) {
        addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    canvas.on('object:scaling', function (e) {
        removeElems('.deleteBtn', '.text-panel');
    });

    canvas.on('object:rotating', function (e) {
        removeElems('.deleteBtn', '.text-panel');
    });

    canvas.on('object:moving', function (e) {
        removeElems('.deleteBtn', '.text-panel');
    });

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = memeTemplates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var meme = _step2.value;

            meme.addEventListener('click', function (ev) {
                var ratio = ev.target.clientWidth / ev.target.clientHeight;
                var canvasWidth = window.innerWidth < 480 ? window.innerWidth : 480;

                canvas.setWidth(canvasWidth);
                canvas.setHeight(canvasWidth / ratio);
                var src = ev.target.dataset.src;
                removeElems('.deleteBtn', '.text-panel');
                canvas.clear();
                changeCanvasBg(src, {});
                initTextFields();
                $(modalEditor).trigger('showing');
            });
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    setTimeout(function () {
        memeTemplates[1].dispatchEvent(new Event('click'));
    }, 500);

    stickersContainer.childNodes.forEach(function (sticker) {
        var isSticker = sticker.nodeName == 'DIV' && sticker.classList.contains('sticker');

        if (isSticker) {
            sticker.addEventListener('click', initSticker);
            $(sticker).on('click', function (ev) {
                $(ev.target).parents('.section')[0].classList.remove('show');
            });
        }
    });

    $('.back-btn').on('click', function (ev) {
        ev.preventDefault();
        $(ev.target).parents('.section')[0].classList.remove('show');
    });

    var appLyFilters = {};

    $('.filter').on('click', function (ev) {
        var checkBox = $(ev.target).find('input[type=checkbox]');
        if (ev.target.checked !== undefined) {
            if (ev.target.checked) {
                appLyFilters[ev.target.value] = {
                    name: ev.target.value,
                    value: ev.target.dataset.value || null
                };
            } else {
                if (appLyFilters[ev.target.value]) delete appLyFilters[ev.target.value];
            }
        }
        ev.stopPropagation();
    });

    $('#applyFilters').on('click', function (ev) {
        ev.preventDefault();
        changeCanvasBg(canvasContainer.dataset.src, appLyFilters);
        $(ev.target).parent().prev().trigger('click');
    });

    $('#reloadImage').on('click', function () {
        removeElems('.deleteBtn', '.text-panel');
        canvas.clear();
        changeCanvasBg(canvasContainer.dataset.src, {});
        initTextFields();
    });

    $(modalEditor).on('showing', function () {
        modalEditor.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    $('#closeNewEditor').on('click', function (ev) {
        ev.preventDefault();
        modalEditor.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    if ($(window).width() > 991) {
        $('#closeNewEditor').css('right', canvas._offset.left - 60);
    }
});
'use strict';

window.addEventListener('load', function () {
    var rSecBtn = document.getElementById('rightSectBtn');
    var lSecBtn = document.getElementById('leftSectBtn');
    var rSection = document.querySelector('#cContainer .section.right');
    var lSection = document.querySelector('#cContainer .section.left');
    var showCls = 'show';

    rSecBtn.addEventListener('click', function (ev) {
        if (rSection.classList.contains(showCls)) {
            rSection.classList.remove(showCls);
        } else {
            rSection.classList.add(showCls);

            if (lSection.classList.contains(showCls)) lSection.classList.remove(showCls);
        }
    });

    lSecBtn.addEventListener('click', function (ev) {
        if (lSection.classList.contains(showCls)) {
            lSection.classList.remove(showCls);
        } else {
            lSection.classList.add(showCls);

            if (rSection.classList.contains(showCls)) rSection.classList.remove(showCls);
        }
    });
});