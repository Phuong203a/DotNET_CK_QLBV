import { isMoment } from './constructor';
import { normalizeUnits } from '../units/aliases';
import { createLocal } from '../create/local';

export function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

export function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

export function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
    }
    inclusivity = inclusivity || '()';
    return (
        (inclusivity[0] === '('
            ? this.isAfter(localFrom, units)
            : !this.isBefore(localFrom, units)) &&
        (inclusivity[1] === ')'
            ? this.isBefore(localTo, units)
            : !this.isAfter(localTo, units))
    );
}

export function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return (
            this.clone().startOf(units).valueOf() <= inputMs &&
            inputMs <= this.clone().endOf(units).valueOf()
        );
    }
}

export function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
}

export function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
}