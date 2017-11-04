import template from './axAbsolutePanel.html';
import moment from 'moment';

function axAbsolutePanel($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            observer: '=',
            dictionary: '=',
            hideTimeUnit: '=',
            singleDate: '='
        },
        template: template,
        link: function (scope) {
            /**
             * After a user selects an option that includes a date range or sets a date range with the double calendar,
             * this function verifies which time units are available to select from (hours and days).
             * Up to 36 hours the only time unit available is hours.
             * More than 36 hours and up to 7 days can be retrieved by hours and days.
             * For more days than that the only available unit is days.
             * @param from
             * @param to
             */
                // FIXME: max resolution is now hardcoded to 200 (because of highcharts performance issues), it should be configurable
            function setupAvailableTimeUnits () {
                var hours = moment(scope.internalRange.to).diff(moment(scope.internalRange.from), 'hours');
                if (hours > 36 && hours < 200) {
                    scope.internalRange.selectedRange.timeUnits = [ 'hour', 'day' ];
                } else if (hours > 1 && hours < 4) {
                    scope.internalRange.selectedRange.timeUnits = [ 'minute', 'hour' ];
                } else {
                    delete scope.internalRange.selectedRange.timeUnits;
                }
            }
            /**
             * Executes when a range is selected and emitted by any of the other components
             * @param range
             */
            function onRangeSet(range) {
                scope.internalRange = range;
                setupAvailableTimeUnits();
            }

            $timeout(function () {
                scope.observer.subscribe('absolutePanel', onRangeSet);
            });

            /**
             * Executes when a user selects an available range.
             * @param range
             */
            scope.selectRangeOption = function (range) {
                const newDate = scope.internalRange.changeWithRangeOption(range);
                scope.internalRange = newDate;
                setupAvailableTimeUnits();
                scope.observer.emit('absolutePanel', newDate);
            };

            scope.selectTimeUnit = function (unit) {
                const newDate = scope.internalRange.changeWithTimeUnit(unit);
                scope.internalRange = newDate;
                scope.observer.emit('absolutePanel', newDate);
            };

            scope.updateFrom = function (value) {
                const newDate = scope.internalRange.changeFrom(value);
                scope.internalRange = newDate;
                setupAvailableTimeUnits();
                scope.observer.emit('absolutePanel', newDate);
            };

            scope.updateTo = function (value) {
                const newDate = scope.internalRange.changeTo(value);
                scope.internalRange = newDate;
                setupAvailableTimeUnits();
                scope.observer.emit('absolutePanel', newDate);
            };
        }
    }
}

export default axAbsolutePanel;
