'use strict';

import angular from 'angular';

import customAxDtPicker from './dateTimePicker';
import { timePicker, hours, minutes } from './ax-time-picker/axTimePicker';
import doubleCalendar from './ax-double-calendar/axDoubleCalendar';
import rangePanel from './ax-range-panel/axRangePanel';
import absolutePanel from './absolute-panel/absolutePanel';
import pickerService from './pickerService';
import bootstrapService from './custom-bootstrap/bootstrapService';

export default angular
    .module( 'custom-ax-dt-picker', [])
    .service('pickerService', pickerService)
    .service('bootstrapService', bootstrapService)
    .directive('minutes', minutes)
    .directive('hours', hours)
    .directive('axTimePicker', timePicker)
    .directive('axDoubleCalendar', ['$timeout', doubleCalendar])
    .directive('axRangePanel', ['$timeout', 'pickerService', rangePanel])
    .directive('axAbsolutePanel', ['$timeout', absolutePanel])
    .directive('customAxDtPicker', ['$timeout', 'pickerService', 'bootstrapService', customAxDtPicker])
    .name;
