'use strict';

angular.module('ngLocale', [], ['$provide', function ($provide) {
    var PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
    var lang = window.navigator.userLanguage || window.navigator.language;
    lang = lang.toLowerCase();
    if (lang === 'pl') {
        $provide.value('$locale', {
            'DATETIME_FORMATS': {
                'AMPMS': [
                    'AM',
                    'PM'
                ],
                'DAY': [
                    'niedziela',
                    'poniedzia\u0142ek',
                    'wtorek',
                    '\u015broda',
                    'czwartek',
                    'pi\u0105tek',
                    'sobota'
                ],
                'MONTH': [
                    'Stycze\u0144',
                    'Luty',
                    'Marzec',
                    'Kwiecie\u0144',
                    'Maj',
                    'Czerwiec',
                    'Lipiec',
                    'Sierpie\u0144',
                    'Wrzesie\u0144',
                    'Pa\u017adziernik',
                    'Listopad',
                    'Grudzie\u0144'
                ],
                'SHORTDAY': [
                    'niedz.',
                    'pon.',
                    'wt.',
                    '\u015br.',
                    'czw.',
                    'pt.',
                    'sob.'
                ],
                'SHORTMONTH': [
                    'sty',
                    'lut',
                    'mar',
                    'kwi',
                    'maj',
                    'cze',
                    'lip',
                    'sie',
                    'wrz',
                    'pa\u017a',
                    'lis',
                    'gru'
                ],
                'fullDate': 'EEEE, d MMMM y',
                'longDate': 'd MMMM y',
                'medium': 'd MMM y HH:mm:ss',
                'mediumDate': 'd MMM y',
                'mediumTime': 'HH:mm:ss',
                'short': 'dd.MM.yyyy HH:mm',
                'shortDate': 'dd.MM.yyyy',
                'shortTime': 'HH:mm'
            },
            'NUMBER_FORMATS': {
                'CURRENCY_SYM': 'z\u0142',
                'DECIMAL_SEP': ',',
                'GROUP_SEP': '\u00a0',
                'PATTERNS': [
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'macFrac': 0,
                        'maxFrac': 3,
                        'minFrac': 0,
                        'minInt': 1,
                        'negPre': '-',
                        'negSuf': '',
                        'posPre': '',
                        'posSuf': ''
                    },
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'macFrac': 0,
                        'maxFrac': 2,
                        'minFrac': 2,
                        'minInt': 1,
                        'negPre': '(',
                        'negSuf': '\u00a0\u00a4)',
                        'posPre': '',
                        'posSuf': '\u00a0\u00a4'
                    }
                ]
            },
            'id': 'pl-pl',
            'pluralCat': function (n) {
                if (n === 1) {
                    return PLURAL_CATEGORY.ONE;
                }
                if (n === (n || 0) && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
                    return PLURAL_CATEGORY.FEW;
                }
                if (n !== 1 && (n % 10 === 0 || n % 10 === 1) || n === (n || 0) && n % 10 >= 5 && n % 10 <= 9 || n === (n || 0) && n % 100 >= 12 && n % 100 <= 14) {
                    return PLURAL_CATEGORY.MANY;
                }
                return PLURAL_CATEGORY.OTHER;
            }
        });
    } else {
        $provide.value('$locale', {
            'DATETIME_FORMATS': {
                'AMPMS': [
                    'AM',
                    'PM'
                ],
                'DAY': [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                'MONTH': [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                'SHORTDAY': [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat'
                ],
                'SHORTMONTH': [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                'fullDate': 'EEEE, MMMM d, y',
                'longDate': 'MMMM d, y',
                'medium': 'MMM d, y h:mm:ss a',
                'mediumDate': 'MMM d, y',
                'mediumTime': 'h:mm:ss a',
                'short': 'M/d/yy h:mm a',
                'shortDate': 'M/d/yy',
                'shortTime': 'h:mm a'
            },
            'NUMBER_FORMATS': {
                'CURRENCY_SYM': '$',
                'DECIMAL_SEP': '.',
                'GROUP_SEP': ',',
                'PATTERNS': [
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'macFrac': 0,
                        'maxFrac': 3,
                        'minFrac': 0,
                        'minInt': 1,
                        'negPre': '-',
                        'negSuf': '',
                        'posPre': '',
                        'posSuf': ''
                    },
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'macFrac': 0,
                        'maxFrac': 2,
                        'minFrac': 2,
                        'minInt': 1,
                        'negPre': '(\u00a4',
                        'negSuf': ')',
                        'posPre': '\u00a4',
                        'posSuf': ''
                    }
                ]
            },
            'id': 'en',
            'pluralCat': function (n) {
                if (n === 1) {
                    return PLURAL_CATEGORY.ONE;
                }
                return PLURAL_CATEGORY.OTHER;
            }
        });
    }
}]);