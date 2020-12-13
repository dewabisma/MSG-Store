const initialValueZero = 0;

export const calculateTaxPrice = (itemsPrice) => {
  return ((itemsPrice * 15) / 100).toFixed(2);
};

export const calculateItemsPrice = (itemsArray) => {
  return itemsArray
    .reduce((accumulatedValue, currentItem) => {
      return accumulatedValue + currentItem.price * currentItem.qty;
    }, initialValueZero)
    .toFixed(2);
};

export const calculateShippingPrice = (itemsArray) => {
  return itemsArray.reduce((accumulatedValue, currentItem) => {
    return accumulatedValue + currentItem.qty;
  }, initialValueZero) > 5
    ? Number(100).toFixed(2)
    : 0;
};

export const calculateTotalPrice = (itemsPrice, shippingPrice, taxPrice) => {
  return (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
};
