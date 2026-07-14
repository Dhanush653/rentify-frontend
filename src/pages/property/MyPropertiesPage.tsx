const MyPropertiesPage = () => (
  <section className="flex flex-col gap-6">
    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">My Properties</h1>

    {/* TODO: the signed-in owner's listings, or an EmptyState when there are none. */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
  </section>
)

export default MyPropertiesPage
