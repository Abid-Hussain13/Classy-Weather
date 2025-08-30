import WeatherIcon from "./WeatherIcons";
import FormatDay from "./FormatDay";

export default function Day({ max, min, dates, codes, isToday }) {
  return (
    <li className="day">
      <span>
        <WeatherIcon code={codes} />
      </span>
      <p>{isToday ? "Today" : <FormatDay dates={dates} />}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
