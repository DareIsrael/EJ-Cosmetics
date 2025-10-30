'use client';

export default function DeliveryInfo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Delivery Information</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Area</h2>
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-2xl mr-3">📍</span>
                  <h3 className="text-2xl font-bold">Ilorin, Kwara State</h3>
                </div>
                <p className="text-pink-100 text-lg">
                  We currently offer instant delivery service within Ilorin metropolis
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Instant Delivery Service</h2>
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-green-800">Instant Delivery</h3>
                    <p className="text-green-600">Same day delivery within Ilorin</p>
                  </div>
                </div>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    Orders placed before 4 PM delivered same day
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    Orders after 4 PM delivered next morning
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    Fast and reliable delivery service
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    Real-time delivery updates
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Order Processing</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-600">
                  Orders are processed <strong>immediately</strong> during business hours. 
                  We aim to dispatch your order within 1-2 hours of order confirmation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Process</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Order Confirmation</h3>
                    <p className="text-gray-600">Receive immediate confirmation of your order via SMS/email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Processing</h3>
                    <p className="text-gray-600">Our team prepares your order within 1-2 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dispatch & Delivery</h3>
                    <p className="text-gray-600">Our delivery rider brings your order directly to you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Updates</h3>
                    <p className="text-gray-600">Get SMS updates about your delivery status</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Instructions</h2>
              <p className="text-gray-600 mb-3">
                To ensure fast and accurate delivery, please provide:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Complete residential/business address in Ilorin</li>
                <li>Clear landmarks and location description</li>
                <li>Working phone number for delivery coordination</li>
                <li>Any specific delivery instructions (gate code, floor, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Areas We Cover in Ilorin</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">GRA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Tanke</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Sango</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Unity Road</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Adewole</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Oko-Erin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Zango</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Ubandawaki</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-600">Kulende</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Don't see your area? Contact us to confirm delivery availability!
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Delivery Support</h2>
              <p className="text-gray-600 mb-3">
                For delivery-related inquiries or issues:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Need to update delivery address</li>
                <li>Delivery running late</li>
                <li>Cannot locate delivery agent</li>
                <li>Emergency contact needed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Delivery Team</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  Reach our Ilorin delivery team directly:
                </p>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-600 text-xl">📞</span>
                    <div>
                      <p className="font-semibold">Delivery Hotline</p>
                      <p>+234 803 000 0000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-600 text-xl">📧</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>delivery@ejcosmetic.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-600 text-xl">🕒</span>
                    <div>
                      <p className="font-semibold">Delivery Hours</p>
                      <p>Monday - Sunday: 8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}