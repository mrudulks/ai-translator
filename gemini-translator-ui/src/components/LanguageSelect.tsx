import React from "react";

const languages = [
  { name: "German", code: "de-DE" },
  { name: "Spanish", code: "es-ES" },
  { name: "French", code: "fr-FR" },
  { name: "Hindi", code: "hi-IN" },
  { name: "Japanese", code: "ja-JP" },
];

interface Props {
  value: string;
  onChange: (lang: (typeof languages)[0]) => void;
}

export const LanguageSelect = ({ value, onChange }: Props) => (
  <select
    className="p-2 border rounded-md bg-white mb-4"
    value={value}
    onChange={(e) => {
      const selected = languages.find((l) => l.name === e.target.value);
      if (selected) onChange(selected);
    }}>
    {languages.map((lang) => (
      <option key={lang.code} value={lang.name}>
        {lang.name}
      </option>
    ))}
  </select>
);
