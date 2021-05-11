import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import ResponseStatus from "../utils/responseStatus";

//@desc Create new order
//@route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    console.log("error yet aahe");
    res.status(ResponseStatus.BAD_REQUEST);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(ResponseStatus.CREATED).json(createdOrder);
  }
});

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(ResponseStatus.NOT_FOUND);
    throw new Error("Order Not Found");
  }
});

//@desc Update  order to Paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid= asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
     order.isPaid=true;
     order.paidAt= Data.now();
     order.paymentResult={
         id:req.body.id,
         status:req.body.status,
         update_time:req.body.update_time,
         email_address:req.body.payer.email_address,
     } 
     
     const  updatedOrder=await order.save();

     res.json(updatedOrder);

  } else {
    res.status(ResponseStatus.NOT_FOUND);
    throw new Error("Order Not Found");
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
