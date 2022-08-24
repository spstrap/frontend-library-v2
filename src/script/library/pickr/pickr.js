/*
** 모드
*/
'use strict';

/*
** 클래스 선언
*/
export default class SP_PICKR {

    /*
    ** 초기화
    */
    constructor() {

        const _ = this;

        _.theme = 'classic';
        _.custom = 'sp-pickr';
        _.container = '.pickr-container';
        _.primary = ['--hue', '--saturation', '--lightness', '--alpha'];
        _.texearea = '.sp-variable-data';
        _.range = '.pickr-range';

        _.setPickr();
        _.setBaseColor();
        _.setRange();

    }

    setBaseColor() {

        const _ = this;

        let root = getComputedStyle(document.body);
        let textarea = document.querySelector(_.texearea);
        let variable = `
            --hue: ${root.getPropertyValue(_.primary[0]).trim()};
            --saturation: ${root.getPropertyValue(_.primary[1]).trim()};
            --lightness: ${root.getPropertyValue(_.primary[2]).trim()};
            --alpha: ${root.getPropertyValue(_.primary[3]).trim()};
            --color-text: ${root.getPropertyValue('--color-text').trim()};
            --color-background: ${root.getPropertyValue('--color-background').trim()};
            --color-white: ${root.getPropertyValue('--color-white').trim()};
            --color-black: ${root.getPropertyValue('--color-black').trim()};
            --reverse: ${root.getPropertyValue('--reverse').trim()};
        `;
        variable = variable.replaceAll('            ', '').trim();
        textarea.value = variable;

    }

    setRange() {

        const _ = this;

        let root = getComputedStyle(document.body);
        let container = document.querySelectorAll(_.range);
        let variable, value, tails;

        container.forEach( element => {

            variable = element.dataset.variable;
            element.value = root.getPropertyValue(variable).replaceAll('%', '').trim();
            element.addEventListener('input', function(){
                value = this.value.replaceAll('%', '').trim();
                tails = this.dataset.tails;
                document.documentElement.style.setProperty(variable, value + tails);
                _.setBaseColor();
            });

        });

    }

    setPickr() {

        const _ = this;

        let pickr, hsla = new Array(3);
        let variable, color, root = getComputedStyle(document.body);
        let container = document.querySelectorAll(_.container);
        
        container.forEach( element => {

            variable = element.dataset.variable;
            color = root.getPropertyValue(variable).trim();

            if (variable === 'primary') {
                hsla['h'] = root.getPropertyValue(_.primary[0]).trim();
                hsla['s'] = root.getPropertyValue(_.primary[1]).trim();
                hsla['l'] = root.getPropertyValue(_.primary[2]).trim();
                hsla['a'] = root.getPropertyValue(_.primary[3]).trim();
                color = `hsla(${hsla['h']}, ${hsla['s']}, ${hsla['l']}, ${hsla['a']})`;
            }

            pickr = Pickr.create({
                el: element,
                theme: _.theme,
                appClass: _.custom,
                default: color,
                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgba(233, 30, 99, 0.95)',
                    'rgba(156, 39, 176, 0.9)',
                    'rgba(103, 58, 183, 0.85)',
                    'rgba(63, 81, 181, 0.8)',
                    'rgba(33, 150, 243, 0.75)',
                    'rgba(3, 169, 244, 0.7)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 150, 136, 0.75)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.85)',
                    'rgba(205, 220, 57, 0.9)',
                    'rgba(255, 235, 59, 0.95)',
                    'rgba(255, 193, 7, 1)'
                ],
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsla: true,
                        hsva: false,
                        cmyk: false,
                        input: true,
                        clear: false,
                        save: true
                    }
                },
                variable: variable
            });

            pickr.on('init', instance => {
                //console.log('Event: "init"', instance);
            }).on('hide', instance => {
                //console.log('Event: "hide"', instance);
            }).on('show', (color, instance) => {
                //console.log('Event: "show"', color, instance);
            }).on('save', (color, instance) => {
                //console.log('Event: "save"', color, instance);
            }).on('clear', instance => {
                //console.log('Event: "clear"', instance);
            }).on('change', (color, source, instance) => {

                //console.log('Event: "change"', color, source, instance);
                //console.log( color.toHEXA().toString(3) )
                if (instance.options.variable === 'primary') {
                    console.log(color.toHSLA()[0])
                    console.log(color.toHSLA()[1])
                    console.log(color.toHSLA()[2])
                    console.log(color.toHSLA()[3])
                    document.documentElement.style.setProperty(_.primary[0], color.toHSLA()[0]);
                    document.documentElement.style.setProperty(_.primary[1], color.toHSLA()[1] +'%');
                    document.documentElement.style.setProperty(_.primary[2], color.toHSLA()[2] +'%');
                    document.documentElement.style.setProperty(_.primary[3], color.toHSLA()[3]);
                } else {
                    document.documentElement.style.setProperty(instance.options.variable, color.toHEXA().toString(3));
                }

                _.setBaseColor();

            }).on('changestop', (source, instance) => {
                ///console.log('Event: "changestop"', source, instance);
            }).on('cancel', instance => {
                //console.log('Event: "cancel"', instance);
            }).on('swatchselect', (color, instance) => {
                //console.log('Event: "swatchselect"', color, instance);
            });

            /*
                hsva.toHSVA().toString(3) - Converts the object to a hsva array.
                hsva.toHSLA().toString(3) - Converts the object to a hsla array.
                hsva.toRGBA().toString(3) - Converts the object to a rgba array.
                hsva.toHEXA().toString(3) - Converts the object to a hexa-decimal array.
                hsva.toCMYK().toString(3) - Converts the object to a cmyk array.
            */

        });

    }

}