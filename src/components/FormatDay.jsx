export default function formatDay({ dates }) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dates));
}
