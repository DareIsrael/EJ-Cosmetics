'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Personal information (name, email, phone number) when you create an account</li>
                <li>Delivery address for order processing within Ilorin</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Communication history when you contact our customer service</li>
                <li>Product reviews and ratings you submit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and delivery updates</li>
                <li>Coordinate with our delivery team for timely service</li>
                <li>Provide customer support</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. All payment 
                transactions are encrypted using SSL technology. Your delivery information is 
                shared only with our trusted delivery team.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve our website functionality</li>
                <li>Track delivery status and provide updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Third-Party Sharing</h2>
              <p className="text-gray-600">
                We do not sell your personal information to third parties. We may share your 
                information with trusted partners only for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
                <li>Payment processors to complete transactions</li>
                <li>Our delivery team to fulfill your orders within Ilorin</li>
                <li>Service providers who assist our business operations</li>
                <li>When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Delivery Information</h2>
              <p className="text-gray-600 mb-3">
                For delivery purposes, we collect and use:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Your complete delivery address within Ilorin metropolis</li>
                <li>Phone number for delivery coordination</li>
                <li>Delivery instructions and preferences</li>
                <li>Location data to optimize delivery routes</li>
              </ul>
              <p className="text-gray-600 mt-3 text-sm">
                This information is used solely for delivering your orders and providing 
                real-time delivery updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-gray-600 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate data, especially delivery details</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your data</li>
                <li>Update your delivery preferences at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
              </p>
              <div className="mt-3 text-gray-600">
                <p>Email: privacy@ejcosmetic.com</p>
                <p>Phone: +234 800 000 0000</p>
                <p>Address: Ilorin, Kwara State, Nigeria</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Policy Updates</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or services. We will notify you of any significant changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}