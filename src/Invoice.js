import React from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import './Invoice.css';
import { toWords } from 'number-to-words';

const Invoice = ({
  companyLogo,
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  itemDetails,
  signature
}) => {
  // Calculate derived parameters
  const calculateAmounts = (items) => {
    return items.map(item => {
      const netAmount = item.unitPrice * item.quantity - (item.discount || 0);
      const taxRate = placeOfSupply === placeOfDelivery ? 0.09 : 0.18;
      const taxType = placeOfSupply === placeOfDelivery ? ['CGST', 'SGST'] : ['IGST'];
      const taxAmount = netAmount * taxRate;
      const totalAmount = netAmount + taxAmount;
      return { ...item, netAmount, taxType, taxAmount, totalAmount };
    });
  };

  const derivedItems = calculateAmounts(itemDetails);

  const totalAmount = derivedItems.reduce((acc, item) => acc + item.totalAmount, 0);

  const amountInWords = (amount) => {
    return `${toWords(amount)} only`.replace(/\b(\w)/g, s => s.toUpperCase());
  };

  const generatePDF = (e) => {
    e.preventDefault();
    const input = document.getElementById('invoice');
    toPng(input)
      .then((imgData) => {
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("invoice.pdf");
      });
  };

  return (
    <div>
      <div id="invoice">
        {/* <div className="invoice-header">
          <img src={companyLogo} alt="Company Logo" />
          <h1>Tax Invoice/Bill of Supply/Cash Memo</h1>
          <p>(Original for Recipient)</p>
        </div> */}

        <div className="invoice-header">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <div>
          <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
          <p>(Original for Recipient)</p>
        </div>
      </div>

        
        <div className="section">
        <div className="flexi">

          <div className="seller-details">
            <h2>Sold By:</h2>
            <p>{sellerDetails.name}</p>
            <p>{sellerDetails.address}</p>
            <p>{`${sellerDetails.city}, ${sellerDetails.state}, ${sellerDetails.pincode}`}</p>
            <h4>PAN No: {sellerDetails.pan}</h4>
            <h4>GST Registration No: {sellerDetails.gst}</h4>
          </div>

          <div className="billing-details">
            <h2>Billing Address:</h2>
            <p>{billingDetails.name}</p>
            <p>{billingDetails.address}</p>
            <p>{`${billingDetails.city}, ${billingDetails.state}, ${billingDetails.pincode}`}</p>
            <p>State/UT Code: {billingDetails.stateCode}</p>
          </div>
          </div>

          <div className="shipping-details">
            <h2>Shipping Address:</h2>
            <p>{shippingDetails.name}</p>
            <p>{shippingDetails.address}</p>
            <p>{`${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.pincode}`}</p>
            <p>State/UT Code: {shippingDetails.stateCode}</p>
          </div>

        </div>
        <div className="flexi">
        <div className="order-details">
          <h4>Order Number: {orderDetails.orderNo}</h4>
          <h4>Order Date: {orderDetails.orderDate}</h4>
        </div>
        <div className="invoice-details">
          <h4>Invoice Number: {invoiceDetails.invoiceNo}</h4>
          <h4>Invoice Details: {invoiceDetails.invoiceDetails}</h4>
          <h4>Invoice Date: {invoiceDetails.invoiceDate}</h4>
        </div>
        </div>
       
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Net Amount</th>
              <th>Tax Rate</th>
              <th>Tax Type</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {derivedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.netAmount.toFixed(2)}</td>
                <td>{(item.taxRate * 100).toFixed(2)}%</td>
                <td>{item.taxType.join('/')}</td>
                <td>{item.taxAmount.toFixed(2)}</td>
                <td>{item.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tbody>
                <td>Total:</td>
                <td colSpan={6}></td>  
                <td>{totalAmount.toFixed(2)}</td>
          </tbody>
          <tbody>
                <td >Amount in Words:</td>
                <td colSpan={7}>{amountInWords(totalAmount)}</td>  
          </tbody>
          <tbody>
                <td colSpan={8}>
                    <div className="signature">
                    <p>For {sellerDetails.name}:</p>
                    <img src={signature} alt="Signature" />
                    <p>Authorised Signatory</p>
                    </div>
                </td>
                
          </tbody>
        </table>


        {/* <div className="signature">
          <p>For {sellerDetails.name}:</p>
          <img src={signature} alt="Signature" />
          <p>Authorised Signatory</p>
        </div> */}
        <div className="reverse-charge">
          <p>Whether tax is payable under reverse charge: {reverseCharge}</p>
        </div>
      </div>
      
      <button className="pdf" onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default Invoice;
