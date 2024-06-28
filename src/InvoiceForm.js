import React, { useState } from 'react';
import Invoice from './Invoice';
import './InvoiceForm.css';

const InvoiceForm = () => {
  const [formValues, setFormValues] = useState({
    companyLogo: '',
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      gst: ''
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: ''
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDetails: '',
      invoiceDate: ''
    },
    reverseCharge: 'No',
    itemDetails: [],
    signature: ''
  });

  const [items, setItems] = useState([{
    description: '',
    unitPrice: 0,
    quantity: 0,
    discount: 0,
  }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length > 1) {
      setFormValues((prevValues) => {
        const newValues = { ...prevValues };
        let current = newValues;
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = value;
          } else {
            current = current[key];
          }
        });
        return newValues;
      });
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };


  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', unitPrice: 0, quantity: 0, discount: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues((prevValues) => ({
      ...prevValues,
      itemDetails: items
    }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
       
        <h2>Company Logo</h2>
        <input type="file" name="companyLogo" onChange={(e) => setFormValues({ ...formValues, companyLogo: URL.createObjectURL(e.target.files[0]) })} />
        
        <div className="flexible">
         <div>
        <h2>Seller Details</h2>
        <input type="text" name="sellerDetails.name" placeholder="Name" onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.address" placeholder="Address" onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.city" placeholder="City" onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.state" placeholder="State" onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.pincode" placeholder="Pincode" onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.pan" placeholder="PAN No." onChange={handleInputChange} required />
        <input type="text" name="sellerDetails.gst" placeholder="GST Registration No." onChange={handleInputChange} required/>
        </div>

        <div>
        <h2>Billing Details</h2>
        <input type="text" name="billingDetails.name" placeholder="Name" onChange={handleInputChange} required/>
        <input type="text" name="billingDetails.address" placeholder="Address" onChange={handleInputChange} required/>
        <input type="text" name="billingDetails.city" placeholder="City" onChange={handleInputChange} required/>
        <input type="text" name="billingDetails.state" placeholder="State" onChange={handleInputChange} required/>
        <input type="text" name="billingDetails.pincode" placeholder="Pincode" onChange={handleInputChange} required/>
        <input type="text" name="billingDetails.stateCode" placeholder="State/UT Code" onChange={handleInputChange} required/>
        </div>
        </div>

        <div className="flexible_me">
        

        <div>
        <h2>Invoice Details</h2>
        <input type="text" name="invoiceDetails.invoiceNo" placeholder="Invoice No." onChange={handleInputChange} required/>
        <input type="text" name="invoiceDetails.invoiceDetails" placeholder="Invoice Details" onChange={handleInputChange} required/>
        <input type="date" name="invoiceDetails.invoiceDate" placeholder="Invoice Date" onChange={handleInputChange} required/>
        
        <h2>Order Details</h2>
        <input type="text" name="orderDetails.orderNo" placeholder="Order No." onChange={handleInputChange} required/>
        <input type="date" name="orderDetails.orderDate" placeholder="Order Date" onChange={handleInputChange} required/>
        </div>

        <div>
        <h2>Shipping Details</h2>
        <input type="text" name="shippingDetails.name" placeholder="Name" onChange={handleInputChange} required/>
        <input type="text" name="shippingDetails.address" placeholder="Address" onChange={handleInputChange} required/>
        <input type="text" name="shippingDetails.city" placeholder="City" onChange={handleInputChange} required/>
        <input type="text" name="shippingDetails.state" placeholder="State" onChange={handleInputChange} required/>
        <input type="text" name="shippingDetails.pincode" placeholder="Pincode" onChange={handleInputChange} required/>
        <input type="text" name="shippingDetails.stateCode" placeholder="State/UT Code" onChange={handleInputChange} required/>
        </div>
        
        </div>

        <div className="details">
        <div>
        <h2>Reverse Charge</h2>
        <select name="reverseCharge" onChange={handleInputChange}required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        </div>

        <div>
        <h2>Place of Supply</h2>
        <input type="text" name="placeOfSupply" onChange={handleInputChange} required/>
        </div>

        <div>
        <h2>Place of Delivery</h2>
        <input type="text" name="placeOfDelivery" onChange={handleInputChange}required />
        </div>
        </div>

        {/* </div> */}
        <h2>Item Details</h2>
        <div className="item-details">
          {items.map((item, index) => (
            <div key={index}>
              <input type="text" name="description" placeholder="Description" onChange={(e) => handleItemChange(index, e)} required/>
              <input type="number" name="unitPrice" placeholder="Unit Price" onChange={(e) => handleItemChange(index, e)} required/>
              <input type="number" name="quantity" placeholder="Quantity" onChange={(e) => handleItemChange(index, e)} required/>
              <input type="number" name="discount" placeholder="Discount" onChange={(e) => handleItemChange(index, e)} required/>
            </div>
          ))}
        </div>
        <button type="button" className="add-item-button" onClick={addItem}>Add Item</button>

        <h2>Signature</h2>
        <input type="file" name="signature" onChange={(e) => setFormValues({ ...formValues, signature: URL.createObjectURL(e.target.files[0]) })} required/>

        <button type="submit">Generate Invoice</button>
      </form>

      {formValues.itemDetails.length > 0 && (
        <Invoice
          companyLogo={formValues.companyLogo}
          sellerDetails={formValues.sellerDetails}
          placeOfSupply={formValues.placeOfSupply}
          billingDetails={formValues.billingDetails}
          shippingDetails={formValues.shippingDetails}
          placeOfDelivery={formValues.placeOfDelivery}
          orderDetails={formValues.orderDetails}
          invoiceDetails={formValues.invoiceDetails}
          reverseCharge={formValues.reverseCharge}
          itemDetails={formValues.itemDetails}
          signature={formValues.signature}
        />
      )}
    </div>
  );
};

export default InvoiceForm;
