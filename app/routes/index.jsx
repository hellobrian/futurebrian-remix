import { Link } from 'remix'

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>futurebrian-remix</h1>
      <Link to="/keyboards">keyboards</Link>
    </div>
  );
}
