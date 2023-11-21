export const calculatePMT = (loanAmount, years, interestRate) => {
    const principal = parseFloat(loanAmount);
    const calculateRate = parseFloat(interestRate) / 100 / 12;
    const nper = parseFloat(years) * 12;
    const pvif = Math.pow(1 + calculateRate, nper);
    return (calculateRate / (pvif - 1)) * (principal * pvif);
}

export const calculateEqualPrincipal = (loanAmount, years, interestRate) => {
    const monthlyPrincipal = loanAmount / (years * 12);
    let balance = loanAmount;
    let paymentSchedule = [];

    for (let month = 1; month <= years * 12; month++) {
        let monthlyInterest = balance * (interestRate / 100 / 12);
        let totalPayment = monthlyPrincipal + monthlyInterest;
        paymentSchedule.push({ month, principal: monthlyPrincipal, interest: monthlyInterest, totalPayment });
        balance -= monthlyPrincipal;
    }

    return paymentSchedule;
};

