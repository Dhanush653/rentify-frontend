const HomePage = () => (
  <section className="flex flex-col gap-6">
    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Home</h1>

    {/* TODO: filters + the property list. 1 column on mobile, 2 on tablet, 3 on laptop. */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
  </section>
)

export default HomePage
