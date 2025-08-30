import Day from "./Days";
import CountryFlag from "./CountryFlag";

export default function Weather({ weather, countryData }) {
  const { name, country_code } = countryData;

  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div>
      <h2>
        Weather {name}
        {"  "}
        <span>
          {country_code ? (
            <CountryFlag code={country_code} size={"3rem"} />
          ) : (
            "🏳️"
          )}
        </span>
      </h2>
      <ul className="weather">
        {dates.map((dates, i) => (
          <Day
            max={max.at(i)}
            min={min.at(i)}
            dates={dates}
            codes={codes.at(i)}
            key={dates}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
