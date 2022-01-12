import { redirect } from "remix";
import slugify from "slugify";
import supabase from "../../../api";

export const loader = async () => {
  if (process.env.NODE_ENV !== "development") {
    return redirect("/");
  }
};

export const action = async ({ request }) => {
  const form = await request.formData();

  const { error } = await supabase
    .from("keyboard")
    .insert([{ name: form.get("name"), slug: slugify(form.get("name")) }]);

  return redirect("/keyboards");
};

export default function KeyboardsNew() {
  return (
    <>
      <form method="POST">
        <label>
          name: <input type="text" name="name" />
        </label>
        <button type="submit">add keyboard</button>
      </form>
    </>
  );
}
