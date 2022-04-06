import axios from "axios";
import React, { useEffect, useState } from "react";

const TranslationForm: React.FC = () => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [targetLang, setTargetLang] = useState("NL");

  const languages: Array<{ language: string; name: string }> = [
    {
      language: "BG",
      name: "Bulgarian",
    },
    {
      language: "CS",
      name: "Czech",
    },
    {
      language: "DA",
      name: "Danish",
    },
    {
      language: "DE",
      name: "German",
    },
    {
      language: "EL",
      name: "Greek",
    },
    {
      language: "EN",
      name: "English",
    },
    {
      language: "ES",
      name: "Spanish",
    },
    {
      language: "ET",
      name: "Estonian",
    },
    {
      language: "FI",
      name: "Finnish",
    },
    {
      language: "FR",
      name: "French",
    },
    {
      language: "HU",
      name: "Hungarian",
    },
    {
      language: "IT",
      name: "Italian",
    },
    {
      language: "JA",
      name: "Japanese",
    },
    {
      language: "LT",
      name: "Lithuanian",
    },
    {
      language: "LV",
      name: "Latvian",
    },
    {
      language: "NL",
      name: "Dutch",
    },
    {
      language: "PL",
      name: "Polish",
    },
    {
      language: "PT",
      name: "Portuguese",
    },
    {
      language: "RO",
      name: "Romanian",
    },
    {
      language: "RU",
      name: "Russian",
    },
    {
      language: "SK",
      name: "Slovak",
    },
    {
      language: "SL",
      name: "Slovenian",
    },
    {
      language: "SV",
      name: "Swedish",
    },
    {
      language: "ZH",
      name: "Chinese",
    },
  ];
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;

  const getTranslation = (event: { target: { value: string } }) => {
    axios
      .get(
        `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${event.target.value}&target_lang=${targetLang}`
      )

      .then(function (response) {
        // handle success
        setSource(response.data.translations[0].detected_source_language);
        setTarget(response.data.translations[0].text);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(target);
  };

  const detectLanguage = languages.find(({ language }) => language === source);

  const textToSpeech = (text: string | undefined) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.lang = "nl-NL";
    utterance.text = target;
    console.log(utterance);
    speechSynthesis.speak(utterance);
  };

  const pronunciation = () => {
    textToSpeech(target);
  };

  const selectTargetLanguage = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTargetLang(event.target.value);
    console.log(targetLang);
  };

  return (
    <>
      <div className="translation-container">
        <div className="source-container">
          <div className="source-title">
            Recognized language: {detectLanguage && detectLanguage.name}
          </div>
          <textarea
            className="translate-field"
            name="source-text"
            placeholder="Type or paste text to translate"
            onChange={getTranslation}
          ></textarea>
        </div>
        <div className="target-container">
          <div className="target-title">Translation</div>
          <select onChange={selectTargetLanguage}>
            <option value={"NL"}>Nederlands</option>
            <option value={"EN"}>Engels</option>
            <option value={"DE"}>Duits</option>
            <option value={"FR"}>Frans</option>
          </select>
          <textarea
            className="translate-field"
            name="target-text"
            placeholder={target}
          ></textarea>
          <button onClick={copyToClipboard}>Copy target</button>
          <button onClick={pronunciation}>Listen</button>
        </div>
      </div>
    </>
  );
};

export default TranslationForm;
