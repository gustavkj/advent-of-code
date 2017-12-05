const target = 368078;

const sqrt = Math.sqrt(target);
const sqrt_hi = Math.ceil(sqrt);
const sqrt_round = Math.round(sqrt);
const sqrt_lo = sqrt_hi - 1;

const corner_hi = Math.pow(sqrt_hi, 2);
const corner_lo = Math.pow(sqrt_lo, 2) + 1;
const steps_to_middle = (sqrt_hi % 2 === 0 ? (sqrt_hi-2)/2 : Math.floor(sqrt_hi/2))

let steps = Math.floor(sqrt_hi/2); // Steps to middle of spiral from layer

if (sqrt_round === sqrt_hi) {
  steps += Math.abs(target - (corner_hi - steps_to_middle));

} else {
  steps += Math.abs(target - (corner_lo + steps_to_middle));
}

console.log(steps); // 371
