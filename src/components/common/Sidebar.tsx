function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Dietly
      </h1>

      <nav className="flex flex-col gap-4">

        <a href="/patients">
          Hastalar
        </a>

        <a href="/diet-plans">
          Diyet Planları
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;