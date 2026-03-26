import WhatsAppChat from './WhatsAppChat';

export default function WhatsAppSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              If you can use WhatsApp,<br className="hidden sm:block" />you can use this
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how simple conversations with your operations team get real work done — instantly.
            </p>
          </div>

          <WhatsAppChat />

          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">2 min</div>
              <p className="text-gray-700 text-sm md:text-base">Average response time</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <p className="text-gray-700 text-sm md:text-base">Always available</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">0</div>
              <p className="text-gray-700 text-sm md:text-base">Training required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
