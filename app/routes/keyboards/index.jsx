import { Link, useLoaderData } from "remix";
import supabase from "../../../api";

export let loader = async () => {
  let { data: keyboard, error } = await supabase.from("keyboard").select("*");

  return keyboard;
};

export default function KeyboardsIndex() {
  let keyboards = useLoaderData();

  return (
    <>
      <div>keyboards</div>
      <pre>{JSON.stringify(keyboards, null, 2)}</pre>

      {process.env.NODE_ENV === "development" && (
        <Link to="/keyboards/new">add new keyboard</Link>
      )}
      <ul>
        {keyboards.map((keyboard) => (
          <li key={keyboard.id}>
            <Link to={`/keyboards/${keyboard.slug}`}>{keyboard.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
