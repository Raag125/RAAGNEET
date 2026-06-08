import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const COUNTRIES = [
  { code: 'US', dial: '+1', maxLength: 10, flag: '🇺🇸' },
  { code: 'IN', dial: '+91', maxLength: 10, flag: '🇮🇳' },
  { code: 'UK', dial: '+44', maxLength: 10, flag: '🇬🇧' },
  { code: 'AU', dial: '+61', maxLength: 9, flag: '🇦🇺' },
  { code: 'CA', dial: '+1', maxLength: 10, flag: '🇨🇦' },
  { code: 'DE', dial: '+49', maxLength: 11, flag: '🇩🇪' },
  { code: 'FR', dial: '+33', maxLength: 9, flag: '🇫🇷' },
  { code: 'BR', dial: '+55', maxLength: 11, flag: '🇧🇷' },
  { code: 'AE', dial: '+971', maxLength: 9, flag: '🇦🇪' },
  { code: 'SG', dial: '+65', maxLength: 8, flag: '🇸🇬' },
];

export default function CountryPhoneInput({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  // Default to IN if not provided
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === 'IN') || COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const dropdownRef = useRef(null);

  // Parse initial value if it exists (e.g. "+1 5551234567")
  useEffect(() => {
    if (value) {
      const match = COUNTRIES.find(c => value.startsWith(c.dial));
      if (match) {
        setSelectedCountry(match);
        const numberPart = value.substring(match.dial.length).trim();
        setPhoneNumber(numberPart);
      } else {
        // If no match, just put everything in phone number
        setPhoneNumber(value);
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // only allow digits
    // Limit by country max length
    if (rawVal.length <= selectedCountry.maxLength) {
      setPhoneNumber(rawVal);
      onChange(`${selectedCountry.dial} ${rawVal}`);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Trim phone number if it exceeds new country's max length
    let newPhone = phoneNumber;
    if (phoneNumber.length > country.maxLength) {
      newPhone = phoneNumber.substring(0, country.maxLength);
      setPhoneNumber(newPhone);
    }
    onChange(`${country.dial} ${newPhone}`);
  };

  return (
    <div className="relative flex items-center w-full bg-white/5 border border-white/10 rounded-xl transition-all focus-within:border-cyan-400 focus-within:bg-cyan-400/5 h-[42px]" ref={dropdownRef}>
      {/* Country Selector */}
      <div 
        className="flex items-center gap-1.5 pl-3 pr-2 py-2 cursor-pointer border-r border-white/10 hover:bg-white/5 rounded-l-xl transition-colors h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base">{selectedCountry.flag}</span>
        <span className="text-white/70 text-xs font-medium">{selectedCountry.dial}</span>
        <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[180px] max-h-[200px] overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[100] py-1 flex flex-col custom-scrollbar">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => handleCountrySelect(c)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 transition-colors w-full text-left"
            >
              <span className="text-base">{c.flag}</span>
              <span className="text-white/80 text-xs font-medium w-8">{c.code}</span>
              <span className="text-white/50 text-xs">{c.dial}</span>
            </button>
          ))}
        </div>
      )}

      {/* Phone Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none w-full rounded-r-xl"
        placeholder="Phone Number"
      />
    </div>
  );
}
