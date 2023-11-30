const db = require("../lib/db");

function getAllpayments() {
  return db.query("SELECT * FROM payment");
}

function getpaymentidUser(user_id) {
  const queryText = "SELECT * FROM payment WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}
function getpaymentid(payment_id) {
  console.log(payment_id);
  const queryText = "SELECT * FROM payment WHERE payment_id = $1";
  const value = [payment_id];
  return db.query(queryText, value);
}

function newpayment(
  user_id,
  cardholder,
  country,
  state,
  address,
  email,
  method_id,
  phone,
  amount,
  product_id
) {
  try {
    const queryText =
      "INSERT INTO payment (user_id ,cardholder ,country,state,address,email,method_id,phone,amount,product_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *";

    const values = [
      user_id,
      cardholder,
      country,
      state,
      address,
      email,
      method_id,
      phone,
      amount,

      product_id,
    ];
    return db.query(queryText, values);
  } catch (error) {
    console.log(error);
  }
}
// function newpayment(
//   user_id,
//   cardholder,
//   country,
//   state,
//   address,
//   email,
//   method_id,
//   phone,
//   amount
//   // product_id
// ) {
//   try {
//     const queryText = `
//     INSERT INTO public.userpaymentbridge (payment_id, user_id)
// SELECT payment.payment_id, cart.user_id
// FROM public.payment
// JOIN public.cart ON payment.user_id = cart.user_id;

//     `;

//     const values = [
//       user_id,
//       cardholder,
//       country,
//       state,
//       address,
//       email,
//       method_id,
//       phone,
//       amount,
//       // product_id,
//     ];
//     console.log(values);
//     return db.query(queryText, values);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function newpayment(
//   user_id,
//   cardholder,
//   country,
//   state,
//   address,
//   email,
//   method_id,
//   phone,
//   amount,
//   product_id
// ) {
//   try {
//     // إدراج بيانات في جدول البيمنت
//     const paymentQuery = `
//       INSERT INTO public.payment (user_id, cardholder, country, state, address, email, method_id, phone, amount,product_id)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)
//       RETURNING payment_id;
//     `;
//     const paymentValues = [
//       user_id,
//       cardholder,
//       country,
//       state,
//       address,
//       email,
//       method_id,
//       phone,
//       amount,
//       product_id
//     ];

//     const paymentResult = await db.query(paymentQuery, paymentValues);
//     const paymentId = paymentResult.rows[0].payment_id;

//     // إدراج بيانات في جدول البريج
//     const bridgeQuery = `
//       INSERT INTO public.userpaymentbridge (payment_id, user_id)
//       VALUES ($1, $2);
//     `;
//     const bridgeValues = [paymentId, user_id];

//     await db.query(bridgeQuery, bridgeValues);

//     return paymentId;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

function deletepayment(payment_id) {
  const queryText = "DELETE FROM payment WHERE payment_id = $1";
  const value = [payment_id];
  return db.query(queryText, value);
}
function updatepayment(payment_name, category_id) {
  const queryText =
    "UPDATE payment  SET username = $2, email = $3, password = $4  WHERE user_id = $1";

  const value = [payment_name, category_id];
  return db.query(queryText, value);
}

module.exports = {
  getAllpayments,
  newpayment,
  getpaymentidUser,
  getpaymentid,
  deletepayment,
};
