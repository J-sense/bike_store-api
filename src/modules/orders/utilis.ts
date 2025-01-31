/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import Shurjopay from 'shurjopay';
import config from '../../config';
// import config from '../../config';
const shurjopay = new Shurjopay();
shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_return_url!,
);

const makePayment = async (paymentPayload: any): any => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};
//   const paymentResult = await Shurjopay.makePayment(
//     paymentPayload,
//     (response) => res.status(201).json({
//         message: 'Orders successfully',
//         success: true,
//         data: response,
//       })
//     (error) => console.log(error),
//   );
//   return paymentResult;
// };
const varifyPayment = async (order_id: string): any => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};
export const orderUtils = {
  makePayment,
  varifyPayment,
};
