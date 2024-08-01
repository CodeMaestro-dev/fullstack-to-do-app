import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="ml-2 md:ml-10 absolute translate-y-[-50%]">
      <ul className="flex gap-[50px]">
        <li className="bg-todo-purple text-white px-4 py-1 rounded-sm">
          <Link href="/">Add Todo</Link>
        </li>
        <li className="bg-todo-purple text-white px-4 py-1 rounded-sm">
          <Link href="/todo">Todos</Link>
        </li>
      </ul>
    </nav>
  );
}
