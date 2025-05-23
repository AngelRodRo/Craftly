import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <h1 className="text-4xl font-bold">Hello World {user?.name}</h1>
    </div>
  );
}
