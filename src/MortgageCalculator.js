import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { calculatePMT, calculateEqualPrincipal } from './mortgageCalculations';
import PaymentScheduleTable from './PaymentScheduleTable';


function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState('1000000');
    const [years, setYears] = useState('20');
    const [interestRate, setInterestRate] = useState('1.565');
    const [repaymentType, setRepaymentType] = useState('interest');
    const [payments, setPayments] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
        let schedule = [];

        if (repaymentType === 'interest') {
            const pmt = calculatePMT(loanAmount, years, interestRate);
            schedule.push({ totalPayment: pmt });
        } else {
            schedule = calculateEqualPrincipal(loanAmount, years, interestRate);
        }

        setPayments(schedule);
    };

    const handleSetRepaymentType=(value)=>
    {
        setRepaymentType(value);
        setPayments([]);
    }

    const formatter = new Intl.NumberFormat('zh-TW', {
        style: 'decimal',
        maximumFractionDigits: 2,
    });    

    return (
        <div className="container mt-5 col-md-12">
            <h2>房貸計算器</h2>        
            <div className='row'>
                <div className="col-md-4" style_="{{broder:'1px dashed gray'}}">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="loanAmount" className="form-label">借款金額</label>
                            <input type="number" className="form-control" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="years" className="form-label">借款期限（年）</label>
                            <input type="number" className="form-control" id="years" value={years} onChange={(e) => setYears(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="interestRate" className="form-label">年利率 (%)</label>
                            <input type="number" className="form-control" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="repaymentType" id="interest" value="interest" checked={repaymentType === 'interest'} onChange={() => handleSetRepaymentType('interest')} />
                                <label className="form-check-label" htmlFor="interest">本息攤還</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="repaymentType" id="principal" value="principal" checked={repaymentType === 'principal'} onChange={() => handleSetRepaymentType('principal')} />
                                <label className="form-check-label" htmlFor="principal">本金攤還</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">計算</button>
                    </form>
                </div>
                <div className='col-md-8'>
                    {/* 根據 payments 顯示計算結果 */}

                    {payments.length > 0 && repaymentType === "interest" && (
                        <h3>每月付款額：{formatter.format(payments[0].totalPayment.toFixed(0))} 元</h3>
                    )}

                    {payments.length > 0 && repaymentType === "principal" && (
                        <PaymentScheduleTable payments={payments} formatter={formatter} />
                    )}
                </div>
            </div>    
        </div>
    );
}

export default MortgageCalculator;
