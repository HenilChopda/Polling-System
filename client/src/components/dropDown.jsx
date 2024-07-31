import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

const languages = [
  { name: "English", code: "en" },
  { name: "Deutsch", code: "de", keywords: ["Deutsch", "German", "Deutsche", "Deutsche Sprache", "german", "german language"] },
  { name: "ગુજરાતી", code: "gu", keywords: ["ગુજરાતી", "gujarati", "gujr", "ગુજરાતી ભાષા", "gujarati language"] },
];

const DropDown = () => {
  const { i18n } = useTranslation();
  const [query, setQuery] = useState('');

  const filteredLanguages =
    query === ''
      ? languages
      : languages.filter((lang) => {
          const lowerCaseQuery = query.toLowerCase();
          return (
            lang.name.toLowerCase().includes(lowerCaseQuery) ||
            (lang.keywords && lang.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery)))
          );
        });
  const displayLanguageName = (code) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : 'English';
  };

  return (
    <Combobox value={i18n.language} onChange={(ln) => i18n.changeLanguage(ln)} onClose={() => setQuery('')} >
      <ComboboxInput
        aria-label="Language"
        displayValue={() => displayLanguageName(i18n.language)}
        onChange={(event) => setQuery(event.target.value)}
        className='bg-transparent border-solid border-[1px] border-r-4 p-1'
          // 'w-full rounded-lg border-none bg-[rgb(131,211,176)] py-1.5 pr-8 pl-3 text-sm/6 text-black',
          // 'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
        
      />
      {/* <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
        <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
      </ComboboxButton> */}
      <ComboboxOptions anchor="bottom" className="border empty:invisible bg-white w-[195px]">
        {filteredLanguages.map((lang) => (
          <ComboboxOption key={lang.code} value={lang.code} className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-emerald-200/20 ">
            <div className="text-sm/6 text-black ">{lang.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default DropDown;

