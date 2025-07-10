// app/api-info/page.tsx
export default function ApiInfoPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-sm text-gray-900">
      <h1 className="text-2xl font-bold mb-4">API Endpoints</h1>

      <ul className="space-y-4">
        <li>
          <code className="block bg-gray-100 p-2 rounded">
            GET /api/titles?page=1&minYear=2023&maxYear=2024&genres=Sci-Fi,Mystery
          </code>
          <p>Returns list of movies with filters. Supports pagination.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">GET /api/favorites?page=1</code>
          <p>Returns user's favorite movies. Supports pagination.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">POST /api/favorites/:id</code>
          <p>Add a movie to the user's favorites list.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">DELETE /api/favorites/:id</code>
          <p>Remove a movie from the user's favorites list.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">GET /api/watch-later?page=1</code>
          <p>Returns user's watch later list. Supports pagination.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">POST /api/watch-later/:id</code>
          <p>Add a movie to the watch later list.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">DELETE /api/watch-later/:id</code>
          <p>Remove a movie from the watch later list.</p>
        </li>
        <li>
          <code className="block bg-gray-100 p-2 rounded">GET /api/activities?page=1</code>
          <p>Returns user's activity feed. Supports pagination.</p>
        </li>
      </ul>
    </main>
  );
}
