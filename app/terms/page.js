'use client';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using EJ Cosmetic's website and services, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not 
                agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Account Registration</h2>
              <p className="text-gray-600 mb-3">
                To access certain features, you may be required to register an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Product Information</h2>
              <p className="text-gray-600">
                We strive to display product colors and images as accurately as possible. However, 
                actual colors may vary due to monitor settings. Product descriptions are provided 
                for informational purposes, and we are not responsible for any inaccuracies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Pricing and Payments</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>All prices are in Nigerian Naira (₦)</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment must be completed before order processing</li>
                <li>We accept various payment methods including cards and bank transfers</li>
                <li>Sales tax will be added where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-3">
                We ship throughout Nigeria with estimated delivery times. Please note:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Shipping costs are calculated at checkout</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>Some locations may have additional delivery restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-600">
                Please refer to our Return Policy for detailed information about returns, 
                exchanges, and refunds. We accept returns within 14 days of delivery for 
                unused products in original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600">
                All content on this website, including text, graphics, logos, and images, 
                is the property of EJ Cosmetic and protected by copyright laws. You may not 
                use, reproduce, or distribute any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600">
                EJ Cosmetic shall not be liable for any indirect, incidental, special, 
                or consequential damages resulting from your use of our services or products. 
                Our total liability shall not exceed the amount paid for the products in question.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-gray-600">
                These terms shall be governed by and construed in accordance with the laws 
                of the Federal Republic of Nigeria. Any disputes shall be subject to the 
                exclusive jurisdiction of the courts in Lagos State.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-gray-600">
                For any questions regarding these Terms of Service, please contact us:
              </p>
              <div className="mt-3 text-gray-600">
                <p>Email: legal@ejcosmetic.com</p>
                <p>Phone: +234 800 000 0000</p>
                <p>Address: 123 Beauty Street, Lagos, Nigeria</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}