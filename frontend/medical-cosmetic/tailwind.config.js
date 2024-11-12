/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))', // Example for 16 columns
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                sans: ['Noto Sans TC', 'sans-serif']
            },
            colors: {
                // 主色
                primary: {
                    DEFAULT: '#4B83F2', // Primary blue
                    light: '#A5C0F7',   // Light blue
                    lighter: '#EEF3FE', // Lightest blue
                },
                
                // 輔色
                secondary: {
                    purple: '#7B61FF',    // Purple
                    turquoise: '#40C7D1', // Sea green/turquoise
                    lavender: '#B69DFF',  // Light purple
                },
                
                // 字體
                text: {
                    DEFAULT: '#1F2937', // Text-100
                    90: '#374151',      // Text-90
                    80: '#4B5563',      // Text-80
                    60: '#6B7280',      // Text-60
                    40: '#9CA3AF',      // Text-40
                    20: '#E5E7EB',      // Text-20
                },
                
                // 提醒顏色
                notice: {
                    error: '#EF4444',   // Red
                    success: '#22C55E', // Green
                },
                
                // 按鈕顏色
                btn: {
                    primary: {
                        DEFAULT: '#4B83F2',  // BTN-Primary
                        hover: '#B69DFF',    // BTN-Hover
                        active: '#7B61FF',   // BTN-Active
                    },
                    secondary: {
                        DEFAULT: '#EEF3FE',  // BTN-Secondary
                        hover: '#4B83F2',    // BTN-Secondary-Hover
                        border: '#A5C0F7',   // BTN-Border
                        ghost: '#4B83F2',    // BTN-Ghost
                    }
                },
                
                // 其他
                other: {
                    gray: '#F3F4F6',      // Gray background
                    white: '#FFFFFF',      // White
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}