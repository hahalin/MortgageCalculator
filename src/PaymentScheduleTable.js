// PaymentScheduleTable.js
import React from 'react';

const PaymentScheduleTable = ({ payments, formatter }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>月份</th>
                    <th>本金</th>
                    <th>利息</th>
                    <th>總付款</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment, index) => (
                    <tr key={index}>
                        <td>{payment.month}</td>
                        {payment.principal && <td>{formatter.format(payment.principal.toFixed(0))}</td>}
                        {payment.interest && <td>{formatter.format(payment.interest.toFixed(0))}</td>}
                        {payment.totalPayment && <td>{formatter.format(payment.totalPayment.toFixed(0))}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PaymentScheduleTable;
