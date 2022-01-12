import { Link, useLoaderData, redirect } from "remix";
import supabase from "../../../api";

export let loader = async ({ params }) => {
  let { data: keyboard, error } = await supabase
    .from("keyboard")
    .select("*")
    .eq("slug", params.slug)
    .limit(1)
    .single();

  return keyboard;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();

  if (form.get("_method") === "delete") {
    const { error } = await supabase
      .from("keyboard")
      .delete()
      .eq("id", form.get("id"));

    return redirect("/keyboards");
  }
};

export default function KeyboardsIndex() {
  let keyboard = useLoaderData();
  return (
    <>
      <div>{keyboard.name}</div>
      <pre>{JSON.stringify(keyboard, null, 2)}</pre>
      <Link to={`/keyboards/${keyboard.slug}/edit`}>edit keyboard</Link>

      <details>
        <summary>Danger Zone</summary>

        <form method="post">
          <input type="hidden" name="id" value={keyboard.id} />
          <input type="hidden" name="_method" value="delete" />
          <button type="submit">Delete</button>
        </form>
      </details>
    </>
  );
}
