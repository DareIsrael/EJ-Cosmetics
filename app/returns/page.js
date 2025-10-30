'use client';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Return & Refund Policy</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy 
                with your order, we accept returns within 14 days of delivery.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">Return Conditions:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1 ml-4">
                  <li>Items must be unused and in original packaging</li>
                  <li>All tags and labels must be attached</li>
                  <li>Original receipt or proof of purchase required</li>
                  <li>Return request must be made within 14 days of delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Non-Returnable Items</h2>
              <p className="text-gray-600 mb-3">
                For health and safety reasons, we cannot accept returns on:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Opened cosmetics and skincare products</li>
                <li>Used beauty tools and accessories</li>
                <li>Personal care items</li>
                <li>Sale or clearance items (unless defective)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Return Process</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Customer Service</h3>
                    <p className="text-gray-600">Email returns@ejcosmetic.com within 14 days of delivery</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Receive Return Instructions</h3>
                    <p className="text-gray-600">We'll provide you with a return authorization and shipping instructions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ship Your Return</h3>
                    <p className="text-gray-600">Package items securely and ship to our return address</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Receive Refund</h3>
                    <p className="text-gray-600">Refund processed within 5-7 business days after we receive your return</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Refund Policy</h2>
              <p className="text-gray-600 mb-3">
                Once we receive and inspect your return, we'll process your refund within 
                5-7 business days. The refund will be issued to your original payment method.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Shipping costs are non-refundable. If you received 
                  free shipping, the standard shipping cost will be deducted from your refund.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Defective or Damaged Items</h2>
              <p className="text-gray-600 mb-3">
                If you receive a defective or damaged item, please contact us within 48 hours 
                of delivery. We'll arrange for a replacement or refund at no additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Returns Department</h2>
              <p className="text-gray-600">
                For return-related questions or to initiate a return:
              </p>
              <div className="mt-3 text-gray-600">
                <p>Email: returns@ejcosmetic.com</p>
                <p>Phone: +234 800 000 0002</p>
                <p>Hours: Mon-Fri, 9AM-6PM</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}