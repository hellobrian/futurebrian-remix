import { redirect, useLoaderData } from "remix";
import slugify from "slugify";
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

export const action = async ({ request }) => {
  const form = await request.formData();
  console.log({
    id: form.get("id"),
    name: form.get("name"),
    slug: slugify(form.get("name")),
  });

  const { error } = await supabase
    .from("keyboard")
    .update({ name: form.get("name"), slug: slugify(form.get("name")) })
    .eq("id", form.get("id"));

  return redirect("/keyboards");
};

export default function KeyboardsEdit() {
  const keyboard = useLoaderData();
  console.log({ keyboard });
  return (
    <>
      <form method="POST">
        <input type="hidden" name="id" value={keyboard.id} />
        <label>
          name: <input type="text" name="name" defaultValue={keyboard.name} />
        </label>
        <button type="submit">update keyboard</button>
      </form>
    </>
  );
}