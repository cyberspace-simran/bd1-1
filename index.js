const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());
//Server-side values
let taxrate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/welcome', (req, res) => {
  res.send('hello');
});
// Endpoint 1: Calculate the total price of items in the cart

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  // Calculate the new total by adding the newItemPrice to cartTotal
  let updatedCartTotal = cartTotal + newItemPrice;

  // Return the result as a string
  res.send(updatedCartTotal.toString());
});

// Endpoint 2 : Apply a discount based on membership status
function membershipDiscount(cartTotal, isMember) {
  if (isMember === 'true') {
    return (cartTotal - cartTotal * (discountPercentage / 100)).toString();
  } else {
    return cartTotal.toString();
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(membershipDiscount(cartTotal, isMember));
});
// Endpoint 3 : Calculate tax on the cart total

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxCalculation = (cartTotal * (taxrate / 100)).toString();
  res.send(taxCalculation);
});
// Endpoint 4 : Estimate delivery time based on shipping method

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50); // 1 day per 50 kms
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100); // 1 day per 100 kms
  }
  res.send(deliveryDays.toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = (weight * distance * 0.1).toString();
  res.send(shippingCost);
});

// Endpoint 6 : Calculate loyalty points earned from a purchase

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyatyPoints = (purchaseAmount * loyaltyRate).toString();
  res.send(loyatyPoints);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
