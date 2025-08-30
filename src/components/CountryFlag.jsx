import React from "react";
import twemoji from "twemoji";

function convertToFlag(countryCode) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127462 + char.charCodeAt(0) - 65))
    .join("");
}

export default function CountryFlag({ code, size = "2rem" }) {
  const flag = convertToFlag(code);

  const html = twemoji.parse(flag, {
    folder: "svg",
    ext: ".svg",
    attributes: () => ({
      style: `width:${size}; height:${size}; vertical-align:middle;`,
    }),
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
