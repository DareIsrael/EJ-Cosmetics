// import { NextResponse } from 'next/server';
// import { authenticate } from '@/utils/auth';
// import { getAllOrders, createOrder } from '@/controllers/orderController';

// export async function GET(request) {
//   try {
//     const user = await authenticate(request);
//     if (!user) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const result = await getAllOrders(user);

//     if (!result.success) {
//       return NextResponse.json(
//         { message: result.message },
//         { status: result.status }
//       );
//     }

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error('Get orders route error:', error);
//     return NextResponse.json(
//       { message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const user = await authenticate(request);
//     if (!user) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const orderData = await request.json();
//     const result = await createOrder(orderData, user);

//     if (!result.success) {
//       return NextResponse.json(
//         { message: result.message },
//         { status: result.status }
//       );
//     }

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error('Create order route error:', error);
//     return NextResponse.json(
//       { message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/auth';
import { getAllOrders, createOrder } from '@/controllers/orderController'; // Changed import

export async function GET(request) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await getAllOrders(user);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Get orders route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderData = await request.json();
    const result = await createOrder(orderData, user); // Changed function name

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Create order route error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}