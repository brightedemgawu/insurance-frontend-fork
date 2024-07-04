function withOpacity(variableName: any) {
    return ({opacityValue}: { opacityValue: any }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`
        }
        return `rgb(var(${variableName}))`
    }
}


module.exports = {
    theme: {
        backgroundImage: {},
        transitionProperty: {
            'width': 'width',
            'left': 'left',
            'transform': 'transform',
        },
        colors: {
            gray: {
                DEFAULT: withOpacity('--gray-100'),
                50: withOpacity('--gray-50'),
                100: withOpacity('--gray-100'),
                200: withOpacity('--gray-200'),
                300: withOpacity('--gray-300'),
                400: withOpacity('--gray-400'),
                500: withOpacity('--gray-500'),
                600: withOpacity('--gray-600'),
                700: withOpacity('--gray-700'),
                800: withOpacity('--gray-800'),
                900: withOpacity('--gray-900'),
                950: withOpacity('--gray-950'),
                white: withOpacity('--base-white'),
                black: withOpacity('--base-black'),

                surface: {
                    DEFAULT: withOpacity('--gray-50'),
                },

                border: {
                    DEFAULT: withOpacity('--gray-200'),
                    disabled: withOpacity('--gray-200'),
                    darker: withOpacity('--gray-400'),
                },
                text: {
                    DEFAULT: withOpacity('--base-black'),
                    caption: withOpacity('--gray-700'),
                }
            },
            primary: {
                50: withOpacity('--purple-50'),
                100: withOpacity('--purple-100'),
                200: withOpacity('--purple-200'),
                300: withOpacity('--purple-300'),
                400: withOpacity('--purple-400'),
                500: withOpacity('--purple-500'),
                600: withOpacity('--purple-600'),
                700: withOpacity('--purple-700'),
                800: withOpacity('--purple-800'),
                900: withOpacity('--purple-900'),
                950: withOpacity('--purple-950'),
                surface: {
                    DEFAULT: withOpacity('--purple-500'),
                    lighter: withOpacity('--purple-200'),
                    darker: withOpacity('--purple-700'),
                },
                border: {
                    DEFAULT: withOpacity('--purple-500'),
                    disabled: withOpacity('--purple-100'),
                    darker: withOpacity('--purple-700'),
                },
                text: {
                    DEFAULT: withOpacity('--purple-500'),
                    caption: withOpacity('--purple-300'),
                }
            },
            error: {
                50: withOpacity('--red-50'),
                100: withOpacity('--red-100'),
                200: withOpacity('--red-200'),
                300: withOpacity('--red-300'),
                400: withOpacity('--red-400'),
                500: withOpacity('--red-500'),
                600: withOpacity('--red-600'),
                700: withOpacity('--red-700'),
                800: withOpacity('--red-800'),
                900: withOpacity('--red-900'),
                950: withOpacity('--red-950'),
                surface: {
                    DEFAULT: withOpacity('--red-500'),
                    lighter: withOpacity('--red-200'),
                    darker: withOpacity('--red-700'),
                },
                border: {
                    DEFAULT: withOpacity('--red-500'),
                    disabled: withOpacity('--red-100'),
                    darker: withOpacity('--red-700'),
                },
                text: {
                    DEFAULT: withOpacity('--red-500'),
                    caption: withOpacity('--red-300'),
                }
            },
            warning: {
                50: withOpacity('--orange-50'),
                100: withOpacity('--orange-100'),
                200: withOpacity('--orange-200'),
                300: withOpacity('--orange-300'),
                400: withOpacity('--orange-400'),
                500: withOpacity('--orange-500'),
                600: withOpacity('--orange-600'),
                700: withOpacity('--orange-700'),
                800: withOpacity('--orange-800'),
                900: withOpacity('--orange-900'),
                950: withOpacity('--orange-950'),
                surface: {
                    DEFAULT: withOpacity('--orange-500'),
                    lighter: withOpacity('--orange-200'),
                    darker: withOpacity('--orange-700'),
                },
                border: {
                    DEFAULT: withOpacity('--orange-500'),
                    disabled: withOpacity('--orange-100'),
                    darker: withOpacity('--orange-700'),
                },
                text: {
                    DEFAULT: withOpacity('--orange-500'),
                    caption: withOpacity('--orange-300'),
                }
            },
            success: {
                50: withOpacity('--green-50'),
                100: withOpacity('--green-100'),
                200: withOpacity('--green-200'),
                300: withOpacity('--green-300'),
                400: withOpacity('--green-400'),
                500: withOpacity('--green-500'),
                600: withOpacity('--green-600'),
                700: withOpacity('--green-700'),
                800: withOpacity('--green-800'),
                900: withOpacity('--green-900'),
                950: withOpacity('--green-950'),
                surface: {
                    DEFAULT: withOpacity('--green-500'),
                    lighter: withOpacity('--green-200'),
                    darker: withOpacity('--green-700'),
                },
                border: {
                    DEFAULT: withOpacity('--green-500'),
                    disabled: withOpacity('--green-100'),
                    darker: withOpacity('--green-700'),
                },
                text: {
                    DEFAULT: withOpacity('--green-500'),
                    caption: withOpacity('--green-300'),
                }
            }
        },
        fontFamily: {
            inter: ['var(--font-inter)'],
        },
        screens: {
            'xs': '420px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        }
    },
    plugins: [],
};
