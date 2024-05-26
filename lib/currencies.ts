export const Currencies = [
    {value: 'EUR', label: "€ Euro", locale: "de-DE" },
    {value: 'USD', label: "$ Dollar", locale: "en-US" },
    {value: 'JPY', label: "y yen", locale: "ja-JP" },
    {value: 'GBP', label: "l pound", locale: "en-GB" },
]

export type Currency = (typeof Currencies)[0]