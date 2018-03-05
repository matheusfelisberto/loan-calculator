const R = require('ramda');

/**
 * Calculate a loan by SAC method
 *
 * @param {Number} amount
 * @param {Number} parcels
 * @param {Number} interest
 * @return {Array}
 */
const sac = (amount, parcels, interest) => {
	const unitInterestValue = R.divide(interest, 100);

	const firstMonth = {
		amortization: 0,
		rate: 0,
		parcel: 0,
		downPayment: amount,
	};

	return R.reduce((months) => {
		const amortization = R.divide(amount, parcels);
		const previousDownPayment = R.prop('downPayment', R.last(months));
		const rate = R.multiply(previousDownPayment, unitInterestValue);

		const currentMonth = {
			amortization,
			rate,
			parcel: R.add(rate, amortization),
			downPayment: R.subtract(previousDownPayment, amortization),
		};

		return [...months, currentMonth];
	}, [firstMonth], R.range(0, parcels));
};

module.exports = R.curry(sac);
